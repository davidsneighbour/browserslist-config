# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@davidsneighbour/browserslist-config` is a tiny, published npm package: a shared Browserslist configuration for @davidsneighbour's projects. There is no build step and no runtime logic — the entire package surface is two one-line config files.

- `index.js` — default export, targets `baseline widely available` (the conservative Baseline browser set).
- `full.js` — export at `./full`, targets `baseline widely available with downstream` (adds browsers built on the same engines, e.g. Opera, Samsung Internet, WebView Android).

Both are consumed by other projects via `.browserslistrc` (`extends @davidsneighbour/browserslist-config` or `.../full`) or the `browserslist` field in `package.json`.

Only `index.js`, `full.js`, `README.md`, `CHANGELOG.md`, and `LICENSE` are published (see `files` in `package.json`) — changes elsewhere in the repo don't affect the published package.

## Commands

```bash
npm run check         # biome check (lint + format check)
npm run lint          # biome lint only
npm run test          # alias for `npm run check` — this is the full test suite
npm run release:dry   # dry-run a release-it release
npm run release       # cut a release (see Release process below)
```

There is no separate test framework; `npm test` running `biome check` *is* the CI-equivalent local check.

## Architecture notes

- Package is ESM-only (`"type": "module"`), targets Node >=25.
- Biome config extends `@dnbhq/biome-config`; don't add a local rule set, extend it instead.
- `tsconfig.json` extends `@dnbhq/tsconfig/strict` and only covers `.release-it.ts` — there's no other TypeScript source in this repo, TS is used purely for the typed `release-it` config.
- `simple-git-hooks` + `lint-staged` run `biome check --write` on staged `*.{js,json,ts}` at pre-commit.

## Release process

Releases are driven by `release-it` (`.release-it.ts`) via the shared `@dnbhq/release-config` factory (`createReleaseConfig(...)`), using Conventional Commits:

- `git.requireBranch: 'main'` (passed through `overrides.git`) and `requireCleanWorkingDir: true` (a shared default) — releases must happen from a clean `main`.
- Version bump comes from `@release-it/conventional-changelog`'s `conventionalcommits` preset: any commit with breaking-change notes → major; `feat` → minor; any other configured type (`fix`/`build`/`chore`/`ci`/`docs`/`perf`/`refactor`/`revert`/`style`/`test`, listed via `scopes.patchTypes`) → patch. Commit types outside these lists don't trigger a release.
- GitHub releases authenticate with the shared default token env var `GITHUB_TOKEN_CONTENT_PRIVATE` (`githubTokenRef`, not overridden here) — not the GitHub Actions default `GITHUB_TOKEN`.
- `release-it` commits (`chore(release): v<version>`, with `--no-verify`), tags `v<version>`, and pushes with `--follow-tags`. It does **not** publish to npm itself (`npm.publish: false`, a shared default).
- Publishing to npm happens via the separate `.github/workflows/publish.yml` GitHub Actions workflow, triggered only by pushing a `v*` tag. That workflow verifies the tag matches `package.json`'s version, runs `npm test`, then `npm publish` (with provenance).

So: `npm run release` locally (or `release:dry` first) creates and pushes the tag; CI does the actual npm publish. Only pass options to `createReleaseConfig(...)` that this repo actually needs (`scopes` and `overrides.git.requireBranch` today) — everything else comes from the shared package's defaults; check `@dnbhq/release-config`'s README before changing shape.

## When updating supported browsers

The browser version tables in `README.md` (Widely available / Widely available with downstream) are the source of truth for what `index.js`/`full.js` target conceptually, but the actual Browserslist query strings (`'baseline widely available'`, `'baseline widely available with downstream'`) are resolved dynamically by the `browserslist` package at consumer install/build time — the tables are documentation, not something to hand-sync with a browser list. If the underlying Baseline definition changes, update the tables in `README.md` to match, not the query strings.
