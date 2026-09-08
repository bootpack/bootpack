# September 2026 issue review

Reviewed all ten open feature issues on 2026-09-08 against the v1 implementation
and the owner's requested follow-up. This is not a new tagged release.

| Issue | Decision and evidence |
|---|---|
| [#185](https://github.com/bootpack/bootpack/issues/185) gh-pages automation | Superseded: the official site now deploys through Cloudflare Pages Git integration. Keep the old demo historical rather than introduce a second production publishing path. |
| [#128](https://github.com/bootpack/bootpack/issues/128) Elements catalog | Retain: the new Elements page covers shipped typography, alerts, collapse, form controls and utilities. The original request for all Bootstrap components is broader; additional plugins need explicit imports, keyboard tests and bundle review. |
| [#127](https://github.com/bootpack/bootpack/issues/127) Bootstrap 4 experiments | Obsolete as written: do not import the old experimental collection wholesale. New examples use supported Bootstrap 5 and native browser behavior. |
| [#126](https://github.com/bootpack/bootpack/issues/126) Navbar layouts | Resolved in v1: light/dark navbar examples, responsive collapse, dropdown and keyboard coverage exist. More specific navigation requests can be proposed separately. |
| [#125](https://github.com/bootpack/bootpack/issues/125) Custom layouts | Superseded by the current album, pricing and contact layouts, alongside the existing starter, grid and callout. No wholesale Bootstrap 4 template copy is planned. |
| [#124](https://github.com/bootpack/bootpack/issues/124) Version output | Implemented: webpack's compiler name and browser console use package.json version, with browser assertions. |
| [#89](https://github.com/bootpack/bootpack/issues/89) Per-page CSS | Retain: still useful. Define an opt-in page/entry mapping, preserve the simple shared default, and test exact chunk injection, nested URLs, shared ordering and development rebuilds. MiniCssExtractPlugin need not be replaced. |
| [#78](https://github.com/bootpack/bootpack/issues/78) Nested favicon | Resolved in v1 by HtmlWebpackPlugin's relative injection. Browser tests request the favicon at both root and /bootpack/ hosting paths. |
| [#61](https://github.com/bootpack/bootpack/issues/61) Unused CSS | Retain: automatic pruning remains unsafe without fixtures for dynamic classes and user content. Selected Sass imports already reduce size. Any opt-in pruning must preserve show/collapse/dropdown states, responsive utilities and future plugins. No deprecated uncss/purifycss dependency was added. |
| [#49](https://github.com/bootpack/bootpack/issues/49) Icon build flags | Not planned: implicit dependency installation and multiple icon build modes complicate a small starter. Keep the library choice explicit; [Examples](examples.md) documents optional SVG assets. |

## Dependency and security review

- `npm outdated --json` returned no outdated npm packages.
- `npm audit --json` reported zero vulnerabilities across production and development
  dependencies. GitHub's authenticated open Dependabot alert list was also empty.
- Updated checkout to v7.0.1 and setup-node to v7.0.0, pinned to upstream commit
  SHAs. upload-artifact was already pinned to current v7.0.1. These address the
  two outstanding bot PRs without adding an automatic update service.
- Removed `.github/dependabot.yml`. GitHub automatic security-update PRs were
  already disabled; retain vulnerability alerts and the CI audit check.
- Review npm and GitHub Actions updates manually each month and before releases.
  Use clean installs, lint, unit/build/browser checks and dependency audit before
  deployment. Do not use `npm audit fix --force` as a substitute for review.

The source and production branch is now `main`, with `develop` for integration.
No new release tag or npm publication was requested. Full Elements coverage,
per-page entries and opt-in CSS pruning remain follow-ups rather than implied
features of this update.