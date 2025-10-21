#!/usr/bin/env node
/*
  Importa ícones a partir de uma PASTA (padrão: db/icons) ou de um arquivo JSON
  e envia para a API em lotes. Após sucesso total, remove os arquivos da pasta.

  Uso (executar a partir de db/):
    node import_food_icons.js [caminho_pasta_ou_json] [api_base] [batch_size]

  Variáveis de ambiente (opcional):
    API_BASE   - URL base da API (default: http://localhost:5106)
    ICONS_JSON - Caminho do JSON ou pasta (default: <repo>/db/icons)
    ICONS_DIR  - Alternativa ao ICONS_JSON quando só usar pasta
    BATCH_SIZE - Tamanho do lote (default: 50)
    KEEP_FILES - Manter arquivos após importação (default: 0 = apaga após sucesso TOTAL)

  O JSON deve ser um array de objetos com:
    { name: string, mediaType: string, content: string }
*/

const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const https = require('node:https');

function loadIcons(jsonPath) {
  const raw = fs.readFileSync(jsonPath, 'utf8');
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) {
    throw new Error('Esperado um array JSON de ícones.');
  }
  const out = [];
  for (const item of data) {
    if (!item || typeof item !== 'object') continue;
    const name = (item.name || '').trim();
    const mediaType = (item.mediaType || '').trim();
    const content = item.content || '';
    if (!name) continue; // ignora inválidos
    out.push({ name, mediaType, content });
  }
  return out;
}

function loadIconsFromDir(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const icons = [];
  for (const ent of entries) {
    if (!ent.isFile()) continue;
    const ext = path.extname(ent.name).toLowerCase();
    if (!['.svg', '.png', '.jpg', '.jpeg', '.webp'].includes(ext)) continue;

    const abs = path.resolve(dirPath, ent.name);
    let mediaType = 'application/octet-stream';
    if (ext === '.svg') mediaType = 'image/svg+xml';
    else if (ext === '.png') mediaType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') mediaType = 'image/jpeg';
    else if (ext === '.webp') mediaType = 'image/webp';

    let content;
    if (ext === '.svg') {
      content = fs.readFileSync(abs, 'utf8');
    } else {
      const buf = fs.readFileSync(abs);
      content = buf.toString('base64');
    }

    icons.push({ name: ent.name, mediaType, content, __sourcePath: abs });
  }
  return icons;
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function postJson(urlStr, payload, timeoutMs = 60000) {
  return new Promise((resolve) => {
    const url = new URL(urlStr);
    const body = Buffer.from(JSON.stringify(payload), 'utf8');
    const isHttps = url.protocol === 'https:';
    const lib = isHttps ? https : http;

    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': body.length,
      },
      timeout: timeoutMs,
    };

    const req = lib.request(options, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString('utf8');
        const status = res.statusCode || 0;
        resolve({ status, ok: status >= 200 && status < 300, body: text });
      });
    });

    req.on('timeout', () => {
      req.destroy(new Error('timeout'));
    });
    req.on('error', (err) => {
      resolve({ status: 0, ok: false, body: String(err) });
    });
    req.write(body);
    req.end();
  });
}

async function main() {
  const repoRoot = path.resolve(__dirname, '..');
  const defaultDir = path.join(__dirname, 'icons');

  let iconsPath = process.env.ICONS_JSON || process.env.ICONS_DIR || process.argv[2] || defaultDir;
  const baseUrl = (process.env.API_BASE || process.argv[3] || 'http://localhost:5106').replace(/\/$/, '');
  const batchSize = parseInt(process.env.BATCH_SIZE || process.argv[4] || '50', 10) || 50;
  const keepFiles = (process.env.KEEP_FILES || '0') === '1';

  // Se um caminho relativo foi informado e não encontrado a partir do CWD (db/),
  // tenta resolver relativo à raiz do repositório.
  if (!fs.existsSync(iconsPath)) {
    const alt = path.join(repoRoot, iconsPath);
    if (fs.existsSync(alt)) {
      iconsPath = alt;
    }
  }

  if (!fs.existsSync(iconsPath)) {
    console.error(`Arquivo não encontrado: ${iconsPath}`);
    process.exit(2);
  }

  let icons;
  try {
    const stat = fs.statSync(iconsPath);
    if (stat.isDirectory()) {
      icons = loadIconsFromDir(iconsPath);
    } else {
      icons = loadIcons(iconsPath);
    }
  } catch (e) {
    console.error('Falha ao ler JSON:', e && e.message ? e.message : e);
    process.exit(3);
  }

  if (!icons.length) {
    console.log('Nenhum ícone válido para importar.');
    return;
  }

  const url = `${baseUrl}/api/food-icons/many`;
  const fromDir = fs.existsSync(iconsPath) && fs.statSync(iconsPath).isDirectory();
  console.log(`Importando ${icons.length} ícones para ${url} (lotes de ${batchSize})...`);
  if (fromDir) console.log(keepFiles ? 'KEEP_FILES=1 → mantendo arquivos após envio.' : 'KEEP_FILES=0 → apagando arquivos após sucesso de cada lote.');

  let sent = 0;
  const batches = chunk(icons, batchSize);
  for (let i = 0; i < batches.length; i++) {
    const res = await postJson(url, batches[i]);
    if (res.ok) {
      sent += batches[i].length;
      console.log(`Lote ${i + 1}/${batches.length}: OK (${batches[i].length} ícones)`);
    } else {
      console.error(`Lote ${i + 1}/${batches.length}: FALHOU (status ${res.status})`);
      if (res.body) console.error(res.body);
    }
  }

  // Após sucesso total, apaga todos os arquivos da pasta (se origem for diretório)
  if (fromDir && !keepFiles && sent === icons.length) {
    try {
      const entries = fs.readdirSync(iconsPath, { withFileTypes: true });
      for (const ent of entries) {
        if (!ent.isFile()) continue;
        const ext = path.extname(ent.name).toLowerCase();
        if (!['.svg', '.png', '.jpg', '.jpeg', '.webp'].includes(ext)) continue;
        const abs = path.resolve(iconsPath, ent.name);
        try { fs.unlinkSync(abs); } catch {}
      }
      console.log('Importação concluída com sucesso. Arquivos removidos de', iconsPath);
    } catch (e) {
      console.warn('Falha ao limpar pasta de ícones:', e && e.message ? e.message : e);
    }
  } else if (fromDir && sent !== icons.length) {
    console.warn('Importação parcial. Arquivos mantidos para nova tentativa.');
  }

  console.log(`Concluído. Ícones enviados: ${sent}/${icons.length}`);
  if (sent !== icons.length) process.exit(1);
}

main().catch((err) => {
  console.error('Erro inesperado:', err);
  process.exit(1);
});
