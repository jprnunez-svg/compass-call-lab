import { get, put } from "@vercel/blob";
import { timingSafeEqual } from "node:crypto";

const PATH = "call-lab/db.json";
const MAX_BYTES = 4 * 1024 * 1024;

function authorized(req) {
  const expected = String(process.env.ACCESS_CODE || "").trim();
  const given = String(req.headers["x-access-code"] || "").trim();
  const a = Buffer.from(given), b = Buffer.from(expected);
  if (!expected || a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);
  const chunks = [];
  let size = 0;
  for await (const c of req) {
    size += c.length;
    if (size > MAX_BYTES) throw new Error("too large");
    chunks.push(c);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (!String(process.env.ACCESS_CODE || "").trim()) {
    return res.status(503).json({ error: "not_configured" });
  }
  if (!authorized(req)) return res.status(401).json({ error: "bad access code" });

  if (req.method === "GET") {
    try {
      const r = await get(PATH, { access: "private", useCache: false });
      if (!r || r.statusCode !== 200 || !r.stream) return res.status(200).json({ empty: true });
      const text = await new Response(r.stream).text();
      res.setHeader("Content-Type", "application/json");
      return res.status(200).send(text);
    } catch (e) {
      if (e && e.name === "BlobNotFoundError") return res.status(200).json({ empty: true });
      console.error(e);
      return res.status(500).json({ error: "read failed" });
    }
  }

  if (req.method === "PUT") {
    let data;
    try { data = await readBody(req); } catch { return res.status(400).json({ error: "invalid body" }); }
    if (!data || !Array.isArray(data.calls) || !Array.isArray(data.scripts)) {
      return res.status(400).json({ error: "not a call lab database" });
    }
    const text = JSON.stringify(data);
    if (Buffer.byteLength(text) > MAX_BYTES) return res.status(413).json({ error: "too large" });
    try {
      await put(PATH, text, {
        access: "private", addRandomSuffix: false, allowOverwrite: true,
        contentType: "application/json", cacheControlMaxAge: 60,
      });
      return res.status(200).json({ ok: true, savedAt: new Date().toISOString() });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "write failed" });
    }
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).json({ error: "method not allowed" });
}
