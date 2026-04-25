#!/usr/bin/env node
// Create or update translations for a key
//
// Required env vars:
//   GOMAN_API_KEY  - your API key from goman.live
//   GOMAN_APP_ID   - your Application ID from goman.live
//
// Usage:
//   GOMAN_API_KEY=xxx GOMAN_APP_ID=yyy node goman-create.js \
//     auth.login.button \
//     '{"en":"Log in","be":"Увайсці"}' \
//     "Button on the login page"
//
// Args:
//   1. fullKey        - e.g. "auth.login.button" (namespace = everything before last dot)
//   2. translations   - JSON object {"langCode": "value", ...}
//   3. context        - (optional) hint for translators

import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
await import(join(dirname(fileURLToPath(import.meta.url)), '_env.js'));

const API_BASE = process.env.GOMAN_API_URL || 'https://api.goman.live';
const { GOMAN_API_KEY, GOMAN_APP_ID } = process.env;
const [fullKey, translationsRaw, context] = process.argv.slice(2);

if (!GOMAN_API_KEY || !GOMAN_APP_ID) {
  console.error('Error: GOMAN_API_KEY and GOMAN_APP_ID must be set');
  process.exit(1);
}

if (!fullKey || !fullKey.includes('.')) {
  console.error('Error: fullKey must contain a dot (e.g. auth.login.button)');
  process.exit(1);
}

if (!translationsRaw) {
  console.error('Error: translations JSON is required');
  console.error('Usage: node goman-create.js <fullKey> <translationsJSON> [context]');
  process.exit(1);
}

let translations;
try {
  translations = JSON.parse(translationsRaw);
} catch {
  console.error('Error: translations must be valid JSON, e.g. \'{"en":"Hello","be":"Прывітанне"}\'');
  process.exit(1);
}

const lastDot = fullKey.lastIndexOf('.');
const namespace = fullKey.slice(0, lastDot);
const key = fullKey.slice(lastDot + 1);

const body = Object.entries(translations).map(([langCode, value]) => {
  const entry = { langCode, key, value, namespace };
  if (context) entry.context = context;
  return entry;
});

const res = await fetch(`${API_BASE}/create-localization-mcp`, {
  method: 'POST',
  headers: {
    'apiKey': GOMAN_API_KEY,
    'applicationid': GOMAN_APP_ID,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

const data = await res.json();
console.log(JSON.stringify(data, null, 2));
