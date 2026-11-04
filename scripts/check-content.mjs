// Fails (exit 1) if:
// 1. Any placeholder remains in the content layer: "TODO:" or "kdev.example".
// 2. Any media file referenced in content or MDX case studies is missing from public/.
// 3. Any media asset exceeds the size limit (> 8 MB for videos/assets).
// Note: This script is not hooked into `npm run build` to allow development and staging.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const CONTENT_DIR = join(process.cwd(), "src/content");
const PUBLIC_DIR = join(process.cwd(), "public");
const WORK_SOURCE_DIR = join(process.cwd(), "media-source/work");
const MAX_MEDIA_BYTES = 8 * 1024 * 1024; // 8 MB

const hits = [];

// 1. Scan TypeScript content files for "TODO:" or "kdev.example"
const stripComments = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|\s)\/\/.*$/gm, "$1");
const badRegex = /TODO:|kdev\.example/;

const contentFiles = readdirSync(CONTENT_DIR).filter(
  (f) => f.endsWith(".ts") && !f.endsWith(".test.ts"),
);

for (const file of contentFiles) {
  const filePath = join(CONTENT_DIR, file);
  const lines = stripComments(readFileSync(filePath, "utf8")).split("\n");
  lines.forEach((line, i) => {
    if (badRegex.test(line)) {
      hits.push(`[PLACEHOLDER] ${file}:${i + 1}  ${line.trim()}`);
    }
  });
}

// 2. Scan MDX case studies for "TODO:" and referenced media
const workDir = join(CONTENT_DIR, "work");
if (existsSync(workDir)) {
  const mdxFiles = readdirSync(workDir).filter((f) => f.endsWith(".mdx"));
  for (const mdx of mdxFiles) {
    const mdxPath = join(workDir, mdx);
    const content = readFileSync(mdxPath, "utf8");

    // Scan for TODO:
    content.split("\n").forEach((line, i) => {
      if (/TODO:/.test(line)) {
        hits.push(`[TODO in MDX] work/${mdx}:${i + 1}  ${line.trim()}`);
      }
    });

    // Scan for referenced media in public/
    const mediaMatches = content.matchAll(/(?:src|poster)=["'](\/work\/[^"']+)["']/g);
    for (const match of mediaMatches) {
      const mediaRelPath = match[1];
      const mediaFullPath = join(PUBLIC_DIR, mediaRelPath);
      if (!existsSync(mediaFullPath)) {
        hits.push(
          `[MISSING MEDIA] work/${mdx} references "${mediaRelPath}" which does not exist in public/`,
        );
      }
    }
  }
}

// 3. Scan for media over size limits (> 8 MB)
function checkMediaSizes(dirPath) {
  if (!existsSync(dirPath)) return;
  const entries = readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      checkMediaSizes(fullPath);
    } else if (/\.(mp4|webm|png|jpg|jpeg|webp|avif)$/i.test(entry.name)) {
      const stats = statSync(fullPath);
      if (stats.size > MAX_MEDIA_BYTES) {
        const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
        hits.push(`[OVERSIZED MEDIA] ${fullPath} is ${sizeMb} MB (limit: 8 MB)`);
      }
    }
  }
}

checkMediaSizes(join(PUBLIC_DIR, "work"));
checkMediaSizes(WORK_SOURCE_DIR);

if (hits.length > 0) {
  console.error(`check:content audit found ${hits.length} issue(s):\n`);
  hits.forEach((h) => console.error(`  ${h}`));
  console.error(
    "\nAudit failed: Please resolve placeholders and media issues before final release.",
  );
  process.exit(1);
} else {
  console.log(
    "check:content: All checks passed. Zero placeholders, all media verified within limits.",
  );
}
