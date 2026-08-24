import { cp, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");
const githubPagesBasePath = "/rosee-homepage";

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
  "favicon.svg",
  "favicon.png",
  "apple-touch-icon.png",
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

async function rewriteAssetPaths(target) {
  const targetStat = await stat(target);

  if (targetStat.isDirectory()) {
    const entries = await readdir(target);
    await Promise.all(entries.map((entry) => rewriteAssetPaths(path.join(target, entry))));
    return;
  }

  if (!/\.(html|css|js|json|txt|xml|svg)$/.test(target)) {
    return;
  }

  const original = await readFile(target, "utf8");
  const rewritten = original
    .replaceAll('"/assets/', `"${githubPagesBasePath}/assets/`)
    .replaceAll("'/assets/", `'${githubPagesBasePath}/assets/`)
    .replaceAll("(/assets/", `(${githubPagesBasePath}/assets/`)
    .replaceAll('"/favicon.svg', `"${githubPagesBasePath}/favicon.svg`)
    .replaceAll("'/favicon.svg", `'${githubPagesBasePath}/favicon.svg`)
    .replaceAll('"/favicon.png', `"${githubPagesBasePath}/favicon.png`)
    .replaceAll("'/favicon.png", `'${githubPagesBasePath}/favicon.png`)
    .replaceAll('"/apple-touch-icon.png', `"${githubPagesBasePath}/apple-touch-icon.png`)
    .replaceAll("'/apple-touch-icon.png", `'${githubPagesBasePath}/apple-touch-icon.png`);

  if (rewritten !== original) {
    await writeFile(target, rewritten);
  }
}

const nestedExport = path.join(out, githubPagesBasePath.slice(1));
const sourceRoot = (await exists(path.join(nestedExport, "index.html"))) ? nestedExport : out;

if (!(await exists(path.join(sourceRoot, "index.html")))) {
  throw new Error("out/index.html not found. Run next build before syncing.");
}

for (const item of publishPaths) {
  const source = path.join(sourceRoot, item);
  const destination = path.join(root, item);

  await rm(destination, { force: true, recursive: true });

  if (await exists(source)) {
    await cp(source, destination, { recursive: true });
  }
}

await writeFile(path.join(root, ".nojekyll"), "");

for (const item of publishPaths) {
  const destination = path.join(root, item);

  if (await exists(destination)) {
    await rewriteAssetPaths(destination);
  }
}

console.log("GitHub Pages files synced to project root.");
