# v1.0.0 release

Status: implementation in progress on `develop`, started 2026-09-08. Version 1.0.0
is the target; no release tag or production publication is implied by package.json.

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
- [ ] Run the checked-in Windows and Linux CI workflow on GitHub.
- [x] 24 Chromium desktop/mobile tests at root and /bootpack/ subpath.
- [x] Verify HTML/CSS/JS reload and document page-addition restart behavior.
- [x] Review desktop/mobile screenshots, fonts/icons and real 404 responses.
- [x] Verify production output excludes source maps.
- [x] Dependency audit (zero vulnerabilities) and clean-copy onboarding walkthrough.
- [ ] Verify custom page images and custom 404 rendering on the actual Pages host.
- [ ] Validate Pages preview, custom-domain HTTPS and preserve email DNS.
- [ ] Update GitHub landing links once bootpack.io is live.
- [x] Delete empty bootpack-reactstrap repository through an authorized owner session.
- [ ] Review master promotion, remove development-only onboarding warnings, then
  tag/release v1.0.0 with migration notes and verified deployment information.

## Local handoff

Validated on Windows with Node 24.15.0 and npm 11.12.1. Browser coverage is
Chromium only; Firefox, Safari and actual Linux CI have not run. Page discovery
and image-tool tests include nested paths, non-destructive output and repeat runs.
The clean-copy dev check confirmed HTML reload and CSS/JavaScript updates.

Implementation and documentation are prepared for publication on `develop`.
The separate bootpack.github.io working copy has a tested static landing update;
its new guide link must not be published before this repository's guides are
available remotely. Neither website has been published by this work.

Owner-authenticated GitHub and Cloudflare browser sessions became available on
2026-09-08. The empty Reactstrap repository is absent from the organization and its
API returns 404, confirming deletion. GitHub Pages for this repository publishes
only the legacy `gh-pages` branch; pushing `develop` does not replace that demo.
Cloudflare confirms no Workers/Pages projects exist yet. Set up Pages using
[Deployment](deployment.md), preserving existing mail records. Do not put login
tokens in Git, documentation or chat. Domain activation and release publication
remain separate gates.

Do not introduce React, a generator CLI, a second bundler, or automatic CSS purging
in this release. These need separate demand and maintenance decisions. Per-page
entries/shared partials remain future enhancements; all pages share one entry today.
