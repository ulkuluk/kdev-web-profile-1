import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const MEDIA_SOURCE_DIR = path.join(process.cwd(), "media-source/work");
const PUBLIC_WORK_DIR = path.join(process.cwd(), "public/work");

async function processDirectory(slug) {
  const srcDir = path.join(MEDIA_SOURCE_DIR, slug);
  const outDir = path.join(PUBLIC_WORK_DIR, slug);

  if (!fs.existsSync(srcDir)) return;
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const manifest = {};
  const entries = fs.readdirSync(srcDir);

  for (const file of entries) {
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);
    const srcPath = path.join(srcDir, file);

    if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      console.log(`Optimizing image: ${slug}/${file}`);
      const image = sharp(srcPath);
      const metadata = await image.metadata();

      const targetWidth = Math.min(metadata.width || 1920, 1920);

      // Output WebP
      const webpOut = path.join(outDir, `${baseName}.webp`);
      await sharp(srcPath)
        .resize({ width: targetWidth, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(webpOut);

      // Output AVIF
      const avifOut = path.join(outDir, `${baseName}.avif`);
      await sharp(srcPath)
        .resize({ width: targetWidth, withoutEnlargement: true })
        .avif({ quality: 80 })
        .toFile(avifOut);

      manifest[`${baseName}.webp`] = {
        width: targetWidth,
        height: Math.round(targetWidth / ((metadata.width || 1) / (metadata.height || 1))),
        originalWidth: metadata.width,
        originalHeight: metadata.height,
      };
    } else if ([".mp4", ".webm"].includes(ext)) {
      const stats = fs.statSync(srcPath);
      const sizeMb = stats.size / (1024 * 1024);
      console.log(`Video file: ${slug}/${file} (${sizeMb.toFixed(2)} MB)`);
      if (sizeMb > 8) {
        console.warn(
          `WARNING: Video ${slug}/${file} is ${sizeMb.toFixed(2)} MB (target is under 8 MB)`,
        );
      }
      const destPath = path.join(outDir, file);
      fs.copyFileSync(srcPath, destPath);
      manifest[file] = {
        sizeBytes: stats.size,
        sizeMb: Number(sizeMb.toFixed(2)),
      };
    }
  }

  const manifestPath = path.join(outDir, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`Wrote manifest: ${manifestPath}`);
}

async function main() {
  if (!fs.existsSync(MEDIA_SOURCE_DIR)) {
    fs.mkdirSync(MEDIA_SOURCE_DIR, { recursive: true });
  }

  const slugs = fs
    .readdirSync(MEDIA_SOURCE_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  if (slugs.length === 0) {
    console.log("No work directories found in media-source/work/");
    return;
  }

  for (const slug of slugs) {
    await processDirectory(slug);
  }

  console.log("Media optimization complete!");
}

main().catch((err) => {
  console.error("Media optimization failed:", err);
  process.exit(1);
});
