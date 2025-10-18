#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd());
const ICONS_DIR = path.join(ROOT, 'app', 'public', 'images', 'food');

function mediaTypeFor(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  return 'application/octet-stream';
}

async function run() {
  const entries = await fs.readdir(ICONS_DIR, { withFileTypes: true });
  const files = entries.filter(e => e.isFile()).map(e => e.name);
  const list = [];

  for (const name of files) {
    const full = path.join(ICONS_DIR, name);
    const mt = mediaTypeFor(name);
    if (mt === 'image/svg+xml') {
      const raw = await fs.readFile(full, 'utf8');
      list.push({ name, mediaType: mt, content: raw });
    } else {
      const buf = await fs.readFile(full);
      const b64 = buf.toString('base64');
      list.push({ name, mediaType: mt, content: b64 });
    }
  }

  const json = JSON.stringify(list, null, 2);
  process.stdout.write(json);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

