# ![bootpack](thumbnail.png) &middot; [![GitHub release](https://img.shields.io/github/release/bootpack/bootpack.svg)](https://GitHub.com/bootpack/bootpack/releases/) [![Build Status](https://travis-ci.com/bootpack/bootpack.svg?branch=master)](https://travis-ci.com/bootpack/bootpack) [![GitHub license](https://img.shields.io/github/license/bootpack/bootpack.svg)](https://github.com/bootpack/bootpack/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/bootpack/bootpack/blob/master/.github/CONTRIBUTING.md) [![GitHub stars](https://img.shields.io/github/stars/bootpack/bootpack.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/bootpack/bootpack/stargazers/)

## bootpack

`bootpack` is a boilerplate template for getting a web page set up quickly using webpack for task running and bootstrap for development.

**Bootstrap + Webpack = &hearts;**
- **Just Develop:** 4 steps to [get started](#installation). Launch a dev server with live reloading.
- **Pre-Configured Build:** A pre-configured webpack config simplifies overcomplicated build processes.
- **Predictable File Output:** Keep your CSS where you want it; out of your JavaScript files! The `dist` directory will closely match the `src` directory.
- **Minified Files:** JavaScript and CSS is minified and output as single files.
- **Compressed Resources:** JS, CSS, fonts, images and favicons are gzipped for maximum compression.
- **Dev and Production Builds:** [Build](#build) the project in development mode with sourcemapping enabled or production mode.
- **Development Tools:** Generate & compress images + more [tools](#tools) to ease web development.
- **Built-In Tests:** Lint JavaScript and CSS files with [one command](#test).

## Table of Contents
- [Overview](#bootpack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [About](#about)
- [Contributing](#contributing)
- [Support](#support)

## Getting Started
```
git clone https://github.com/bootpack/bootpack.git
npm install
npm run build
npm start
```
- Navigate to http://localhost:8080 in a browser. 
- Save a file in the project to refresh the browser. 
- Press ctrl+c in the terminal to stop serving.

## Usage
### Build
`npm run build` - Creates the project in **production** mode (minified) and outputs to the dist directory.   
`npm run watch` - Creates the project in **development** mode (unminified). This mode watches for changes and outputs to the dist directory.   
`npm start` - Creates the project in **development** mode (unminified). This mode watches for changes, outputs to the dist directory and live reloades the page.

### Test
`npm run test` - Runs lint tests (+ additional unit and e2e tests can be added here as needed)   
`npm run lint` - Runs eslint and stylelint tests   
`npm run lint:js` - Runs eslint test   
`npm run lint:css` - Runs stylelint test

### Tools
`npm run compress:images` 
- Optimizes images in the `images` directory, saves original images to `images-original`.   
- Run before building or during watch. Only the `images` directory will be copied to the `dist` directory.   
- Edit `tools/image-compress.js` to change the image compress. See: https://www.npmjs.com/package/compress-images for settings

`npm run generate:images` 
- Creates a placeholder.jpg image in the `images` directory   
- Edit `tools/image-generator.js` to change the image size

## About

### Webpack 4
#### Webpack: Builds
The webpack build creates a `dist` directory that closely mimics the `src` directory. 
- In production mode, the `dist` directory contains files that are minified & compressed. 
- In development mode, files are kept unminified with sourcemapping turned on as needed & no compression output. 
- Webpack server is available to speed up development via live browser refreshes on code change while preserving the ability to inspect the `dist` directory. The `src` directory contains starter files to get the project off the ground quickly.

#### Webpack: Process
The webpack task runner builds the site with the following commands:
- `npm run build` will build production. 
- `npm run watch` builds development mode and watches for file changes. 
- `npm run start` builds development mode, watches for file changes, opens the browser when first ran and refreshes the browser when files change.
1. The `dist` directory is cleaned and rebuilt or modified.
2. Images and fonts are copied from `src/images` -> `dist/images` and `src/fonts` -> `dist/fonts`.
3. Favicons are generated and injected into the dist index.html file from the `src/favicon.png` file. 
4. `src/**/*.html` is copied to `dist/**/*.html`
5. [Optional]: Individual, global bootstrap components are injected into the index.js.
6. CSS files imported into `src/css/main.css` are bundled together and minified.
8. Files are compressed with gzip compression.

### Bootstrap 4
#### Bootstrap: JS Files
Bootstap 4 is imported in the index.js file via `bootstrap.bundle` which contains the full bootstrap JavaScript plus the `popper.js` tooltip dependency. Below the `bootstrap.bundle` import, comments contain other methods to import bootstrap. End-users may choose to import `bootstrap.bundle`, `bootstrap`, or individual components (**recommended to minimize bundle size**).

#### Bootstrap: CSS Files
Bootstrap 4 is imported into main.css via `@import "~bootstrap/scss/bootstrap";`. This imports the full bootstrap 4 CSS. Optional, individual components can be imported using the commented out `@import` rules in this file (**recommended to minimize bundle size**).

### File Structure
`src` file structure
```
|-css/
|-fonts/
|--OpenSans/
|--[font_styles]/
|-images/
|-js/index.js
|-index.html
|-favicon.png
```

`dist` file structure
```
/* All files minified & gzipped */
|-css/main.css
|-fonts/
|--OpenSans/
|--[font_styles]/
|-images/
|-js/index.js
|-index.html
|-[favicons]
```

## Contributing

Please contribute using [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow). Create a feature branch, add commits, and [open a pull request](https://github.com/bootpack/bootpack/compare/).


## Support
Please [open an issue](https://github.com/bootpack/bootpack/issues/new) for support.
