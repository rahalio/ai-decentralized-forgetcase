---
name: forgetcase-codegen-local
description: >-
  Forgetcase local codegen bootstrap: .codegen is never committed; sync from
  zero-apps-codegen-scaffold before running zero-codegen. Use when setting up
  the repo, running pnpm codegen:*, or when .codegen is missing.
---

# Forgetcase — local `.codegen` only

## Hard rule

**Never commit or push `.codegen/`.** It is listed in `.gitignore`.

## Sync

```bash
rsync -a --delete \
  --exclude '__pycache__' --exclude '*.pyc' \
  /Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold/.codegen/ \
  ./.codegen/
pnpm codegen:paths
```

Confirm `package_scope` is `@forgetcase` in `.codegen/zero-codegen.json` and `.codegen/.zero-codegen-merged.json`. Re-enable `layers.webapp.services` / `features` if a fresh sync resets them.

## Commands

```bash
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:core          # Mode B default after YAML edits
# Mode A (new domain): generate without --layers core only
PYTHONPATH=.codegen/codegen/src python3 -m zero_codegen.cli.main generate \
  --domain <name> --config .codegen/.zero-codegen-merged.json --skip-build
```
