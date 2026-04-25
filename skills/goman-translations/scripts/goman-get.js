#!/usr/bin/env node
// Get translations for a specific key
//
// Required env vars:
//   GOMAN_API_KEY  - your API key from goman.live
//   GOMAN_APP_ID   - your Application ID from goman.live
//
// Usage:
//   GOMAN_API_KEY=xxx GOMAN_APP_ID=yyy node goman-get.js auth.login.button
//
// The fullKey is split on the last dot:
//   "auth.login.button" → namespace="auth.login", key="button"

import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
await import(join(dirname(fileURLToPath(import.meta.url)), '_env.js'));

const API_BASE = process.env.GOMAN_API_URL || 'https://api.goman.live';
const { GOMAN_API_KEY, GOMAN_APP_ID } = process.env;
const fullKey = process.argv[2];

if (!GOMAN_API_KEY || !GOMAN_APP_ID) {
  console.error('Error: GOMAN_API_KEY and GOMAN_APP_ID must be set');
  process.exit(1);
}

if (!fullKey || !fullKey.includes('.')) {
  console.error('Error: fullKey must contain a dot (e.g. auth.login.button)');
  console.error('Usage: node goman-get.js <fullKey>');
  process.exit(1);
}

const lastDot = fullKey.lastIndexOf('.');
const namespace = fullKey.slice(0, lastDot);
const key = fullKey.slice(lastDot + 1);

const res = await fetch(`${API_BASE}/get-translation-mcp/${namespace}/${key}`, {
  headers: {
    'apiKey': GOMAN_API_KEY,
    'applicationid': GOMAN_APP_ID,
    'Content-Type': 'application/json',
  },
});

const data = await res.json();
console.log(JSON.stringify(data, null, 2));
