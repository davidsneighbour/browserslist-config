# Release process

Applies when cutting a release, changing `.release-it.ts`, or touching `.github/workflows/publish.yml`.

Releases are driven by `release-it` (`.release-it.ts`) via the shared `@dnbhq/release-config` factory (`createReleaseConfig(...)`), using Conventional Commits.

## Version bump rules

`release-it` uses `@release-it/conventional-changelog`'s `conventionalcommits` preset:

- A commit with breaking-change notes → major.
- `feat` → minor.
- Any other configured type (`fix`, `build`, `chore`, `ci`, `docs`, `perf`, `refactor`, `revert`, `style`, `test`) → patch.
- Commit types outside these lists don't trigger a release.

## Local release step

- `git.requireBranch: 'main'` (passed via `overrides.git` in `.release-it.ts`) and `requireCleanWorkingDir: true` (a shared default from `@dnbhq/release-config`) — releases must happen from a clean `main`.
- GitHub releases authenticate with the shared default token env var `GITHUB_TOKEN_CONTENT_PRIVATE` (`githubTokenRef`, not overridden in this repo) — not the GitHub Actions default `GITHUB_TOKEN`.
- `release-it` commits (`chore(release): v<version>`, with `--no-verify`), tags `v<version>`, and pushes with `--follow-tags`.
- `release-it` does **not** publish to npm itself (`npm.publish: false`, a shared default).

Only pass options to `createReleaseConfig(...)` that this repo actually needs — today that is just `overrides.git.requireBranch`. Everything else comes from the shared package's defaults; check `@dnbhq/release-config`'s README before changing this shape.

## CI publish step

Publishing to npm happens via the separate `.github/workflows/publish.yml` GitHub Actions workflow, triggered only by pushing a `v*` tag. That workflow:

1. Checks out the tagged ref.
2. Verifies the tag matches `package.json`'s version (fails the run otherwise).
3. Runs `npm test`.
4. Runs `npm publish` (provenance is enabled via `publishConfig.provenance: true` in `package.json`).

So: `npm run release` locally (or `release:dry` first) creates and pushes the tag; CI does the actual npm publish.
