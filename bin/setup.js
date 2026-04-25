#!/usr/bin/env node

/**
 * goman-live-skills setup
 *
 * Creates .env (if missing) and .env.example in the project root.
 *
 * Usage:
 *   npx github:bel-frontend/goman-live-skills
 *   npx github:bel-frontend/goman-live-skills --target ./myapp
 */

import { existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const args = process.argv.slice(2);
const targetIdx = args.indexOf('--target');
const targetDir = targetIdx !== -1 ? resolve(args[targetIdx + 1]) : process.cwd();

function green(text)  { return `\x1b[32m${text}\x1b[0m`; }
function cyan(text)   { return `\x1b[36m${text}\x1b[0m`; }
function bold(text)   { return `\x1b[1m${text}\x1b[0m`; }
function dim(text)    { return `\x1b[2m${text}\x1b[0m`; }
function yellow(text) { return `\x1b[33m${text}\x1b[0m`; }

const ENV_CONTENT = `# goman.live credentials
# Get these from: https://app.goman.live → Settings → API Keys

GOMAN_API_KEY=your_api_key_here
GOMAN_APP_ID=your_application_id_here
`;

const envPath        = join(targetDir, '.env');
const envExamplePath = join(targetDir, '.env.example');

if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });

console.log('');
console.log(bold('goman.live setup'));
console.log(dim('─'.repeat(40)));

writeFileSync(envExamplePath, ENV_CONTENT);
console.log(green('✓') + ' Created .env.example');

if (existsSync(envPath)) {
    console.log(yellow('○') + ' .env already exists — not overwritten');
} else {
    writeFileSync(envPath, ENV_CONTENT);
    console.log(green('✓') + ' Created .env');
}

console.log('');
console.log(bold('Next steps:'));
console.log('');
console.log('  1. Install the skill (if not done yet):');
console.log(cyan('     npx skills add bel-frontend/goman-live-skills'));
console.log('');
console.log('  2. Fill in your credentials in ' + cyan('.env') + ':');
console.log(dim('     GOMAN_API_KEY=...'));
console.log(dim('     GOMAN_APP_ID=...'));
console.log('');
console.log(dim('     Get both values: goman.live dashboard → Settings → API Keys'));
console.log('');
console.log('  3. In Copilot chat, type:');
console.log(cyan('     /goman-translations localize my LoginScreen component'));
console.log('');
