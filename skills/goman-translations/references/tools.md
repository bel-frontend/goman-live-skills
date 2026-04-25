# MCP Tool Reference — goman.live

## `get_active_languages`

**Call this first** before any translation work.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `langCode` | string | No | Check if a specific language is active (e.g. `"en"`) |
| `detailed` | boolean | No | Return full metadata per language |

**Returns:** List of active language codes with names.  
Example: `"en (English), be (Belarusian)"`

---

## `get_namespaces`

List all translation namespaces in the application.

No parameters required.

**Returns:** Sorted list of namespace strings.  
Example: `["auth", "common", "screens.home", "screens.login"]`

---

## `get_localization_exists`

Check if a key exists and get its current translations.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fullKey` | string | Yes | Dotted key, e.g. `"auth.login.button"` |

**Returns:** All existing translations for this key, or empty if not found.

---

## `search_localizations`

Search and list translations with filtering and pagination.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `namespace` | string | — | Filter by namespace |
| `search` | string | — | Search in keys or translation values |
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Results per page (max 100) |

**Returns:** Paginated list of translation keys with values.

---

## `create_localization`

Add new translations or update existing ones.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fullKey` | string | Yes | Dotted key, e.g. `"auth.login.button"` |
| `translations` | object | Yes | `{ "en": "Log In", "be": "Увайсці" }` |
| `context` | string | Recommended | Where/how this text is used — helps translators |

**Behavior:** Creates if missing, overwrites if exists.  
⚠️ Only use language codes returned by `get_active_languages`.

---

## `delete_localization`

⚠️ **DESTRUCTIVE — cannot be undone.**

Permanently removes all translations for a key across ALL languages.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fullKey` | string | Yes | Dotted key, e.g. `"auth.login.button"` |

**Always** ask for explicit confirmation before calling.  
**Always** call `get_localization_exists` first to show the user what will be deleted.
