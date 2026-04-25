# Extended Workflows — goman Translations

## Audit: Find Missing Translations

Use when you need to know which keys lack translations for some languages.

```
STEP 1: get_active_languages
        → store all active language codes

STEP 2: get_namespaces
        → list namespaces to audit (ask user to pick, or audit all)

STEP 3: For each namespace:
        search_localizations(namespace=..., limit=100)
        → repeat with page++ until all results fetched

STEP 4: For each key, check if all active language codes are present
        → collect keys missing one or more languages

STEP 5: Report:
        "Found X keys missing translations:
         - auth.login.button — missing: be
         - common.cancel    — missing: en, be"

STEP 6: Ask: "Should I fill the missing translations?"
        → if yes: create_localization for missing languages only
```

---

## Rename / Move a Key

MCP has no rename tool — must delete and recreate.

```
STEP 1: get_localization_exists(oldKey)   → fetch existing translations
STEP 2: Show user the current values
STEP 3: Ask: "Confirm rename from 'X' to 'Y'? This will DELETE the old key."
STEP 4: create_localization(newKey, same translations, same context)
STEP 5: delete_localization(oldKey)       → only after create succeeds
STEP 6: Show updated code snippet
```

---

## Bulk Import from JSON

When user provides a JSON object of `{ key: { lang: value } }`:

```
STEP 1: get_active_languages
STEP 2: Parse the JSON — validate fullKey format (must contain dot)
STEP 3: Show summary: "I will create X keys. Preview: ..."
STEP 4: Ask for confirmation
STEP 5: Loop create_localization for each key
        → only use language codes from get_active_languages
STEP 6: Report created / skipped / errors
```

---

## Localize a Folder (multi-file)

```
STEP 1: User provides folder path or file list
        → if not provided, ask: "Which folder/files should I localize?"

STEP 2: For each file:
        - Read file content
        - Find ALL hardcoded user-visible strings
          (labels, placeholders, titles, errors, tooltips, alt text)
        - SKIP: console.log, comments, variable names, URLs, CSS classes

STEP 3: get_active_languages

STEP 4: Generate key plan across all files:
        - Use file name (without extension) as namespace prefix
        - Use descriptive key names
        - Show full plan:
          "File LoginScreen.tsx:
           1. 'Email' → LoginScreen.emailLabel
           2. 'Password' → LoginScreen.passwordLabel
           ...
           File HomeScreen.tsx:
           1. 'Welcome' → HomeScreen.welcomeTitle"

STEP 5: Ask: "Should I proceed with all X keys?"

STEP 6: Batch create_localization — one call per key, all active languages
        Progress: "Creating key X of Y..."

STEP 7: For each file, show replacement snippets:
        Before: <Text>Email</Text>
        After:  <Text>{t('LoginScreen.emailLabel')}</Text>
```

---

## Check Before Add (safe upsert)

Always check before creating to avoid accidental overwrites:

```
STEP 1: get_localization_exists(fullKey)
        → if exists: show current values, ask "Update?" 
        → if missing: proceed to create

STEP 2: create_localization(fullKey, translations, context)
```
