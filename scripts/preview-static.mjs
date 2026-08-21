import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT || 3000);
const basePath = process.env.PREVIEW_BASE_PATH || "/rosee-homepage";

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".woff2", "font/woff2"],
]);

async function fileExists(target) {
  try {
    const info = await stat(target);
    return info.isFile();
  } catch {
    return false;
  }
}

function redirect(response, location) {
  response.writeHead(302, { Location: location });
  response.end();
}

function sendFile(response, filePath, statusCode = 200) {
  const ext = path.extname(filePath).toLowerCase();
  response.writeHead(statusCode, {
    "Content-Type": contentTypes.get(ext) || "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
}

async function resolveFile(requestPath) {
  let pathname = decodeURIComponent(requestPath);

  if (pathname === "/" || pathname === basePath) {
    return { redirectTo: `${basePath}/` };
  }

  if (pathname.startsWith(`${basePath}/`)) {
    pathname = pathname.slice(basePath.length) || "/";
  }

  if (pathname === "/") {
    pathname = "/index.html";
  }

  const directPath = path.resolve(root, `.${pathname}`);

  if (!directPath.startsWith(root)) {
    return null;
  }

  if (await fileExists(directPath)) {
    return { filePath: directPath };
  }

  if (!path.extname(pathname)) {
    const indexPath = path.resolve(root, `.${pathname}`, "index.html");

    if (indexPath.startsWith(root) && (await fileExists(indexPath))) {
      return { filePath: indexPath };
    }
  }

  const notFoundPath = path.join(root, "404.html");
  if (await fileExists(notFoundPath)) {
    return { filePath: notFoundPath, statusCode: 404 };
  }

  return null;
}

createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
    const resolved = await resolveFile(url.pathname);

    if (!resolved) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("404");
      return;
    }

    if (resolved.redirectTo) {
      redirect(response, resolved.redirectTo);
      return;
    }

    sendFile(response, resolved.filePath, resolved.statusCode || 200);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(error instanceof Error ? error.message : "Server error");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`ROSEE preview: http://127.0.0.1:${port}${basePath}/`);
});
