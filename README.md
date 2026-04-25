# goman-live-skills

AI agent skill for managing app translations with [goman.live](https://goman.live).  
Works with GitHub Copilot, Claude Code, Cursor, Windsurf, and [40+ other agents](https://github.com/vercel-labs/skills#supported-agents).

## Install

### 1. Copy the skill to your agent

```bash
npx skills add bel-frontend/goman-live-skills
```

The [`skills` CLI](https://github.com/vercel-labs/skills) copies the skill files into the correct directory for every agent detected on your machine (e.g. `.agents/skills/` for GitHub Copilot, `.claude/skills/` for Claude Code).

To install only for a specific agent:

```bash
npx skills add bel-frontend/goman-live-skills -a github-copilot
npx skills add bel-frontend/goman-live-skills -a claude-code
```

To install globally (all your projects):

```bash
npx skills add bel-frontend/goman-live-skills -g
```

### 2. Set up credentials

After copying, run this once in your project root:

```bash
npx github:bel-frontend/goman-live-skills
```

This creates `.env` and `.env.example`. Fill in your credentials:

```env
GOMAN_API_KEY=your_api_key_here
GOMAN_APP_ID=your_application_id_here
```

Get both values from the goman.live dashboard → **Settings → API Keys**.

## Usage

Once installed and `.env` is filled in, ask your agent:

- `localize my LoginScreen component`
- `add key auth.login.button with "Log In" in English`
- `check if screens.home.title exists`
- `audit missing translations in the auth namespace`
- `search all keys containing "button"`

## How it works

The skill includes Node.js scripts that call the goman.live API directly.  
The agent reads `.env` from your project root automatically — no manual `export` needed.

```
You → AI agent chat
         ↓  skill instructions (SKILL.md)
      runs scripts in ./scripts/
         ↓  REST API
      api.goman.live
         ↓
      Your translations
```

## Scripts

The agent runs these automatically. You can also run them manually:

| Script | What it does | Example |
|--------|-------------|---------|
| `goman-languages.js` | List active language codes | `node goman-languages.js` |
| `goman-namespaces.js` | List translation namespaces | `node goman-namespaces.js` |
| `goman-get.js <fullKey>` | Get translations for a key | `node goman-get.js auth.login.button` |
| `goman-search.js [opts]` | Search/filter translations | `node goman-search.js --namespace auth --query button` |
| `goman-create.js <fullKey> <json> [ctx]` | Add or update translations | `node goman-create.js auth.login.button '{"en":"Log in"}' "Login button"` |
| `goman-delete.js <fullKey>` | ⚠️ Delete a key permanently | `node goman-delete.js auth.login.button` |

## Skill File Structure

```
skills/goman-translations/
├── SKILL.md          ← loaded by the agent on-demand
├── scripts/          ← Node.js scripts called by the agent
└── references/
    ├── tools.md      ← script reference with all parameters
    └── workflows.md  ← extended workflow scenarios
```

## License

MIT
