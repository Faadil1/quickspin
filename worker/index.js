const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 8;
const buckets = new Map();

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...headers,
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

const getClientKey = (request) =>
  request.headers.get("cf-connecting-ip") ||
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  "anonymous";

const allowRequest = (key) => {
  const now = Date.now();

  for (const [bucketKey, bucket] of buckets) {
    if (now - bucket.startedAt > RATE_WINDOW_MS * 2) buckets.delete(bucketKey);
  }

  const current = buckets.get(key);
  if (!current || now - current.startedAt >= RATE_WINDOW_MS) {
    buckets.set(key, { startedAt: now, count: 1 });
    return true;
  }

  if (current.count >= RATE_LIMIT) return false;
  current.count += 1;
  return true;
};

const sameOriginRequest = (request) => {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  return origin === new URL(request.url).origin;
};

async function handleSearch(request, env) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        allow: "POST, OPTIONS",
        "cache-control": "no-store",
      },
    });
  }

  if (request.method !== "POST") {
    return json(
      { ok: false, code: "METHOD_NOT_ALLOWED", message: "Use POST /api/search." },
      405,
      { allow: "POST, OPTIONS" },
    );
  }

  if (!sameOriginRequest(request)) {
    return json(
      {
        ok: false,
        code: "ORIGIN_NOT_ALLOWED",
        message: "Search requests must originate from this QuickSpin deployment.",
      },
      403,
    );
  }

  if (!allowRequest(getClientKey(request))) {
    return json(
      { ok: false, code: "RATE_LIMITED", message: "Too many searches. Try again in a minute." },
      429,
      { "retry-after": "60" },
    );
  }

  if (!env.TAVILY_API_KEY) {
    return json(
      {
        ok: false,
        code: "SEARCH_PROVIDER_NOT_CONFIGURED",
        message: "Search provider is not configured.",
      },
      503,
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json(
      { ok: false, code: "INVALID_JSON", message: "Request body must be valid JSON." },
      400,
    );
  }

  const query = cleanText(body?.query, 320);
  if (query.length < 3) {
    return json(
      { ok: false, code: "QUERY_TOO_SHORT", message: "Enter a more specific search." },
      400,
    );
  }

  const maxResults = Math.min(5, Math.max(1, Number(body?.maxResults) || 5));
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

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
    const timedOut = error && typeof error === "object" && error.name === "AbortError";
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/search") {
      return handleSearch(request, env);
    }

    if (url.pathname.startsWith("/api/")) {
      return json({ ok: false, code: "NOT_FOUND", message: "Unknown API route." }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};
