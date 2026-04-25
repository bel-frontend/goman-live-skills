#!/usr/bin/env node

/**
 * goman-live-skills MCP setup
 *
 * Creates or merges .vscode/mcp.json with the goman.live MCP server config.
 *
 * Skill installation is done separately via:
 *   npx skills add https://github.com/bel-frontend/goman-live-skills --skill goman-translations
 *
 * Usage:
 *   npx goman-live-skills --mcp
 *   npx goman-live-skills --mcp --target ./myapp
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const args = process.argv.slice(2);
const targetIdx = args.indexOf('--target');
const targetDir = targetIdx !== -1 ? resolve(args[targetIdx + 1]) : process.cwd();

function ensureDir(dir) {
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function green(text) { return `\x1b[32m${text}\x1b[0m`; }
function cyan(text)  { return `\x1b[36m${text}\x1b[0m`; }
function bold(text)  { return `\x1b[1m${text}\x1b[0m`; }
function dim(text)   { return `\x1b[2m${text}\x1b[0m`; }

const MCP_SERVER = {
    'goman-mcp': {
        type: 'streamable-http',
        url: 'https://mcp.goman.live/mcp',
        headers: {
            apiKey: '${input:goManApiKey}',
            applicationid: '${input:goManAppId}',
        },
    },
};

const MCP_INPUTS = [
    {
        id: 'goManApiKey',
        type: 'promptString',
        description: 'goman.live API Key',
        password: true,
    },
    {
        id: 'goManAppId',
        type: 'promptString',
        description: 'goman.live Application ID',
    },
];

const vscodedir = join(targetDir, '.vscode');
const mcpPath = join(vscodedir, 'mcp.json');

console.log('');
console.log(bold('goman.live MCP setup'));
console.log(dim('─'.repeat(40)));

if (existsSync(mcpPath)) {
    try {
        const existing = JSON.parse(readFileSync(mcpPath, 'utf8'));
        existing.servers = { ...existing.servers, ...MCP_SERVER };
        const existingInputIds = (existing.inputs ?? []).map((i) => i.id);
        const newInputs = MCP_INPUTS.filter((i) => !existingInputIds.includes(i.id));
        existing.inputs = [...(existing.inputs ?? []), ...newInputs];
        writeFileSync(mcpPath, JSON.stringify(existing, null, 4));
        console.log(green('✓') + ' Merged goman-mcp into existing .vscode/mcp.json');
    } catch {
        console.log('⚠  Could not parse existing .vscode/mcp.json — skipping merge.');
        process.exit(1);
    }
} else {
    ensureDir(vscodedir);
    writeFileSync(mcpPath, JSON.stringify({ servers: MCP_SERVER, inputs: MCP_INPUTS }, null, 4));
    console.log(green('✓') + ' Created .vscode/mcp.json');
}

console.log('');
console.log(bold('Next steps:'));
console.log('');
console.log('  1. Install the skill (if not done yet):');
console.log(cyan('     npx skills add bel-frontend/goman-live-skills'));
console.log('');
console.log('  2. Set up credentials for scripts (no MCP needed):');
console.log(dim('     Create a .env file in your project root:'));
console.log('');
console.log(dim('       GOMAN_API_KEY=your_api_key_here'));
console.log(dim('       GOMAN_APP_ID=your_application_id_here'));
console.log('');
console.log(dim('     Get both values at: goman.live dashboard → Settings → API Keys'));
console.log('');
console.log('  3. In VS Code, open the MCP panel and connect goman-mcp');
console.log(dim('     (uses the same API key + App ID from step 2)'));
console.log('');
console.log('  4. In Copilot chat, type:');
console.log(cyan('     /goman-translations localize my LoginScreen component'));
console.log('');

