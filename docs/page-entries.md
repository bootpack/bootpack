# Page-specific CSS and JavaScript

Every ordinary page receives the shared `src/js/index.js` entry first. Add entries
to the root `page-entries.js` only when a page needs extra styles or behavior.
The supplied Album entry is CSS-only; Elements imports both Sass and JavaScript.
An empty mapping restores the shared-only default. The standalone 404 never gets
shared or page bundles.

## Add a stylesheet to one page

1. Create `src/about/index.html` using the starter layout.
2. Create `src/css/about.css`, for example:

   ```css
   .about-heading {
     color: #176b87;
   }
   ```

3. Add the page to `page-entries.js`, alongside any existing mappings:

   ```js
   module.exports = {
     'templates/album/index.html': './src/css/examples.css',
     'templates/elements/index.html': './src/js/elements.js',
     'about/index.html': './src/css/about.css'
   };
   ```

4. Use `class="about-heading"` on the page's heading, restart `npm start`, and
   visit `/about/`. Do not import this stylesheet into the shared entry as well.

Keys are exact paths relative to `src`, with forward slashes and the `.html` or
`.htm` extension. Values are webpack entry paths relative to the project root;
use `./src/...` for local files. Each value is one CSS, Sass or JavaScript file.
Unknown pages, 404 mappings, empty values and colliding output names fail early.
Remove a mapping when deleting its page. `help.html` and `help.htm` can coexist,
but cannot both have page entries because their chunk names would collide.

## Add JavaScript and multiple stylesheets

Point the mapping at `./src/js/about.js` instead, then import styles and plugins
there:

```js
import '../css/about.css';
import '../scss/about.scss';
import 'bootstrap/js/dist/modal';
```

Import each required component's Sass too. The Elements entry demonstrates how
to load Bootstrap's shared Sass variables/mixins and only the missing component
styles, without recompiling the entire shared Bootstrap stylesheet.

## Output and ordering

- Shared CSS is `css/styles.<hash>.css`; shared JavaScript is `js/index.<hash>.js`.
- The About entry emits `css/pages/about/index.<hash>.css` and
  `js/pages/about/index.<hash>.js`. Development filenames omit the hash.
- Shared assets load before the assigned page assets, with deferred scripts.
  Page entries depend on the shared runtime and reuse its imported JS modules.
- A CSS-only entry also emits a small webpack JS entry; let webpack inject it.
- Other pages receive neither About asset. Page CSS comes after shared custom
  rules, so normal specificity/order rules apply when overriding styles.
- HTML links are generated relative to each page, including subdirectory hosting.
  CSS `url(...)` values remain unchanged; see [asset paths](assets.md).

Restart development/watch mode after changing mappings or adding/removing pages.
Edits inside an existing entry and its imported files rebuild automatically.
The tests cover CSS-only development rebuilds, shared CSS isolation, nested pages,
root/subpath hosting, production hashes and exact stylesheet/script order.

Run `npm run build` followed by `npm run report:css` to inspect emitted sizes.
Automatic unused-selector deletion is deliberately not part of this starter;
see the [CSS review](issue-review-2026-09.md#css-pruning-decision).