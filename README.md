# doc-brain

Standalone canonical team/docs brain for `docs.rizom.ai`.

## What it owns

- `brain.yaml` — canonical bundle and instance configuration
- `src/site.ts` — app-local docs route composition
- deploy workflow/secrets for the running docs app

Docs content is generated from `rizom-ai/brains` and synced into:

```text
rizom-ai/doc-brain-content
```

## Local start

```bash
bun install
bunx brain start
```

Required local secrets live in `.env` copied from `.env.example`.
At minimum, local docs sync needs `AI_API_KEY` and `GIT_SYNC_TOKEN`.
Set `DISCORD_BOT_TOKEN` when exercising Discord.

MCP HTTP uses the built-in Brain OAuth/passkey flow. Do not set
`MCP_AUTH_TOKEN` for the deployed docs app unless intentionally testing the
deprecated static-token fallback.

## Content

The app pulls markdown docs from `rizom-ai/doc-brain-content` via the
`directory-sync` plugin using `GIT_SYNC_TOKEN`. Runtime content lives in
`brain-data/` and is ignored.

## Deploy

Pushes to `main` publish the standalone image and then deploy it through the
standard Kamal workflow. Runtime and deployment secrets resolve from Bitwarden
through the repository's `BWS_ACCESS_TOKEN` secret.

See [`docs/remaining-work.md`](./docs/remaining-work.md).
