const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 8;
const buckets = globalThis.__quickspinSearchBuckets ?? new Map();
globalThis.__quickspinSearchBuckets = buckets;

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

const getClientKey = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers["x-real-ip"];
  if (typeof realIp === "string" && realIp) return realIp;
  return "anonymous";
};

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

const sameOriginRequest = (req) => {
  const origin = req.headers.origin;
  if (!origin) return true;
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  if (!host) return false;
  const proto = req.headers["x-forwarded-proto"] || "https";
  return origin === `${proto}://${host}`;
};

const parseBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === "string") return JSON.parse(req.body);
  if (Buffer.isBuffer(req.body)) return JSON.parse(req.body.toString("utf8"));
  return req.body;
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({
      ok: false,
      code: "METHOD_NOT_ALLOWED",
      message: "Use POST /api/search.",
    });
  }

  if (!sameOriginRequest(req)) {
    return res.status(403).json({
      ok: false,
      code: "ORIGIN_NOT_ALLOWED",
      message: "Search requests must originate from this QuickSpin deployment.",
    });
  }

  if (!allowRequest(getClientKey(req))) {
    res.setHeader("Retry-After", "60");
    return res.status(429).json({
      ok: false,
      code: "RATE_LIMITED",
      message: "Too many searches. Try again in a minute.",
    });
  }

  if (!process.env.TAVILY_API_KEY) {
    return res.status(503).json({
      ok: false,
      code: "SEARCH_PROVIDER_NOT_CONFIGURED",
      message: "Search provider is not configured.",
    });
  }

  let body;
  try {
    body = parseBody(req);
  } catch {
    return res.status(400).json({
      ok: false,
      code: "INVALID_JSON",
      message: "Request body must be valid JSON.",
    });
  }

  const query = cleanText(body?.query, 320);
  if (query.length < 3) {
    return res.status(400).json({
      ok: false,
      code: "QUERY_TOO_SHORT",
      message: "Enter a more specific search.",
    });
  }

  const maxResults = Math.min(5, Math.max(1, Number(body?.maxResults) || 5));
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const startedAt = Date.now();
    const upstream = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TAVILY_API_KEY}`,
        "Content-Type": "application/json",
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
      return res.status(502).json({
        ok: false,
        code: "SEARCH_PROVIDER_ERROR",
        message: "The search provider could not complete this request.",
        providerStatus: upstream.status,
      });
    }

    const results = Array.isArray(payload?.results)
      ? payload.results.slice(0, maxResults).map(normalizeResult)
      : [];

    return res.status(200).json({
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
    return res.status(timedOut ? 504 : 502).json({
      ok: false,
      code: timedOut ? "SEARCH_TIMEOUT" : "SEARCH_REQUEST_FAILED",
      message: timedOut ? "Search timed out." : "Search request failed.",
    });
  } finally {
    clearTimeout(timeout);
  }
}
