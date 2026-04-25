#!/usr/bin/env node

/**
 * Creates .env and .env.example inside .agents/skills/goman-translations/
 * (relative to the current working directory). Never overwrites.
 *
 * Usage (run from your project root):
 *   npx github:bel-frontend/goman-live-skills
 */

import { existsSync, writeFileSync, mkdirSync, readFileSync, appendFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const SKILL_DIR = resolve(process.cwd(), '.agents/skills/goman-translations');

const ENV_CONTENT = `# goman.live credentials
# Get these from: https://app.goman.live → Settings → API Keys

GOMAN_API_KEY=your_api_key_here
GOMAN_APP_ID=your_application_id_here
`;

mkdirSync(SKILL_DIR, { recursive: true });

const envPath = join(SKILL_DIR, '.env');
const envExamplePath = join(SKILL_DIR, '.env.example');
const gitignorePath = join(SKILL_DIR, '.gitignore');

console.log(`\nFolder: ${SKILL_DIR}\n`);

for (const [path, label] of [[envExamplePath, '.env.example'], [envPath, '.env']]) {
    if (existsSync(path)) {
        console.log(`○ ${label} already exists — skipped`);
    } else {
        writeFileSync(path, ENV_CONTENT);
        console.log(`✓ Created ${label}`);
    }
}

// Ensure .env is git-ignored
const GITIGNORE_LINE = '.env';
if (!existsSync(gitignorePath)) {
    writeFileSync(gitignorePath, GITIGNORE_LINE + '\n');
    console.log(`✓ Created .gitignore (with .env)`);
} else {
    const content = readFileSync(gitignorePath, 'utf8');
    const hasEnv = content.split('\n').some((line) => line.trim() === GITIGNORE_LINE);
    if (hasEnv) {
        console.log(`○ .gitignore already ignores .env — skipped`);
    } else {
        appendFileSync(gitignorePath, (content.endsWith('\n') ? '' : '\n') + GITIGNORE_LINE + '\n');
        console.log(`✓ Added .env to .gitignore`);
    }
}

console.log(`\nNext: edit ${envPath} and fill in GOMAN_API_KEY and GOMAN_APP_ID\n`);
