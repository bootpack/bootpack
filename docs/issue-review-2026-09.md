# September 2026 issue review

Reviewed all ten open feature issues on 2026-09-08 against the v1 implementation
and the owner's requested follow-up. This is not a new tagged release.

| Issue | Decision and evidence |
|---|---|
| [#185](https://github.com/bootpack/bootpack/issues/185) gh-pages automation | Superseded: the official site now deploys through Cloudflare Pages Git integration. Keep the old demo historical rather than introduce a second production publishing path. |
| [#128](https://github.com/bootpack/bootpack/issues/128) Elements catalog | Implemented in the second follow-up: every Bootstrap 5 component family, representative content/forms/utilities and working interactions are now organized on Elements. Extra imports are page-only; keyboard, focus, responsive and root/subpath tests cover the plugins. See [coverage](examples.md#elements-coverage). |
| [#127](https://github.com/bootpack/bootpack/issues/127) Bootstrap 4 experiments | Obsolete as written: do not import the old experimental collection wholesale. New examples use supported Bootstrap 5 and native browser behavior. |
| [#126](https://github.com/bootpack/bootpack/issues/126) Navbar layouts | Resolved in v1: light/dark navbar examples, responsive collapse, dropdown and keyboard coverage exist. More specific navigation requests can be proposed separately. |
| [#125](https://github.com/bootpack/bootpack/issues/125) Custom layouts | Superseded by the current album, pricing and contact layouts, alongside the existing starter, grid and callout. No wholesale Bootstrap 4 template copy is planned. |
| [#124](https://github.com/bootpack/bootpack/issues/124) Version output | Implemented: webpack's compiler name and browser console use package.json version, with browser assertions. |
| [#89](https://github.com/bootpack/bootpack/issues/89) Per-page CSS | Implemented: optional `page-entries.js` maps HTML pages to CSS/Sass/JS entries, preserving the shared default and MiniCssExtractPlugin. Album demonstrates CSS-only input; Elements demonstrates JS with Sass. Tests cover validation, ordering, isolation, nested URLs and watch rebuilds. See [guide](page-entries.md). |
| [#78](https://github.com/bootpack/bootpack/issues/78) Nested favicon | Resolved in v1 by HtmlWebpackPlugin's relative injection. Browser tests request the favicon at both root and /bootpack/ hosting paths. |
| [#61](https://github.com/bootpack/bootpack/issues/61) Unused CSS | Close as not planned for automatic pruning: measured the current output and isolated Album/Elements CSS instead. Reusable utilities and dynamic plugin states are intentionally retained, not classified as dead merely because one page does not use them. No deprecated uncss/purifycss dependency was added. See the measured decision below. |
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

The source and production branch is `main`, with `develop` for integration.
The owner approved implementing the two retained features, resolving the CSS review,
and deploying after validation on 2026-09-08. No new release tag or npm publication
was requested; the original v1.0.0 tag remains unchanged.

## CSS pruning decision

`npm run build && npm run report:css` measured these production stylesheet sizes
on 2026-09-08. Compression numbers are local gzip/Brotli estimates, not claims about
a particular hosting response's negotiated compression:

| Stylesheet | Minified bytes | Gzip bytes | Brotli bytes | Loaded by |
|---|---:|---:|---:|---|
| Shared | 157,245 | 22,170 | 15,766 | All ordinary pages |
| Album | 465 | 273 | 196 | Album only |
| Elements | 65,553 | 9,183 | 7,877 | Elements only |

There was a small, safe cleanup: move Album's styles out of the shared bundle.
The new catalog's 65.6 KB of minified component CSS is also kept out of other pages.
Shared Sass already selects component imports rather than importing all Bootstrap.

This does not mean every shared selector matches current example markup. Bootstrap
utilities intentionally support downstream customization, breakpoints, themes and
states. Plugins create classes such as `show`, `collapsing`, backdrop and placement
classes at runtime. Removing selectors based only on initial HTML can break those
states or a user's next page. No further rules were identified as unambiguously
dead across this reusable starter's supported use cases.

Automatic post-build pruning is therefore not planned. Consumers with a fixed,
measured application can opt into their own pruning and safelists; Bootpack keeps
component selection, page entries, minification and a reproducible size report.