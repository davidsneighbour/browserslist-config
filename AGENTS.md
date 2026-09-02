# Repository guidelines

This is the canonical source of truth for AI agent behaviour in this repository. It applies equally to all agents (Claude, Codex, and others). Agent-specific files (for example `CLAUDE.md`) contain only deltas from what's written here.

Read the referenced files under `.agents/instructions/` when the section says to — they carry the same authority as this file.

## What this is

`@dnbhq/browserslist-config` is a tiny, published npm package: a shared Browserslist configuration for @davidsneighbour's projects. There is no build step and no runtime logic — the entire package surface is two one-line config files.

- `index.js` — default export, targets `baseline widely available` (the conservative Baseline browser set).
- `full.js` — export at `./full`, targets `baseline widely available with downstream` (adds browsers built on the same engines, e.g. Opera, Samsung Internet, WebView Android).

Both are consumed by other projects via `.browserslistrc` (`extends @dnbhq/browserslist-config` or `.../full`) or the `browserslist` field in `package.json`.

Only `index.js`, `full.js`, `README.md`, `CHANGELOG.md`, and `LICENSE` are published (see `files` in `package.json`) — changes elsewhere in the repo don't affect the published package.

There is no separate `src/`, test fixture, or asset directory. Keep package contents minimal.

## Commands

```bash
npm run check         # biome check (lint + format check)
npm run lint          # biome lint only
npm run test          # alias for `npm run check` — this is the full test suite
npm run release:dry   # dry-run a release-it release
npm run release       # cut a release (see Release process below)
```

There is no separate test framework; `npm test` running `biome check` *is* the CI-equivalent local check. Run it before release or handoff.

## Architecture notes

- Package is ESM-only (`"type": "module"`), targets Node `>=25` (see `package.json#engines`).
- Biome config extends `@dnbhq/biome-config`; don't add a local rule set, extend it instead.
- `tsconfig.json` extends `@dnbhq/tsconfig/strict` and only covers `.release-it.ts` — there's no other TypeScript source in this repo, TS is used purely for the typed `release-it` config.
- `simple-git-hooks` + `lint-staged` run `biome check --write` on staged `*.{js,json,ts}` at pre-commit.

## Coding style & naming conventions

Use modern ESM syntax and default exports for Browserslist query arrays. Keep entry point files short and readable, with comments only for useful external references. Follow the shared Biome configuration for formatting and linting; do not hand-format against it. File names for exported configurations must be lowercase and stable because consumers import them directly, for example `@dnbhq/browserslist-config/full`.

## Testing guidelines

Treat Biome as the current quality gate and run `npm run test` after editing JavaScript, JSON, or package metadata. When changing Browserslist queries, also verify examples in `README.md` stay accurate and that `package.json#exports` exposes any new entry point.

## Documentation conventions

The browser version tables in `README.md` (Widely available / Widely available with downstream) are the source of truth for what `index.js`/`full.js` target conceptually, but the actual Browserslist query strings (`'baseline widely available'`, `'baseline widely available with downstream'`) are resolved dynamically by the `browserslist` package at consumer install/build time — the tables are documentation, not something to hand-sync with a browser list. If the underlying Baseline definition changes, update the tables in `README.md` to match, not the query strings.

## Commit & pull request guidelines

History uses Conventional Commits, for example `fix(ci): use node 26 in publish workflow` and `chore(release): v0.1.2`. Keep commits focused and use scopes when they clarify the affected area. Pull requests should describe the behaviour change, mention any package export or release impact, link related issues, and include the validation command run, usually `npm run test`.

## Release process

Follow `.agents/instructions/repository/release.md` for the full release-it and npm publish workflow, including version bump rules and CI publish behaviour.

## Agent-specific instructions

Preserve unrelated local changes. If untracked files are present, do not stage or edit them unless the task explicitly asks for it.
