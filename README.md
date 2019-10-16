# ![bootpack](thumbnail.png) &middot; [![GitHub release](https://img.shields.io/github/release/bootpack/bootpack.svg)](https://GitHub.com/bootpack/bootpack/releases/) [![Build Status](https://travis-ci.com/bootpack/bootpack.svg?branch=master)](https://travis-ci.com/bootpack/bootpack) [![GitHub license](https://img.shields.io/github/license/bootpack/bootpack.svg)](https://github.com/bootpack/bootpack/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/bootpack/bootpack/blob/master/.github/CONTRIBUTING.md) [![GitHub stars](https://img.shields.io/github/stars/bootpack/bootpack.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/bootpack/bootpack/stargazers/)

## bootpack
`bootpack` is a boilerplate template for creating multi-page websites using bootstrap for development and webpack for task running. View the latest version at [https://bootpack.github.io/bootpack/](https://bootpack.github.io/bootpack/).

**Bootstrap + Webpack = &hearts;**
- **Just Develop:** 4 steps to [get started](#getting-started). Launch a dev server with live reloading.
- **Pre-Configured:** A pre-configured webpack config simplifies overcomplicated build processes.
- **Predictable File Output:** Keep your CSS where you want it; out of your JavaScript files! The `dist` directory will closely match the `src` directory.
- **Minified Files:** JavaScript and CSS is minified and output as single files.
- **Compressed Resources:** JS, CSS, fonts, images and favicons are gzipped for maximum compression.
- **Dev and Production Builds:** [Build](#build) the project in development mode with sourcemapping enabled or minified for production mode.
- **Development Tools:** Generate & compress images, create placeholder images + more [tools](#tools) to ease web development.
- **Built-In Tests:** Lint JavaScript and CSS files with [one command](#test).

## Table of Contents
- [Overview](#bootpack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [About](#about)
- [Contributing](#contributing)
- [Support](#support)

## Getting Started

### Prerequisites
- This project uses [Node.js v8.15.1](https://nodejs.org/en/download/) or greater.

### Use bootpack as a template (Option 1)

*Using bootpack as template is the recommended method.*

1. To get started, click the "Use this template" button at the top of this repository.   
![Use this template button](.github/images/use_this_template_button.jpg?raw=true "Use this template")

2. After clicking the "Use this template" button, you will be asked to enter a name for a new repostiory. This repository will be generated with all of the bootpack repository’s files and folders.   

3. Next, simply perform the following commands in your terminal to get started, replacing `[USERNAME]/[REPOSITORY_NAME]` with the location and repository names you chose in the previous step.

```
git clone https://github.com/[USERNAME]/[REPOSITORY_NAME].git
npm install
npm run build
npm start
```

### Fork/Clone bootpack  (Option 2)

bootpack can also be forked into your own repository and cloned or cloned directly using the following commands.

```
git clone https://github.com/bootpack/bootpack.git
npm install
npm run build
npm start
```
- Navigate to http://localhost:8080 in a browser. 
- Press ctrl+c in the terminal to stop serving.

## Usage
### Build
`npm run build` - Creates the project in **production** mode (minified) and outputs to the `dist` directory.   
`npm run build:dev` - Creates the project in **development** mode (unminified) and outputs to the `dist` directory.  
`npm start` - Creates the project in **development** mode (unminified). This mode starts a development server at localhost:8080.   
`npm run watch` - Creates the project in **development** mode (unminified). This mode starts a development server at localhost:8080, watches for changes and refreshes the browser on change.   

### Test
`npm run test` - Runs lint tests (+ additional unit and e2e tests can be added here as needed)   
`npm run lint` - Runs `npm run lint:js` and `npm run lint:styles`   
`npm run lint:js` - Runs eslint test on `src/*/*.js` files   
`npm run lint:css` - Runs stylelint test on `src/css/*.css` files   
`npm run lint:scss` - Runs stylelint test on `src/scss/*.scss` files   
`npm run lint:styles` - Runs `npm run lint:css` and `npm run lint:scss`

### Deploy
`npm run deploy:gh-pages` 
- Deploys the current version of the master branch to gh-pages.
- Only deploys when the package.json version has changed.
- The package.json version number will be used for the commit name   
See example commit history: https://github.com/bootpack/bootpack/commits/gh-pages
- Note: Requires a `gh-pages` branch to be created first. If you have not created an empty `gh-pages` branch, do the following:
```
# Create an orphan branch named gh-pages
git checkout --orphan gh-pages

# Remove all files from staging
git rm -rf . 

# Create an empty commit so that you will be able to push on the branch next
git commit --allow-empty -m "Init empty branch"

# Push the branch
git push origin gh-pages
```

### Tools
`npm run compress:images` 
- Optimizes images in the `images` directory, saves original images to `images-original`.
- Run before building or during watch. Only the `images` directory will be copied to the `dist` directory.
- Edit `tools/image-compress.js` to change the image compress.   
See: https://www.npmjs.com/package/compress-images for settings

`npm run generate:images` 
- Creates a `placeholder.jpg` image in the `images` directory.
- Placeholder image is 800px x 800px by default.

`npm run generate:images -- --width=### --height=### --title='placeholder'`
- Creates custom images based on values provided in parameters.
- Replace `###` with a numeric value representing width and height (defaults to 800px if not provided).
- Replace `placeholder` in title parameter with any string to change the file name.

`npm run generate:images:multiple`
- Uses `placeholders.json` in the project root to generate multiple images
- Each image is an object within an "images" array object. See example below:
```
{
  "images": [
    {
      "title": "banner",
      "width": 1200,
      "height": 320
    },
    {
      "title": "thumbnail",
      "width": 80,
      "height": 80
    }
  ]
}
```

`npm run generate:images -- multiple='path/to/custom_placeholders.json'`
- Generate multiple images using a custom placeholders file.


## About
### Webpack 4
#### Webpack: Builds
The webpack build creates a `dist` directory that closely mimics the `src` directory. 
- In production mode, the `dist` directory contains files that are minified & compressed. 
- In development mode, files are kept unminified with sourcemapping turned on as needed & no compression output. 
- Webpack server is available to speed up development via live browser refreshes on code change while preserving the ability to inspect the `dist` directory. 

The `src` directory contains starter files to get your project off the ground quickly.

#### Webpack: Process
1. The `dist` directory is cleaned on first built or modified on change (`npm run watch`).
2. `src/**/*.html` is copied to `dist/**/*.html`
3. Favicons are generated and injected into the dist index.html file from the `src/favicon.png` file and output to `dist/favicons/[favicon].ext`. 
4. Bootstrap components are imported into the index.js and output to `dist/index.js`.
5. CSS/SCSS files in `src/css/` and `src/scss/` are bundled together, minified and output to `dist/styles.css`.
6. Images and fonts are copied from `src/images` -> `dist/images` and `src/fonts` -> `dist/fonts`.
7. Files are compressed with gzip compression.

### Bootstrap 4
#### Bootstrap: SCSS Files
Bootstrap 4 is imported into `scss/boostrap.scss` via `@import "~bootstrap/scss/*bootstrap*";` import rules. Optional components can be excluded by commenting out the `@import` rules in this file (**recommended to minimize bundle size**). 

##### SCSS/CSS Overrides & Custom Styles:
- `scss/variables.scss` is included to override all of bootstrap's built in variables.
- `scss/custom.scss` is included to add custom scss to the project.
- `css/custom.css` is included to add custom css to the project.
- `css/fonts.css` is included to import local fonts into the project. Open Sans has been included as an example.

#### Bootstrap: JS Files
Bootstap 4 is imported in the index.js file via `bootstrap.bundle` which contains the full bootstrap JavaScript plus the `popper.js` tooltip dependency.   Below the `bootstrap.bundle` import, comments contain other methods to import bootstrap. End-users may choose to import `bootstrap.bundle`, `bootstrap`, or individual components (**recommended to minimize bundle size**).

### File Structure
`src` file structure
```
|-css/
|--custom.css
|--fonts.css
|-fonts/
|--OpenSans/
|----[font_styles]/
|-images/
|--[images]
|-js
|--index.js
|-scss/
|--boostrap.scss
|--custom.scss
|--variables.scss
|-templates/
|--[templates]/
|----index.html
|-favicon.png
|-index.html
```

`dist` file structure
```
/* All files compressed, minified & gzipped */
|-css
|--index.css
|--index.css.gz
|-fonts/
|--OpenSans/
|----[font_styles]/
|-images/
|--[images]
|-js
|--index.js
|--index.js.gz
|-templates/
|--[templates]/
|----index.html
|----index.html.gz
|-favicons/
|--[favicons]
|-index.html
|-index.html.gz
```

## Contributing
Please contribute using [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow). Create a feature branch, add commits, and [open a pull request](https://github.com/bootpack/bootpack/compare/).

## Support
Please [open an issue](https://github.com/bootpack/bootpack/issues/new) for support.
