# Repository Guidelines

## Project Structure & Module Organization

This repository publishes `@dnbhq/browserslist-config`, a small ESM package with two Browserslist entry points:

- `index.js` exports the default `baseline widely available` target.
- `full.js` exports `baseline widely available with downstream`.
- `README.md` documents installation, usage, supported browsers, and release notes.
- `package.json` defines package exports, published files, scripts, hooks, and release tooling.
- `biome.json` extends the shared `@dnbhq/biome-config` rules.

There is no separate `src/`, test fixture, or asset directory. Keep package contents minimal; only files listed in `package.json#files` are published.

## Build, Test, and Development Commands

- `npm run check` runs `biome check` across the repository.
- `npm run lint` runs Biome linting only.
- `npm run test` currently aliases `npm run check`; run it before release or handoff.
- `npm run release:dry` previews the `release-it` workflow.
- `npm run release` creates a release using `release-it` and conventional changelog tooling.

Use Node `>=25`, as declared in `package.json#engines`.

## Coding Style & Naming Conventions

Use modern ESM syntax and default exports for Browserslist query arrays. Keep entry point files short and readable, with comments only for useful external references. Follow the shared Biome configuration for formatting and linting; do not hand-format against it. File names for exported configurations should be lowercase and stable because consumers import them directly, for example `@dnbhq/browserslist-config/full`.

## Testing Guidelines

There is no dedicated unit test framework yet. Treat Biome as the current quality gate and run `npm run test` after editing JavaScript, JSON, or package metadata. When changing Browserslist queries, also verify examples in `README.md` stay accurate and that `package.json#exports` exposes any new entry point.

## Commit & Pull Request Guidelines

History uses Conventional Commits, for example `fix(ci): use node 26 in publish workflow` and `chore(release): v0.1.2`. Keep commits focused and use scopes when they clarify the affected area. Pull requests should describe the behavior change, mention any package export or release impact, link related issues, and include the validation command run, usually `npm run test`.

## Agent-Specific Instructions

Preserve unrelated local changes. If `CLAUDE.md` or other untracked files are present, do not stage or edit them unless the task explicitly asks for it.
