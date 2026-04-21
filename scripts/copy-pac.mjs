import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const webRoot = path.resolve(__dirname, "..");
const srcCandidates = [
  path.resolve(webRoot, "pac"),
  path.resolve(webRoot, "..", "pac"),
];
const srcDir = srcCandidates.find((p) => fs.existsSync(p)) ?? null;
const destDir = path.resolve(webRoot, "public", "pac");

fs.mkdirSync(destDir, { recursive: true });

const alias = [
  ["1", "大漆茶杯.jpg"],
  ["2", "大漆葫芦.jpg"],
  ["3", "大漆桌子.jpg"],
  ["4", "大漆钢笔.jpg"],
  ["5", "鸿奕漆器.jpg"],
  ["6", "大漆散珠.jpg"],
  ["7", "简易漆扇.jpg"],
  ["8", "大漆手工扇.jpg"],
  ["9", "简易漆扇1.jpg"],
  ["10", "大漆茶杯1.jpg"],
  ["11", "大漆葫芦1.jpg"],
  ["12", "大漆手工扇1.jpg"],
];

if (srcDir) {
  for (const entry of fs.readdirSync(srcDir)) {
    if (!/\.jpe?g$/i.test(entry)) continue;
    const from = path.resolve(srcDir, entry);
    const to = path.resolve(destDir, entry);
    fs.copyFileSync(from, to);
  }

  for (const [id, filename] of alias) {
    const from = path.resolve(srcDir, filename);
    const to = path.resolve(destDir, `${id}.jpg`);
    if (fs.existsSync(from)) {
      fs.copyFileSync(from, to);
    }
  }
}

console.log(`Copied pac images to ${destDir}`);
