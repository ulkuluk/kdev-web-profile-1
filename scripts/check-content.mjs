// Fails (exit 1) if any placeholder is still in the content layer: "TODO:" or "kdev.example".
// Comments are ignored, only string values count. Not part of `npm run build`.
// ponytail: text scan, not a TS import (no extra runtime needed). Move to a schema check if
// content ever comes from a CMS.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = new URL("../src/content/", import.meta.url);
const strip = (src) => src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|\s)\/\/.*$/gm, "$1");
const bad = /TODO:|kdev\.example/;
const hits = [];

for (const file of readdirSync(dir).filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts"))) {
  strip(readFileSync(join(dir.pathname.replace(/^\/(\w:)/, "$1"), file), "utf8"))
    .split("\n")
    .forEach((line, i) => bad.test(line) && hits.push(`${file}:${i + 1}  ${line.trim()}`));
}

if (hits.length) {
  console.error(`check:content found ${hits.length} placeholder(s):\n` + hits.join("\n"));
  process.exit(1);
}
console.log("check:content: no placeholders left.");
