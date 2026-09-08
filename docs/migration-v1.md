# Migrating to v1.0.0

This is a breaking modernization from v0.13.0, not a drop-in dependency update.
Keep a backup/branch of your website before upgrading. Generated template copies
do not automatically synchronize with Bootpack; move your content into a clean
v1 working copy or review the upstream changes file by file.

## Main changes

| Before | v1.0.0 |
|---|---|
| Node 8 | Node 24 LTS |
| Bootstrap 4, jQuery, Popper 1 | Bootstrap 5.3, vanilla JS plugins, Popper 2 |
| webpack 4, old loaders/minimizers | webpack 5 and current compatible plugins |
| Node Sass and copied Bootstrap variables | Dart Sass and a small override file |
| Babel 6/7 mixed dependencies | No Babel by default; modern browsers only |
| Fixed JS/CSS names | Content-hashed production bundles, HTML-injected links |
| Production inline source maps | No production source maps |
| Many generated favicon formats | One PNG favicon by default |
| gzip sidecar files | Host-managed compression |
| npm test runs lint | npm test runs unit tests; npm run check runs lint/tests/build |
| npm start writes to disk | Development server uses memory; build/watch writes dist |
| In-place image replacement | Separate, new output folder; originals untouched |
| Manual deploy script switches/pushes branches | Explicit hosting setup; no implicit deployment |

## Migrate content and styles

1. Copy only your own HTML, images, fonts and styles, not the old node_modules or
   copied Bootstrap 4 variable file. Install from the new lockfile with `npm ci`.
2. Change `data-toggle`/`data-target` to `data-bs-toggle`/`data-bs-target`. Remove
   jQuery plugin initialization and use Bootstrap's documented JavaScript APIs.
3. Replace `ml-*`/`mr-*` with `ms-*`/`me-*`, `sr-only` with `visually-hidden`,
   `.form-inline` with layout utilities, and `.jumbotron` with spacing/background
   utilities. Update removed custom-form, card and component patterns as needed.
4. Review Bootstrap's six breakpoints, gutters and spacing differences. Use
   `data-bs-theme="dark"` for dark navbars. Check mobile menus and keyboard focus.
5. Put actual overrides into `src/scss/variables.scss`. Removed Bootstrap 4
   functions such as `theme-color()` and old YIQ variables must not be copied over.
6. Check your required component imports. The default includes collapse/dropdown
   JavaScript and a selected Sass subset, not every interactive component.
7. Remove hard-coded script/CSS filenames and duplicate CDN imports. Check HTML
   and CSS relative asset paths and any custom favicon/manifest requirements.
8. Replace uses of the old image/deployment CLI behavior with the documented v1
   commands. Original images are no longer automatically moved into an originals folder.
9. Run `npm run check`, then browser tests and a production preview. Test your own
   forms, links and deployment subdirectory before replacing the live site.

See [Bootstrap's complete migration guide](https://getbootstrap.com/docs/5.3/migration/).
Keep the v0.13.0 tag as a historical reference. Do not bulk-merge old dependency bot
PRs into this new major dependency graph.
