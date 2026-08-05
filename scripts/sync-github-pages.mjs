import { cp, rm, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");

const publishPaths = [
  "_next",
  "assets",
  "about",
  "brands",
  "contact",
  "notice",
  "product-types",
  "products",
  "recruit",
  "404.html",
  "index.html",
];

async function exists(target) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

if (!(await exists(path.join(out, "index.html")))) {
  throw new Error("out/index.html not found. Run next build before syncing.");
}

for (const item of publishPaths) {
  const source = path.join(out, item);
  const destination = path.join(root, item);

  await rm(destination, { force: true, recursive: true });

  if (await exists(source)) {
    await cp(source, destination, { recursive: true });
  }
}

await writeFile(path.join(root, ".nojekyll"), "");

console.log("GitHub Pages files synced to project root.");
