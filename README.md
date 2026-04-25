# goman-live-skills

AI agent skill for managing app translations with [goman.live](https://goman.live).  
Works with GitHub Copilot, Claude Code, Cursor, Windsurf, and [40+ other agents](https://github.com/vercel-labs/skills#supported-agents).

## Install

### 1. Install the skill

```bash
npx skills add bel-frontend/goman-live-skills
```

The [`skills` CLI](https://github.com/vercel-labs/skills) clones the skill from GitHub and installs it into the correct directory for every agent it detects on your machine (e.g. `.agents/skills/` for GitHub Copilot, `.claude/skills/` for Claude Code, etc.).

To install only for a specific agent:

```bash
npx skills add bel-frontend/goman-live-skills -a github-copilot
npx skills add bel-frontend/goman-live-skills -a claude-code
```

To install globally (all your projects):

```bash
npx skills add bel-frontend/goman-live-skills -g
```

### 2. Set up MCP config

```bash
npx goman-live-skills --mcp
```

Creates or updates `.vscode/mcp.json` with the goman.live MCP connection.

## What it does

The skill teaches your AI agent how to manage translations via the goman.live MCP server.

Once installed, you can ask your agent:

- `localize my LoginScreen component`
- `add key auth.login.button with "Log In" in English`
- `check if screens.home.title exists`
- `audit missing translations in the auth namespace`
- `search all keys containing "button"`

## How it works

```
You → AI agent chat
         ↓  skill instructions
      goman-translations SKILL.md
         ↓  MCP tools
      mcp.goman.live (hosted)
         ↓  REST API
      api.goman.live
         ↓
      Your translations
```

## MCP Setup

Connect to the hosted MCP server at `https://mcp.goman.live/mcp` — no local server needed.

### `.vscode/mcp.json` (VS Code / GitHub Copilot)

Run `npx goman-live-skills --mcp` or add manually:

```json
{
    "servers": {
        "goman-mcp": {
            "type": "streamable-http",
            "url": "https://mcp.goman.live/mcp",
            "headers": {
                "apiKey": "${input:goManApiKey}",
                "applicationid": "${input:goManAppId}"
            }
        }
    },
    "inputs": [
        { "id": "goManApiKey",  "type": "promptString", "description": "goman.live API Key", "password": true },
        { "id": "goManAppId",   "type": "promptString", "description": "goman.live Application ID" }
    ]
}
```

Get your API key and Application ID from the goman.live dashboard → **Settings → API Keys**.

## Scripts (no MCP required)

If you prefer not to use MCP, the skill includes Node.js scripts that call the API directly.  
Requires Node.js 18+. No extra dependencies.

### 1. Create `.env` in your project root

```env
GOMAN_API_KEY=your_api_key_here
GOMAN_APP_ID=your_application_id_here
```

Get both values from the goman.live dashboard → **Settings → API Keys**.

A template is also available in `.env.example` in this repository.

### 2. Load env and run a script

```bash
# load .env and run
export $(cat .env | xargs) && node skills/goman-translations/scripts/goman-languages.js

# or with dotenv-cli
npx dotenv -e .env -- node skills/goman-translations/scripts/goman-languages.js
```

Or set the variables inline for a quick test:

```bash
GOMAN_API_KEY=xxx GOMAN_APP_ID=yyy node skills/goman-translations/scripts/goman-get.js auth.login.button
```

### Available scripts

| Script | What it does | Example |
|--------|-------------|---------|
| `goman-languages.js` | List active language codes | `node goman-languages.js` |
| `goman-namespaces.js` | List translation namespaces | `node goman-namespaces.js` |
| `goman-get.js <fullKey>` | Get translations for a key | `node goman-get.js auth.login.button` |
| `goman-search.js [opts]` | Search/filter translations | `node goman-search.js --namespace auth --query button` |
| `goman-create.js <fullKey> <json> [ctx]` | Add or update translations | `node goman-create.js auth.login.button '{"en":"Log in"}' "Login button"` |
| `goman-delete.js <fullKey>` | ⚠️ Delete a key permanently | `node goman-delete.js auth.login.button` |

The AI agent will use these scripts automatically when the MCP server is not connected.

## Available MCP Tools

| Tool | Description |
|------|-------------|
| `get_active_languages` | List enabled language codes |
| `get_namespaces` | List all translation namespaces |
| `get_localization_exists` | Check if a key exists + get current values |
| `search_localizations` | Search translations by namespace or query |
| `create_localization` | Add or update translations |
| `delete_localization` | ⚠️ Permanently remove translations |

## Skill File Structure

```
skills/goman-translations/
├── SKILL.md                    ← loaded by the agent on-demand
└── references/
    ├── tools.md                ← detailed tool reference
    ├── workflows.md            ← extended workflow scenarios
    └── mcp-setup.md            ← MCP connection guide
```

## License

MIT
