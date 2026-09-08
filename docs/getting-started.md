# Your first website

## 1. Install the prerequisites

Install Node.js 24 LTS and Git. Open a new terminal after installing them and run
`node --version`, `npm --version`, and `git --version`. This project needs Node
24.11 or later within the Node 24 line; `.nvmrc` records the pinned CI version.
An nvm installation can use `nvm install` followed by `nvm use`.

On Windows, Git Bash works with all commands below. In PowerShell, use `npm.cmd`
and `npx.cmd` if execution policy prevents the `.ps1` shims from running; changing
your machine's security policy is not required.

## 2. Get a working copy

To evaluate the starter, clone the released default branch:

```sh
git clone https://github.com/bootpack/bootpack.git my-website
cd my-website
npm ci
npm start
```

GitHub's **Use this template** button is the preferred way to start your own
repository. Clone the repository you created,
not Bootpack, and run `npm ci` from the folder containing `package.json`.

In your own project, update package metadata, the README, and example links to
match your site. The validation workflow runs on `develop` and `main`; it does
not publish or deploy anything. Bootpack does not include a Dependabot PR schedule.
Run `npm outdated` and `npm audit` regularly and review dependency updates manually.

Cloning Bootpack directly preserves its Git history and `origin` remote. Do not
push your site's changes to that upstream. Create your own empty repository and
use `git remote set-url origin <your-repository-url>` before your first push.

`npm ci` installs the exact dependency versions in `package-lock.json`. Commit
that file with your project. Use `npm install` when deliberately adding/updating
dependencies, then review and test the resulting lockfile changes.

Open http://localhost:8080. Keep the terminal open while developing. The dev server
serves generated files from memory; an older `dist` folder is not the live source.

## 3. Change the homepage

Open `src/index.html`, replace the title and main content, and save. The page reloads.
The included homepage is an example gallery, not required application code.

For a smaller starting point, copy the structure from
`src/templates/starter/index.html`. When moving it to the root, update relative
navigation links: `../../index.html` becomes `./index.html`, for example.
Replace sample titles, descriptions, placeholder links and form behavior before
publishing. The older example search forms have no search backend. The contact
example is a local preview only, and the pricing example describes fictional plans.
See [Examples](examples.md) for interactions and reuse notes.

## 4. Add another page

Create `src/about/index.html` with a normal HTML document. Copy the starter's
structure and content, set its title, and link back to `../index.html`. Link to it
from the homepage with `./about/index.html`.

Stop and restart the dev server, then open http://localhost:8080/about/.
New/deleted/renamed pages are discovered at startup; edits to existing pages reload.
Both nested folders and filenames containing dots are supported.

webpack injects the shared CSS, JavaScript and favicon into each generated page.
Do not manually add a second Bootstrap CDN stylesheet or script. This can cause
duplicate styles and double-handled interactions.

For styles or scripts needed by only one page, use the optional `page-entries.js`
mapping. Follow [Page-specific CSS and JavaScript](page-entries.md) for a complete
CSS-only example. Restart the server after editing that mapping, and remove its
entry when deleting a mapped page.

## 5. Change the theme

Edit `src/scss/variables.scss`, which loads before Bootstrap's default variables:

```scss
$primary: #176b87;
$font-family-sans-serif: "Open Sans", sans-serif;
$enable-rfs: false;
$border-radius: 0.375rem;
```

Add only the variables you want to override, not a full copy of Bootstrap's source.
For new rules, use `src/scss/custom.scss` or `src/css/custom.css`.
Bootstrap's [Sass guide](https://getbootstrap.com/docs/5.3/customize/sass/) explains
map overrides and import order. Do not edit files inside `node_modules`.

The shared starter includes navigation, collapse, dropdown, forms, cards, alerts
and core layout styles. The Elements catalog adds the other Bootstrap component
families in its page entry. Follow `src/js/elements.js` and `src/scss/elements.scss`
when adding a modal or other plugin only to a particular page. Add both its Sass
and JavaScript imports, matching markup and keyboard tests. Move imports into the
shared entry only when all pages need them. You can instead import all Bootstrap
styles/JS if bundle size is not important for your project.

Bootstrap 5 uses `data-bs-toggle` and `data-bs-target`. Do not use Bootstrap 4's
`data-toggle` or add jQuery. Bootstrap 5.3 still uses Sass `@import`; the build
suppresses its known import deprecation, not compilation errors.

## 6. Check the production version

```sh
npm run check
npm run preview
```

Open http://localhost:4173. Unlike the development server, preview serves the
existing `dist` folder. Run `npm run build` again after changes. Preview does not
upload anything and should not be exposed as a public production server.

For the same subdirectory layout as GitHub project Pages:

```sh
npm run preview -- --port 4174 --base /bootpack/
```

Open http://localhost:4174/bootpack/. Check navigation, images, fonts and mobile
menus. Then follow [Deployment](deployment.md).

## Troubleshooting

| Problem | Check |
|---|---|
| `npm` or `git` not found | Install the prerequisite and open a new terminal |
| `ENOENT` for package.json | `cd` into the cloned project folder |
| Unsupported engine | Use Node 24 LTS, at least 24.11 |
| Port already in use | `npm start -- --port 8081` or `npm run preview -- --port 4175` |
| New page returns 404 | Restart the dev server after creating the page |
| Change absent in preview | Build again; preview does not rebuild |
| Broken nested image | Use paths relative to the page; see [assets](assets.md) |
| Menu does not open | Check `data-bs-*`, a unique target ID, and the component JS import |
| PowerShell blocks npm.ps1 | Run `npm.cmd` instead |
| Certificate/proxy install error | Fix the trusted corporate proxy/certificate setup; do not disable TLS checks |
| Peer conflict after upgrading | Restore a known working lockfile or fix versions; do not use `--force` as the default fix |

Before opening an issue, include your OS, Node/npm versions, command, error text,
and a minimal reproduction. Never include credentials or environment secrets.
