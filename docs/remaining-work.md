# Doc Brain Remaining Work

`rizom-ai/doc-brain` is the standalone Relay brain app for `docs.rizom.ai`.

## Ownership

- `rizom-ai/brains` owns source docs, `docs/docs-manifest.yaml`, `scripts/sync-docs-content.ts`, and the `doc` entity package.
- `rizom-ai/doc-brain-content` owns generated `brain-data` docs content under `doc/*.md`.
- `rizom-ai/doc-brain` owns app config, route composition, runtime sync, deploy workflow, and production secrets.

## Current status

- Repository exists and boots locally.
- `brain.yaml` uses Relay `preset: default` with `add: [docs]`.
- `src/site.ts` defines docs-only `/` and `/docs` routes.
- Runtime content is pulled from `rizom-ai/doc-brain-content`.
- Automatic production deployment is not considered ready yet.

## Remaining work

### 1. Keep deployment manual until ready

Disable or guard automatic deployment triggers until production secrets and DNS are intentionally configured.

Recommended interim state:

- keep image publishing on push if useful
- keep deploy as `workflow_dispatch` only
- do not deploy on every image publish yet

### 2. Configure repo secrets

When ready to deploy, configure the normal standalone brain deploy secrets in this repo:

- `AI_API_KEY`
- `MCP_AUTH_TOKEN`
- `HCLOUD_TOKEN`
- `HCLOUD_SSH_KEY_NAME`
- `HCLOUD_SERVER_TYPE`
- `HCLOUD_LOCATION`
- `KAMAL_SSH_PRIVATE_KEY`
- `KAMAL_REGISTRY_PASSWORD`
- `CF_API_TOKEN`
- `CF_ZONE_ID`
- `CERTIFICATE_PEM`
- `PRIVATE_KEY_PEM`

`GIT_SYNC_TOKEN` is not required while `rizom-ai/doc-brain-content` remains public/readable and the docs app does not write content at runtime.

### 3. Verify content sync contract

In `rizom-ai/brains`, releases should push generated docs to `rizom-ai/doc-brain-content` using `DOCS_CONTENT_SYNC_TOKEN`.

This repo should only consume that content through normal runtime directory sync.

### 4. Preview verification before production

Before enabling production deploy:

1. start the app with production-like secrets
2. let directory-sync pull `doc-brain-content`
3. trigger preview rebuild on the running app
4. inspect `dist/site-preview`
5. verify at least:
   - `/`
   - `/docs`
   - `/docs/getting-started`
   - `/docs/content-management`
6. only then enable/deploy production

### 5. Later design follow-up

Rizom ecosystem/chrome is intentionally out of scope for the current docs finish line. Reintroduce it from the Rizom site layer later, not from `entities/doc`.
