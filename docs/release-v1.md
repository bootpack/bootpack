# v1.0.0 release

Status: released on 2026-09-08 after owner-approved validation and launch.
[v1.0.0](https://github.com/bootpack/bootpack/releases/tag/v1.0.0) is the original
stable release, tagged at `6ab479cf53e5c4dbb02c7d259d29c0adacfcdb3d`.
See [v1.1.0 release notes](release-v1.1.md) for the subsequent feature release.
[bootpack.io](https://bootpack.io) and the
[organization directory](https://bootpack.github.io) are live.

## Scope

- Keep Bootstrap + webpack and framework-free multi-page static output.
- Preserve useful unreleased develop work, including the navbar example and
  multiple-image generation. Do not discard its history by restarting from master.
- Ship clear beginner onboarding, migration and asset/deployment documentation.
- Target bootpack.io on Cloudflare Pages after account/project setup and preview validation.
- Update the separate GitHub organization landing page to point at the canonical
  site and main starter. The empty Reactstrap repository is approved for deletion
  by the owner on 2026-09-08; there is no implementation to merge into this repo.

## Gates

- [x] Clean generated-copy install on Node 24 (`npm ci`), without Git or existing dependencies.
- [x] Local Windows lint, five unit tests and production build.
- [x] Run the checked-in Windows and Linux CI workflow on GitHub (5e8d63c).
- [x] Confirm final release-candidate CI after hosted-fallback correction (6ab479c).
- [x] 24 Chromium desktop/mobile tests at root and /bootpack/ subpath.
- [x] Verify HTML/CSS/JS reload and document page-addition restart behavior.
- [x] Review desktop/mobile screenshots, fonts/icons and real 404 responses.
- [x] Verify production output excludes source maps.
- [x] Dependency audit (zero vulnerabilities) and clean-copy onboarding walkthrough.
- [x] Verify copied images and custom 404 rendering on the actual Pages host.
- [x] Validate Pages preview, custom-domain HTTPS and preserve email DNS.
- [x] Update GitHub landing links once bootpack.io is live.
- [x] Delete empty bootpack-reactstrap repository through an authorized owner session.
- [x] Review master promotion, remove development-only onboarding warnings, then
  tag/release v1.0.0 with migration notes and verified deployment information.

## Release handoff

Validated on Windows with Node 24.15.0 and npm 11.12.1. Browser coverage is
Chromium only; Firefox and Safari have not run. Windows and Ubuntu both passed
[final candidate CI](https://github.com/bootpack/bootpack/actions/runs/34241987688)
at 6ab479c. Page discovery and image-tool tests include nested paths,
non-destructive output and repeat runs. The clean-copy dev check confirmed HTML
reload and CSS/JavaScript updates. Dependency audit reported zero vulnerabilities.

The tested history was fast-forwarded from `develop` to `master`, preserving the
unreleased development work. The annotated v1.0.0 tag remains on that exact tested
commit; this completed handoff is a subsequent documentation-only update. No npm
package was published. The repository is enabled as a GitHub template.

Cloudflare Pages project `bootpack` uses Git integration restricted to this
repository, framework None, `npm run build`, output `dist`, Node 24.15.0.
`main` deploys production; all other branches, including `develop` and `docs/*`,
currently deploy public previews. Review deployment approval before branch pushes.
The validated candidate is `960c64b3.bootpack.pages.dev`; the known-good v1
production deployment is `c0c04c29.bootpack.pages.dev`, both at 6ab479c.

Cloudflare reports bootpack.io Active with SSL enabled. All five live routes
passed Chromium checks at 1440px and 390px, including menu/keyboard behavior,
asset requests and overflow checks. The copied GIF matches the built output
byte-for-byte. Unknown nested URLs return the styled, self-contained 404 without
broken relative asset requests. Desktop/mobile screenshots were reviewed.

Domain activation added only the proxied apex CNAME to `bootpack.pages.dev`.
All nine existing SES mail/verification records were retained, giving ten records
in total. `www` is not configured; the canonical site is the apex domain.

The separate organization directory was published from `master` at 53a927e;
[its Pages workflow](https://github.com/bootpack/bootpack.github.io/actions/runs/34242964542)
passed, and live desktop/mobile checks confirmed the logo and current links.
The empty Reactstrap repository is absent from the organization and its API
returns 404, confirming deletion. No functionality was moved. This repository's
older project demo still publishes from `gh-pages` and was not replaced; it is
not the canonical v1 site.

Do not introduce React, a generator CLI, a second bundler, or automatic CSS purging
in this release. These need separate demand and maintenance decisions. Per-page
entries/shared partials were future enhancements at the tagged release; all pages
shared one entry in that snapshot.

## Post-release maintenance

On 2026-09-08 the owner authorized additional layouts, issue triage, manual
dependency maintenance and migration of the default/production branch to `main`.
The original release tag and evidence above remain unchanged. Current development
initially included eight examples and 56 Chromium checks.

The owner then approved completing the Elements catalog, per-page CSS entries and
the final CSS review, with deployment after validation. Local validation passed
nine unit/watch tests and 80 Chromium cases across desktop/mobile and root/subpath
hosting. Dependency audit found zero vulnerabilities and no outdated npm packages.
Elements now covers every Bootstrap 5 component family; Album and Elements assets
are isolated through the optional page-entry mapping. Automatic CSS pruning is
not planned after the measured review. See [Examples](examples.md),
[page entries](page-entries.md) and the [issue review](issue-review-2026-09.md).
