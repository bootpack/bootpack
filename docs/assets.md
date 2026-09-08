# Images, fonts and icons

Files in `src/images` and `src/fonts` are copied to the matching folders in `dist`.
webpack links the shared CSS/JS and `src/favicon.png` relative to every output page,
so nested pages and repository-subdirectory hosting work without a fixed domain.

HTML image URLs are relative to the page. From `src/index.html` use
`./images/photo.jpg`; from `src/about/index.html` use `../images/photo.jpg`.
Avoid leading `/` URLs when supporting a project subdirectory such as `/bootpack/`.

CSS URLs are deliberately left unchanged by css-loader. Shared CSS is emitted
directly in `dist/css`, so use `../images/photo.jpg` and `../fonts/...` in shared
styles. [Page-specific styles](page-entries.md) have nested output paths: the
About stylesheet is `dist/css/pages/about/index.<hash>.css`, so its image URL
would be `../../../images/photo.jpg`. An entry for `templates/elements/index.html`
is one level deeper and would use `../../../../images/photo.jpg`. Resolve CSS URLs
from the emitted stylesheet, not from the source file or HTML page. These relative
paths also work under `/bootpack/`. The starter's shared local Open Sans declarations
remain unchanged and do not need a font-service network connection.

The default favicon is a PNG, not the old generated multi-platform icon package.
Add app manifests/touch icons explicitly when your site needs them. Retain their
relative paths and test nested pages after doing so.

## Generate placeholders

```sh
npm run generate:images -- --width 1200 --height 800 --title cover
```

Creates `src/images/cover_1200x800.jpg`. Defaults are 800x600 and title `placeholder`.
Dimensions must be integers from 1 through 8192; titles allow letters, numbers,
hyphens and underscores. Existing files are never overwritten. The placeholder
is a plain colored raster image, intended to be replaced with your own photograph.

For multiple images, create `placeholders.json`:

```json
{
  "images": [
    { "title": "cover", "width": 1200, "height": 800 },
    { "title": "thumbnail", "width": 400, "height": 300 }
  ]
}
```

Run `npm run generate:images:multiple`. To use another JSON file, run
`npm run generate:images -- --multiple my-images.json`. Use `--output other-folder`
to choose a destination. A failed batch can leave images already generated; inspect
the output before retrying, since existing files are deliberately not replaced.

## Process images safely

```sh
npm run compress:images
```

Processes JPEG, PNG, WebP and AVIF with Sharp into a **new** `optimized-images`
directory. SVG and GIF are copied unchanged, preserving vector/animation content.
Originals under `src/images` are never moved or deleted. Normal re-encoding may
remove metadata and does not guarantee every output is smaller; inspect quality
and size before manually adopting any result in `src/images`.

Use `--input source-folder --output new-output-folder` for another location. Input
and output cannot overlap, and the output must not already exist. Its parent must
exist. A failed run leaves partial output for inspection; it is never auto-deleted.
Run the build only after choosing which processed images to use. No optimizer runs
automatically during install, build or deployment.
