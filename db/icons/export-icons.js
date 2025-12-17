const fs = require('fs');
const path = require('path');

const csvText = fs.readFileSync('icons.csv', 'utf8');

// Minimal CSV parser to keep SVG content intact (handles quoted commas/newlines)
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];
    if (ch === '"' && next === '"') {
      field += '"';
      i++; // skip escaped quote
      continue;
    }
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === '\n' && !inQuotes) {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      continue;
    }
    if (ch === '\r') continue;
    if (ch === ',' && !inQuotes) {
      row.push(field);
      field = '';
      continue;
    }
    field += ch;
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const [headerLine, ...rows] = parseCsv(csvText).filter((r) => r.length > 0);
const cols = headerLine.map((c) => c.trim());

const outDir = path.join(__dirname, 'upload');
fs.mkdirSync(outDir, { recursive: true });

function slugify(str) {
  return String(str || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'icon';
}

rows.forEach((line) => {
  const rec = Object.fromEntries(cols.map((c, i) => [c, line[i] ?? '']));
  const id = Number(rec.id);
  const name = rec.name_en || `icon-${id || 'na'}`;
  const media = (rec.mediatype || '').toLowerCase();
  const content = rec.content ?? '';
  if (!content) return;

  const base = `${id}-${slugify(name)}`;
  if (content.trim().startsWith('<')) {
    fs.writeFileSync(path.join(outDir, `${base}.svg`), content, 'utf8');
    return;
  }
  const buf = Buffer.from(content, 'base64');
  let ext = 'bin';
  if (media.includes('png')) ext = 'png';
  else if (media.includes('webp')) ext = 'webp';
  else if (media.includes('jpeg') || media.includes('jpg')) ext = 'jpg';
  else if (media.includes('svg')) ext = 'svg';

  fs.writeFileSync(path.join(outDir, `${base}.${ext}`), buf);
});
