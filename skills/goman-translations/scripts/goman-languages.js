#!/usr/bin/env node
// Get active languages for your application
//
// Required env vars:
//   GOMAN_API_KEY  - your API key from goman.live
//   GOMAN_APP_ID   - your Application ID from goman.live
//
// Usage:
//   GOMAN_API_KEY=xxx GOMAN_APP_ID=yyy node goman-languages.js

import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
await import(join(dirname(fileURLToPath(import.meta.url)), '_env.js'));

const API_BASE = process.env.GOMAN_API_URL || 'https://api.goman.live';
const { GOMAN_API_KEY, GOMAN_APP_ID } = process.env;

if (!GOMAN_API_KEY || !GOMAN_APP_ID) {
  console.error('Error: GOMAN_API_KEY and GOMAN_APP_ID must be set');
  process.exit(1);
}

const res = await fetch(`${API_BASE}/languages/active`, {
  headers: {
    'apiKey': GOMAN_API_KEY,
    'applicationid': GOMAN_APP_ID,
    'Content-Type': 'application/json',
  },
});

const data = await res.json();
console.log(JSON.stringify(data, null, 2));
