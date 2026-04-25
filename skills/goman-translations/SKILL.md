---
name: goman-translations
description: "Manage app translations with goman.live. Use when: adding translations, adding i18n keys, localizing components, checking translation keys exist, searching translations, updating language content, managing i18n strings, extract hardcoded strings, localize folder, audit missing translations."
argument-hint: "Describe the translation task (e.g., 'localize LoginScreen component', 'add key auth.login.button', 'check missing translations')"
---

# Goman Translations Skill

Translation management for multi-language apps via the goman.live API.

## How to Call the API

Two options — use whichever is available:

### Option A: MCP Server (preferred when connected)

MCP server must be connected. See [MCP Setup](./references/mcp-setup.md) to configure.

### Option B: Scripts (Node.js, no MCP needed)

Scripts are in `./scripts/`. Run with Node.js 18+. No dependencies required.

Set credentials once per session:
```
export GOMAN_API_KEY=<your-api-key>
export GOMAN_APP_ID=<your-application-id>
```

| Script | Purpose | Example |
|--------|---------|---------|
| `goman-languages.js` | List active language codes | `node goman-languages.js` |
| `goman-namespaces.js` | List translation namespaces | `node goman-namespaces.js` |
| `goman-get.js` | Get translations for a key | `node goman-get.js auth.login.button` |
| `goman-search.js` | Search/filter translations | `node goman-search.js --namespace auth.login --query button` |
| `goman-create.js` | Add or update translations | `node goman-create.js auth.login.button '{"en":"Log in","be":"Увайсці"}' "Login button"` |
| `goman-delete.js` | ⚠️ Delete a key permanently | `node goman-delete.js auth.login.button` |

When using scripts, parse JSON output with `JSON.parse()` to work with the data.

## Available Operations

| Operation | MCP Tool | Script |
|-----------|---------|--------|
| List active languages — **call first** | `get_active_languages` | `node goman-languages.js` |
| List namespaces | `get_namespaces` | `node goman-namespaces.js` |
| Get / check a key | `get_localization_exists` | `node goman-get.js <fullKey>` |
| Search translations | `search_localizations` | `node goman-search.js [--namespace X] [--query Q]` |
| Add / update translations | `create_localization` | `node goman-create.js <fullKey> <json> [context]` |
| ⚠️ Delete a key | `delete_localization` | `node goman-delete.js <fullKey>` |

Full MCP tool reference: [tools.md](./references/tools.md)

## Key Format

```
namespace.key
```

- Namespace = everything **before** the last dot
- Key = everything **after** the last dot
- Example: `"screens.login.submitButton"` → namespace `"screens.login"`, key `"submitButton"`

⚠️ Every `fullKey` must contain at least one dot.

## Workflows

### 1. Add a Single Translation Key

```
STEP 1: get_active_languages / node goman-languages.js    → get valid language codes
STEP 2: get_localization_exists / node goman-get.js       → check if key already exists
STEP 3: create_localization / node goman-create.js        → create/update with all active languages
```

### 2. Localize a Component

```
STEP 1: Receive component code from user
STEP 2: Find ALL hardcoded user-visible strings
        (labels, placeholders, titles, errors, tooltips — skip console.log, URLs, CSS)
STEP 3: node goman-languages.js (or get_active_languages)
STEP 4: Plan keys: namespace = component name, key = descriptive name
        Show plan to user and ask: "Should I proceed?"
STEP 5: After confirmation → create translations for each key (all languages)
STEP 6: Show replacement code snippets:
        Before: <button>Submit</button>
        After:  <button>{t("LoginForm.submitButton")}</button>
```

### 3. Search / Audit Translations

```
STEP 1: node goman-namespaces.js      → understand project structure
STEP 2: node goman-search.js          → filter by namespace or search query
STEP 3: node goman-languages.js       → compare found keys vs active languages
STEP 4: Report missing translations per key
```

### 4. Localize a Folder

```
STEP 1: List files in the folder (ask user if not provided)
STEP 2: For each file: find hardcoded strings
STEP 3: node goman-languages.js
STEP 4: Show full plan across all files, ask confirmation
STEP 5: Batch create translation calls
STEP 6: Show replacement code for each file
```

## Safety Rules

1. **NEVER** delete a translation without explicit user confirmation
2. **ALWAYS** get active languages first — only use language codes from the response
3. **ALWAYS** show what will be affected before destructive actions
4. **ALWAYS** include `context` when creating translations — it helps translators
5. Present results in readable format, never raw JSON

## Detailed Workflows

For complex scenarios, see [workflows.md](./references/workflows.md).
