# Doc Brain Deployment Runbook

`rizom-ai/doc-brain` is the standalone canonical docs brain for
`docs.rizom.ai`.

## Ownership

- `rizom-ai/brains` owns source docs, `docs/docs-manifest.yaml`, and docs-content generation.
- `rizom-ai/doc-brain-content` owns generated `doc/*.md` content.
- `rizom-ai/doc-brain` owns app configuration, route composition, content sync, and deployment.

## Release configuration

- `brain.yaml` composes the canonical `core`, `site`, and `team` bundles.
- The app pins its `@rizom/brain` runtime exactly.
- `src/site.ts` supplies the complete app-local docs site package.
- `.github/workflows/publish-image.yml` publishes the standalone GHCR image.
- `.github/workflows/deploy.yml` deploys a successful image with Kamal.

The repository requires the `BWS_ACCESS_TOKEN` GitHub Actions secret. Runtime,
provisioning, registry, DNS, and TLS secrets are referenced from Bitwarden by
`.env.schema`.

## Content verification

1. Generate and sync docs from `rizom-ai/brains` to `rizom-ai/doc-brain-content`.
2. Start this app with `AI_API_KEY` and `GIT_SYNC_TOKEN` available.
3. Confirm directory sync imports the `doc/*.md` entities.
4. Trigger a preview site rebuild on the running app.
5. Verify `/`, `/docs`, `/docs/getting-started`, and `/docs/content-management`.

## Deployment verification

After each runtime or configuration update:

1. confirm the **Publish Image** workflow succeeds;
2. confirm the dependent **Deploy** workflow succeeds;
3. verify `https://docs.rizom.ai/health`;
4. verify the documentation routes and authenticated dashboard/MCP surfaces.

## Later design follow-up

Rizom ecosystem chrome remains separate from the docs finish line. Reintroduce
it from the shared Rizom site layer rather than from the `doc` entity package.
