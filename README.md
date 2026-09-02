# @davidsneighbour/browserslist-config

Shared Browserslist configuration for @davidsneighbour's projects.

* [Installation](#installation)
* [Usage](#usage)
* [Available configs](#available-configs)
  * [Default](#default)
  * [Full](#full)
* [Supported browsers](#supported-browsers)
  * [Widely available](#widely-available)
  * [Widely available with downstream](#widely-available-with-downstream)
* [Design notes](#design-notes)
* [Release](#release)
* [Notes](#notes)

## Installation

```bash
npm install --save-dev @dnbhq/browserslist-config
```

## Usage

Add as an extension in `.browserslistrc`:

```ini
extends @dnbhq/browserslist-config
```

Or in the `browserslist` field in `package.json`:

```json
{
  "browserslist": ["extends @dnbhq/browserslist-config"]
}
```

## Available configs

### Default

The default export targets `baseline widely available`, which is a good starting point for most projects.

```ini
extends @dnbhq/browserslist-config
```

### Full

An extended configuration that also targets browsers using a rendering engine from one of the widely available browsers.

```ini
extends @dnbhq/browserslist-config/full
```

## Supported browsers

### Widely available

The default configuration targets the following browsers:

| Browser | Version | Release date |
| ------- | ------- | ------------- |
| Chrome | 111 | 2023-03-13 |
| Chrome for Android | 111 | 2023-03-13 |
| Edge | 111 | 2023-03-13 |
| Firefox | 111 | 2023-03-27 |
| Firefox for Android | 111 | 2023-03-27 |
| Safari | 16.4 | 2023-03-27 |
| Safari for iOS | 16.4 | 2023-03-27 |

### Widely available with downstream

The `full` configuration includes the widely available browsers as well as the browsers listed below, which are not part of the main Baseline definition but are based on the engine from one of the core browsers above:

| Browser | Version | Engine | Version | Release date |
| ------- | ------- | ------ | ------- | ------------- |
| Opera | 97 | Blink | 111 | 2023-03-22 |
| Opera Android | 75 | Blink | 112 | 2023-05-17 |
| Samsung Internet | 22.0 | Blink | 111 | 2023-07-14 |
| WebView Android | 111 | Blink | 111 | 2023-03-01 |
| Yandex Browser Mobile | 23.5 | Blink | 112 | 2023-05-19 |
| UC Browser Mobile | 17.6 | Blink | 123 | 2025-05-15 |
| QQ Browser Mobile | 19.1 | Blink | 121 | 2025-07-08 |
| KaiOS | 4.0 | Gecko | 123 | 2025-05-01 |
| Facebook for Android | 420 | Blink | 114 | 2023-06-28 |
| Instagram for Android | 288 | Blink | 114 | unknown |

See the [Baseline supported browsers documentation](https://web-platform-dx.github.io/web-features/supported-browsers/) for more detail.

## Design notes

The configuration data was migrated from `packages/browserslist-config` in `davidsneighbour/configurations`.

Two entry points are published: the default export (`.`) is the conservative Baseline set, and `./full` adds downstream browsers built on the same engines. Consumers pick whichever matches their support policy rather than the package trying to guess it for them.

## Release

Dry run:

```bash
npm run release:dry
```

Release:

```bash
npm run release
```

Releases are handled by `release-it` and `@release-it/conventional-changelog`.

Commit messages should follow Conventional Commits.

Publishing is handled by the `Publish package` GitHub Actions workflow when a `v*` tag is pushed.

## Notes

- The consuming project does not need to install `browserslist` directly; it is a regular dependency of this package.
- The package includes only `index.js`, `full.js`, `README.md`, `CHANGELOG.md`, and `LICENSE` in the npm package.
- Use `npm run test` before releasing. The test command currently runs `biome check` against this repository.
