#!/usr/bin/env node
// Search translations with optional filters
//
// Required env vars:
//   GOMAN_API_KEY  - your API key from goman.live
//   GOMAN_APP_ID   - your Application ID from goman.live
//
// Options:
//   --namespace  NS   filter by namespace (e.g. "auth.login")
//   --query      Q    search in keys and values
//   --page       N    page number (default: 1)
//   --limit      N    results per page (default: 20)
//
// Usage:
//   GOMAN_API_KEY=xxx GOMAN_APP_ID=yyy node goman-search.js --namespace auth.login
//   GOMAN_API_KEY=xxx GOMAN_APP_ID=yyy node goman-search.js --query button --limit 50

import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
await import(join(dirname(fileURLToPath(import.meta.url)), '_env.js'));

const API_BASE = process.env.GOMAN_API_URL || 'https://api.goman.live';
const { GOMAN_API_KEY, GOMAN_APP_ID } = process.env;

if (!GOMAN_API_KEY || !GOMAN_APP_ID) {
  console.error('Error: GOMAN_API_KEY and GOMAN_APP_ID must be set');
  process.exit(1);
}

const args = process.argv.slice(2);
const params = { page: '1', limit: '20' };

for (let i = 0; i < args.length; i += 2) {
  const flag = args[i].replace(/^--/, '');
  const value = args[i + 1];
  if (flag === 'query') params.search = value;
  else params[flag] = value;
}

const url = new URL(`${API_BASE}/search-localizations-mcp`);
Object.entries(params).forEach(([k, v]) => v && url.searchParams.set(k, v));

const res = await fetch(url.toString(), {
  headers: {
    'apiKey': GOMAN_API_KEY,
    'applicationid': GOMAN_APP_ID,
    'Content-Type': 'application/json',
  },
});

const data = await res.json();
console.log(JSON.stringify(data, null, 2));
