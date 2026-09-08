# Bootpack v1.1.0

A backward-compatible feature release for the Bootstrap 5 + webpack 5 static-site
starter. This release packages the improvements made since the v1.0.0 tag, rather
than changing only the version of the examples.

## Highlights

- Optional per-page CSS, Sass and JavaScript entries through `page-entries.js`.
  Unmapped pages retain the shared bundle; mapped assets load after shared assets.
  Album demonstrates CSS-only input, while Elements demonstrates JavaScript plus
  Sass. MiniCssExtractPlugin is retained.
- Eight layouts: Starter, Grid, Jumbotron, Navbar, Album, Pricing, Contact and
  Elements. The four newer layouts extend the original v1.0.0 gallery.
- Elements covers every Bootstrap 5 component family and representative content,
  forms, utilities and helpers, with working keyboard-accessible interactions.
  Its additional component CSS and JavaScript stay on that page.
- `npm run report:css` reports raw, gzip and Brotli stylesheet sizes. Album styles
  are no longer shared across all pages. Automatic selector pruning is deliberately
  not enabled, preserving reusable utilities and dynamic Bootstrap states.
- The webpack build and browser console report the package version; homepage
  tests also verify the displayed release number.
- GitHub default/production branch is now `main`. GitHub Actions pins were updated,
  automatic Dependabot PR configuration removed, and security alerts retained.
  Dependency reviews remain manual each month and before releases.

## Upgrade notes

Node 24 requirements, Bootstrap/webpack versions, shared-entry defaults and static
hosting remain unchanged. This release adds no npm dependencies and is not an npm
package publication. Repositories created from the template do not auto-update:
review changes against your own customizations before adopting them.

Read the [page-entry guide](page-entries.md) before adding mappings. Restart the
development server after changing mappings or adding/removing pages; remove mapped
entries when deleting examples. Existing mapped-file edits rebuild automatically.
CSS URLs remain relative to their emitted stylesheet, whose path may be nested;
see [asset paths](assets.md). Do not hardcode hashed bundle names into HTML.

The Contact and Elements forms are local previews, not message-delivery services.
Pricing is fictional. See [example behavior and coverage](examples.md). Older clones
using `master` should follow the [branch rename steps](deployment.md#release-and-rollback).

## Validation and publication

Release gates are a clean install, lint, nine unit/watch tests, 80 Chromium browser
cases across desktop/mobile and root/subpath hosting, dependency audit, Windows and
Ubuntu CI, and hosted preview/production checks. Firefox and Safari are not part of
the automated browser matrix.

The owner authorized v1.1.0 and both website version updates on 2026-09-08.
Publish the annotated tag and GitHub release only after those gates pass. The
original v1.0.0 tag at `6ab479cf53e5c4dbb02c7d259d29c0adacfcdb3d` must not move.
The [GitHub release](https://github.com/bootpack/bootpack/releases/tag/v1.1.0)
is the publication record; a local version bump alone does not establish release.

The [issue review](issue-review-2026-09.md) records all ten legacy issue decisions.
The full change comparison is [v1.0.0...v1.1.0](https://github.com/bootpack/bootpack/compare/v1.0.0...v1.1.0).