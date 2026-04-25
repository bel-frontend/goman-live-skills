# Script Reference — goman.live

All scripts live in `<skill>/scripts/` (e.g. `.agents/skills/goman-translations/scripts/`).  
Requires Node.js 18+.

**Always `cd` into the `scripts/` folder before running**, otherwise `node goman-*.js` will fail with "Cannot find module":

```bash
cd .agents/skills/goman-translations/scripts
node goman-languages.js
```

Credentials are auto-loaded from `.env` in the parent skill folder — no need to export `GOMAN_API_KEY` / `GOMAN_APP_ID` manually.

---

## `goman-languages.js`

**Call this first** before any translation work.

```bash
node goman-languages.js
```

**Returns:** JSON array of active language objects with `langCode` and `langName`.  
Example: `[{"langCode":"en","langName":"English"},{"langCode":"be","langName":"Belarusian"}]`

---

## `goman-namespaces.js`

List all translation namespaces in the application.

```bash
node goman-namespaces.js
```

**Returns:** JSON array of namespace strings.  
Example: `["auth","common","screens.home","screens.login"]`

---

## `goman-get.js`

Check if a key exists and get its current translations.

```bash
node goman-get.js <fullKey>
```

| Argument | Required | Description |
|----------|----------|-------------|
| `fullKey` | Yes | Dotted key, e.g. `auth.login.button` |

**Returns:** All existing translations for this key, or empty if not found.

---

## `goman-search.js`

Search and list translations with filtering and pagination.

```bash
node goman-search.js [--namespace X] [--query Q] [--page N] [--limit N]
```

| Option | Default | Description |
|--------|---------|-------------|
| `--namespace` | — | Filter by namespace |
| `--query` | — | Search in keys or translation values |
| `--page` | 1 | Page number |
| `--limit` | 20 | Results per page (max 100) |

**Returns:** Paginated list of translation keys with values.

---

## `goman-create.js`

Add new translations or update existing ones.

```bash
node goman-create.js <fullKey> <translationsJSON> [context]
```

| Argument | Required | Description |
|----------|----------|-------------|
| `fullKey` | Yes | Dotted key, e.g. `auth.login.button` |
| `translationsJSON` | Yes | JSON object: `'{"en":"Log In","be":"Увайсці"}'` |
| `context` | Recommended | Where/how this text is used — helps translators |

**Behavior:** Creates if missing, overwrites if exists.  
⚠️ Only use language codes returned by `goman-languages.js`.

---

## `goman-delete.js`

⚠️ **DESTRUCTIVE — cannot be undone.**

Permanently removes all translations for a key across ALL languages.

```bash
node goman-delete.js <fullKey>
```

| Argument | Required | Description |
|----------|----------|-------------|
| `fullKey` | Yes | Dotted key, e.g. `auth.login.button` |

**Always** ask for explicit confirmation before running.  
**Always** run `goman-get.js` first to show the user what will be deleted.
