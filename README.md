# Bootpack

Bootstrap 5 + webpack 5 for multi-page static websites. Write HTML, customize Sass,
and publish the generated `dist` folder to any static host. No React, database,
application server, or jQuery required.

**v1.0.0** is a breaking upgrade; see the [migration guide](docs/migration-v1.md).
Explore the official examples at [bootpack.io](https://bootpack.io).

## Start here

Install [Node.js 24 LTS](https://nodejs.org/) (24.11 or newer within Node 24) and
[Git](https://git-scm.com/). npm is included with Node. Check both in a terminal:

```sh
node --version
npm --version
```

To try the starter:

```sh
git clone https://github.com/bootpack/bootpack.git my-website
cd my-website
npm ci
npm start
```

Open **http://localhost:8080**. Edit `src/index.html`, save, and the browser reloads.
Stop the server with **Ctrl+C**. You do not need to build before starting it.
If port 8080 is occupied, use `npm start -- --port 8081`.

To create your own repository, select **Use this template >
Create a new repository** on GitHub, then clone your new repository and run the
same `cd`, `npm ci`, and `npm start` commands.
Generated repositories are independent and do not automatically receive upstream updates.

New to the workflow? Follow [Your first website](docs/getting-started.md) for a
complete walkthrough, Windows notes, customization, and troubleshooting.

## Commands

| Command | Result |
|---|---|
| `npm start` | Development server and live reload on port 8080 |
| `npm run build` | Minified production HTML, CSS, JS and assets in `dist` |
| `npm run preview` | Serve the last production build at http://localhost:4173 |
| `npm run build:dev` | One development build written to `dist`, with source maps |
| `npm run watch` | Rebuild `dist` on changes without starting a server |
| `npm test` | Page discovery and non-destructive image-tool tests |
| `npm run lint` | Check JavaScript, CSS and Sass |
| `npm run check` | Lint, unit tests and production build |
| `npm run test:browser` | Chromium tests of the already-built `dist` folder |
| `npm run generate:images -- --width 800 --height 600` | Generate a JPEG placeholder without overwriting existing files |
| `npm run compress:images` | Process images into a new `optimized-images` folder; keep source files unchanged |

Browser-test setup is optional for building your own site:

```sh
npx playwright install chromium
npm run check
npm run test:browser
```

## Project layout

```text
src/
  index.html                 Homepage and example gallery
  templates/                 Starter, grid, callout and navbar examples
  js/index.js                JavaScript entry and selected Bootstrap plugins
  scss/variables.scss        Your Bootstrap variable overrides
  scss/bootstrap.scss        Selected Bootstrap Sass imports
  scss/custom.scss           Your additional Sass
  css/custom.css             Your additional plain CSS
  css/fonts.css              Local Open Sans font declarations
  images/                    Static images, copied without changing their paths
  fonts/                     Local fonts
  favicon.png                Site icon, linked correctly from nested pages
tools/                       Build discovery, local preview and image helpers
test/                        Unit and browser checks
dist/                        Generated output; never edit by hand
```

Keep the gallery while exploring, or replace `src/index.html` with the starter
example and adjust its `../../` links to be relative to the root. Every `.html`
or `.htm` file under `src` becomes a page at the same relative location in `dist`.
Restart `npm start` or `npm run watch` after adding, deleting or renaming pages.
Existing HTML/CSS/JS edits rebuild while the server is running.

## Customize and publish

- [First website and theming](docs/getting-started.md)
- [Image tools and asset paths](docs/assets.md)
- [Cloudflare Pages and other static hosts](docs/deployment.md)
- [Migrating from v0.13.0](docs/migration-v1.md)
- [v1.0.0 release checklist](docs/release-v1.md)
- [Contributing](.github/CONTRIBUTING.md)

The starter supports current Chrome, Edge, Firefox and Safari. Its documented
browser target is the latest two versions of each; the automated browser suite
currently runs Chromium. Internet Explorer is not supported. Add transpilation
only if your project's browser requirements need it.

## License and support

[MIT](LICENSE). Author: ZachTRice. Keep the license notices when reusing or
redistributing the template. Bootstrap and other dependencies retain their own
licenses. Report reproducible problems through [GitHub issues](https://github.com/bootpack/bootpack/issues).
