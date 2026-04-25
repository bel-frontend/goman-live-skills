# Extended Workflows — goman Translations

## Audit: Find Missing Translations

Use when you need to know which keys lack translations for some languages.

```
STEP 1: node goman-languages.js
        → store all active language codes

STEP 2: node goman-namespaces.js
        → list namespaces to audit (ask user to pick, or audit all)

STEP 3: For each namespace:
        node goman-search.js --namespace X --limit 100
        → repeat with --page N until all results fetched

STEP 4: For each key, check if all active language codes are present
        → collect keys missing one or more languages

STEP 5: Report:
        "Found X keys missing translations:
         - auth.login.button — missing: be
         - common.cancel    — missing: en, be"

STEP 6: Ask: "Should I fill the missing translations?"
        → if yes: node goman-create.js for missing languages only
```

---

## Rename / Move a Key

There is no rename operation — must delete and recreate.

```
STEP 1: node goman-get.js <oldKey>        → fetch existing translations
STEP 2: Show user the current values
STEP 3: Ask: "Confirm rename from 'X' to 'Y'? This will DELETE the old key."
STEP 4: node goman-create.js <newKey> <same-json> <same-context>
STEP 5: node goman-delete.js <oldKey>     → only after create succeeds
STEP 6: Show updated code snippet
```

---

## Bulk Import from JSON

When user provides a JSON object of `{ key: { lang: value } }`:

```
STEP 1: node goman-languages.js
STEP 2: Parse the JSON — validate fullKey format (must contain dot)
STEP 3: Show summary: "I will create X keys. Preview: ..."
STEP 4: Ask for confirmation
STEP 5: Loop node goman-create.js for each key
        → only use language codes from step 1
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

STEP 3: node goman-languages.js

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

STEP 6: node goman-create.js for each key — all active languages at once
        Progress: "Creating key X of Y..."

STEP 7: For each file, show replacement snippets:
        Before: <Text>Email</Text>
        After:  <Text>{t('LoginScreen.emailLabel')}</Text>
```

---

## Check Before Add (safe upsert)

Always check before creating to avoid accidental overwrites:

```
STEP 1: node goman-get.js <fullKey>
        → if exists: show current values, ask "Update?"
        → if missing: proceed to create

STEP 2: node goman-create.js <fullKey> <json> <context>
```
