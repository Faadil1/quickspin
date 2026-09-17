const json = (data, status = 200, extraHeaders = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extraHeaders,
    },
  });

const cleanText = (value, max = 600) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";

const normalizeResult = (result, index) => ({
  rank: index + 1,
  title: cleanText(result?.title, 180) || `Result ${index + 1}`,
  url: typeof result?.url === "string" ? result.url : "",
  snippet: cleanText(result?.content, 700),
  score: Number.isFinite(result?.score) ? result.score : null,
  favicon: typeof result?.favicon === "string" ? result.favicon : null,
});

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.TAVILY_API_KEY) {
    return json(
      { ok: false, code: "SEARCH_PROVIDER_NOT_CONFIGURED", message: "Search provider is not configured." },
      503,
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, code: "INVALID_JSON", message: "Request body must be valid JSON." }, 400);
  }

  const query = cleanText(body?.query, 320);
  if (query.length < 3) {
    return json({ ok: false, code: "QUERY_TOO_SHORT", message: "Enter a more specific search." }, 400);
  }

  const maxResults = Math.min(5, Math.max(1, Number(body?.maxResults) || 5));
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const startedAt = Date.now();
    const upstream = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.TAVILY_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query,
        search_depth: "fast",
        topic: "general",
        max_results: maxResults,
        include_answer: "basic",
        include_raw_content: false,
        include_images: false,
        include_favicon: true,
      }),
      signal: controller.signal,
    });

    const payload = await upstream.json().catch(() => null);
    if (!upstream.ok) {
      return json(
        {
          ok: false,
          code: "SEARCH_PROVIDER_ERROR",
          message: "The search provider could not complete this request.",
          providerStatus: upstream.status,
        },
        502,
      );
    }

    const results = Array.isArray(payload?.results)
      ? payload.results.slice(0, maxResults).map(normalizeResult)
      : [];

    return json({
      ok: true,
      provider: "tavily",
      query,
      answer: cleanText(payload?.answer, 1400),
      results,
      requestId: typeof payload?.request_id === "string" ? payload.request_id : null,
      responseTime: payload?.response_time ?? null,
      elapsedMs: Date.now() - startedAt,
      evidence: results
        .filter((result) => result.url)
        .map((result) => ({ rank: result.rank, evidenceRef: result.url })),
    });
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === "AbortError";
    return json(
      {
        ok: false,
        code: timedOut ? "SEARCH_TIMEOUT" : "SEARCH_REQUEST_FAILED",
        message: timedOut ? "Search timed out." : "Search request failed.",
      },
      timedOut ? 504 : 502,
    );
  } finally {
    clearTimeout(timeout);
  }
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      allow: "POST, OPTIONS",
      "cache-control": "no-store",
    },
  });
}

export function onRequest() {
  return json({ ok: false, code: "METHOD_NOT_ALLOWED", message: "Use POST /api/search." }, 405, {
    allow: "POST, OPTIONS",
  });
}
