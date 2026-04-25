# MCP Setup — goman.live

## How the MCP server works

The goman.live MCP server is a bridge between AI agents and the goman.live translation API.

```
AI Agent (Copilot / Claude)
        ↓  MCP tools
   mcp.goman.live (hosted)
        ↓  REST API
   api.goman.live
        ↓
   Your translations database
```

## Quick Setup

No local server needed — connect directly to the hosted MCP endpoint.

---

## VS Code — `.vscode/mcp.json`

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
        {
            "id": "goManApiKey",
            "type": "promptString",
            "description": "goman.live API Key",
            "password": true
        },
        {
            "id": "goManAppId",
            "type": "promptString",
            "description": "goman.live Application ID"
        }
    ]
}
```

---

## Claude Desktop — `claude_desktop_config.json`

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
    "mcpServers": {
        "goman-mcp": {
            "url": "https://mcp.goman.live/mcp",
            "headers": {
                "apiKey": "YOUR_API_KEY",
                "applicationid": "YOUR_APP_ID"
            }
        }
    }
}
```

Restart Claude Desktop after saving.

---

## Where to get API Key and Application ID

1. Log in at [goman.live](https://goman.live)
2. Go to your application → **Settings → API Keys**
3. Copy the API key and Application ID
