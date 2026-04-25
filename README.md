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
