---
name: goman-translations
description: "Manage app translations with goman.live via MCP. Use when: adding translations, adding i18n keys, localizing components, checking translation keys exist, searching translations, updating language content, managing i18n strings, extract hardcoded strings, localize folder, audit missing translations."
argument-hint: "Describe the translation task (e.g., 'localize LoginScreen component', 'add key auth.login.button', 'check missing translations')"
---

# Goman Translations Skill

Translation management for multi-language apps via the goman.live MCP server.

## Prerequisites

MCP server must be connected. See [MCP Setup](./references/mcp-setup.md) if not configured.

## Available MCP Tools

| Tool | Purpose |
|------|---------|
| `get_active_languages` | List enabled language codes — **call this first** |
| `get_namespaces` | List all translation namespaces |
| `get_localization_exists` | Check if a key exists + get its current values |
| `search_localizations` | Search/list translations by namespace or query |
| `create_localization` | Add or update translations |
| `delete_localization` | ⚠️ PERMANENTLY remove translations |

Full tool reference: [tools.md](./references/tools.md)

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
STEP 1: get_active_languages         → get list of valid language codes
STEP 2: get_localization_exists      → check if key already exists
STEP 3: create_localization          → create/update with all active languages
```

### 2. Localize a Component

```
STEP 1: Receive component code from user
STEP 2: Find ALL hardcoded user-visible strings
        (labels, placeholders, titles, errors, tooltips — skip console.log, URLs, CSS)
STEP 3: get_active_languages
STEP 4: Plan keys: namespace = component name, key = descriptive name
        Show plan to user and ask: "Should I proceed?"
STEP 5: After confirmation → create_localization for each key (all languages)
STEP 6: Show replacement code snippets:
        Before: <button>Submit</button>
        After:  <button>{t("LoginForm.submitButton")}</button>
```

### 3. Search / Audit Translations

```
STEP 1: get_namespaces               → understand project structure
STEP 2: search_localizations         → filter by namespace or search query
STEP 3: get_active_languages         → compare found keys vs active languages
STEP 4: Report missing translations per key
```

### 4. Localize a Folder

```
STEP 1: List files in the folder (ask user if not provided)
STEP 2: For each file: find hardcoded strings
STEP 3: get_active_languages
STEP 4: Show full plan across all files, ask confirmation
STEP 5: Batch create_localization calls
STEP 6: Show replacement code for each file
```

## Safety Rules

1. **NEVER** call `delete_localization` without explicit user confirmation
2. **ALWAYS** call `get_active_languages` first — only use language codes it returns
3. **ALWAYS** show what will be affected before destructive actions
4. **ALWAYS** include `context` parameter in `create_localization` — it helps translators
5. Present results in readable format, never raw JSON

## Detailed Workflows

For complex scenarios, see [workflows.md](./references/workflows.md).
