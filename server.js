const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const root = __dirname;
const dataDir = path.join(root, "data");
const communityFile = path.join(dataDir, "community.json");
const port = Number(process.env.PORT || 4174);
const host = process.env.HOST || "0.0.0.0";
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};
let queue = Promise.resolve();

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(communityFile);
  } catch {
    await fs.writeFile(
      communityFile,
      JSON.stringify([
        {
          id: "seed-1",
          name: "K",
          title: "이번 주 반려동물 제품 소스 공유",
          message: "릴스 반응 좋은 강아지 물병 제품을 찾았습니다. 경쟁도는 낮고 시연 영상 만들기 쉬워요.",
          likes: 0,
          comments: [],
          createdAt: new Date().toISOString(),
        },
        {
          id: "seed-2",
          name: "H",
          title: "첫 판매 인증",
          message: "미니 프로젝터 제품으로 상세페이지 테스트 후 첫 주문 들어왔습니다.",
          likes: 0,
          comments: [],
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
      ], null, 2),
    );
  }
}

async function readJson(file, fallback) {
  await ensureStore();
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw || JSON.stringify(fallback));
}

async function writeJson(file, value) {
  const temp = `${file}.${process.pid}.${Date.now()}.${crypto.randomUUID()}.tmp`;
  await fs.writeFile(temp, JSON.stringify(value, null, 2), "utf8");
  await fs.rename(temp, file);
}

function locked(task) {
  queue = queue.catch(() => {}).then(task);
  return queue;
}

function sendJson(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

function clean(value, max) {
  return String(value || "").replace(/[<>]/g, "").trim().slice(0, max);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error("payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

async function api(req, res, url) {
  if (url.pathname === "/api/health") {
    sendJson(res, 200, { ok: true, uptime: Math.round(process.uptime()) });
    return;
  }

  if (url.pathname === "/api/community" && req.method === "GET") {
    const posts = await readJson(communityFile, []);
    sendJson(res, 200, posts.slice(-80).reverse());
    return;
  }

  if (url.pathname === "/api/community" && req.method === "POST") {
    const body = JSON.parse((await readBody(req)) || "{}");
    const post = {
      id: crypto.randomUUID(),
      name: clean(body.name, 24) || "Member",
      title: clean(body.title, 60),
      message: clean(body.message, 360),
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
    };
    if (!post.title || !post.message) {
      sendJson(res, 400, { error: "title and message are required" });
      return;
    }
    await locked(async () => {
      const posts = await readJson(communityFile, []);
      posts.push(post);
      await writeJson(communityFile, posts.slice(-500));
    });
    sendJson(res, 201, post);
    return;
  }

  sendJson(res, 404, { error: "not found" });
}

async function staticFile(req, res, url) {
  const safe = path.normalize(url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  const file = path.join(root, safe);
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  try {
    const data = await fs.readFile(file);
    res.writeHead(200, { "content-type": mime[path.extname(file).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

async function start() {
  await ensureStore();
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host || `${host}:${port}`}`);
      if (url.pathname.startsWith("/api/")) return api(req, res, url);
      return staticFile(req, res, url);
    } catch (error) {
      sendJson(res, 500, { error: error.message });
    }
  });
  server.maxConnections = Number(process.env.MAX_CONNECTIONS || 500);
  server.listen(port, host, () => console.log(`TrendScope running on ${host}:${port}`));
}

start();
