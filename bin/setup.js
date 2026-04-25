#!/usr/bin/env node

/**
 * Creates .env and .env.example inside .agents/skills/goman-translations/
 * (relative to the current working directory). Never overwrites.
 *
 * Usage (run from your project root):
 *   npx github:bel-frontend/goman-live-skills
 */

import { existsSync, writeFileSync, mkdirSync } from 'node:fs';
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

console.log(`\nFolder: ${SKILL_DIR}\n`);

for (const [path, label] of [[envExamplePath, '.env.example'], [envPath, '.env']]) {
    if (existsSync(path)) {
        console.log(`○ ${label} already exists — skipped`);
    } else {
        writeFileSync(path, ENV_CONTENT);
        console.log(`✓ Created ${label}`);
    }
}

console.log(`\nNext: edit ${envPath} and fill in GOMAN_API_KEY and GOMAN_APP_ID\n`);
