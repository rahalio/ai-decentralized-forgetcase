# Forgetcase

Article 17 right-to-erasure case desk — OpenAPI-first DDD monorepo based on the zero-apps codegen scaffold.

Product specs: [PRODUCT.md](./PRODUCT.md) · [USER_STORIES.md](./USER_STORIES.md) · [WEBAPP.md](./WEBAPP.md)

Package scope: **`@forgetcase/*`**

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp  ← generated API clients + feature skeletons, then product UI
```

## Bootstrap `.codegen` (required, never committed)

`.codegen/` is **gitignored** and must not be pushed to GitHub. Sync it locally from the scaffold before any codegen:

```bash
rsync -a --delete \
  --exclude '__pycache__' --exclude '*.pyc' \
  /Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold/.codegen/ \
  ./.codegen/
# Re-apply package_scope after sync if needed: @forgetcase
pnpm codegen:paths
```

## Quick start

```bash
pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: forgetcase_demo_local_dev_key

# Web app (separate terminal)
pnpm dev:web
# http://127.0.0.1:5173
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=forgetcase-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

## Codegen rules

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.
4. **Never commit or push `.codegen/`.**

See `.cursor/skills/` and `docs/CODEGEN.md`.

## Domains

| Domain | OpenAPI | Purpose |
|--------|---------|---------|
| identity | `identity.yaml` | API keys, users, auth stubs (scaffold) |
| cases | `cases.yaml` | Erasure cases, intake, audit export |
| assessments | `assessments.yaml` | Grounds, exemptions, child-weight |
| sla | `sla.yaml` | Calendar-month clock, ID pause |
| fulfilment | `fulfilment.yaml` | Live erase, backup beyond-use, recipient notices |
| correspondence | `correspondence.yaml` | Completion / refusal letters |
