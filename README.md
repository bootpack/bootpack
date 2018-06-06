# Webpack Bootstrap Boilerplate

[![Build Status](https://travis-ci.com/ZachTRice/webpack-bootstrap-boilerplate.svg?branch=master)](https://travis-ci.com/ZachTRice/webpack-bootstrap-boilerplate)

## Overview

A boilerplate template for getting a web page set up quickly using webpack for task running and bootstrap for development. 

### Webpack 4
The webpack build creates a `dist` folder that closely mimics the `src` folder. In production mode, the `dist` folder contains files that are minified & compressed. In development mode, files are kept unminified with sourcemapping turned on as needed & no compression output. Webpack server is available to speed up development via live browser refreshes on code change while preserving the ability to inspect the `dist` folder. The `src` directory contains starter files to get the project off the ground quickly.

### Bootstrap 4
#### JS
Bootstap 4 is imported in the index.js file via `bootstrap.bundle` which contains the full bootstrap JavaScript plus the `popper.js` tooltip dependency. Below the `bootstrap.bundle` import, comments contain other methods to import bootstrap. End-users may choose to import `bootstrap.bundle`, `bootstrap`, or individual components (**recommended to minimize bundle size**).

#### CSS
Bootstrap 4 is imported into main.css via `@import "~bootstrap/scss/bootstrap";`. This imports the full bootstrap 4 css. Or, individual components can be imported using the commented out `@import` rules in this file (**recommended to minimize bundle size**).

#### Example File Structure
`src` file structure
```
|-css/
|-favicon/
|-fonts/
|--OpenSans/
|--[font_styles]/
|-images/
|-js/index.js
|-index.html
```

`dist` file structure
``` 
/* All files minified & gzipped */
|-css/main.css
|-favicon/
|-fonts/
|--OpenSans/
|--[font_styles]/
|-images/
|-js/index.js
|-index.html
|-[favicons]
```

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)

## Installation
Download to your project directory, add `README.md`, and commit:

```sh
git clone https://github.com/ZachTRice/webpack-bootstrap-boilerplate.git
npm install
npm run build
npm start
```

## Usage
### Build
`npm run build` - Creates the project in **production** mode and outputs to the dist folder.   
`npm run watch` - Creates the project in **development** mode and outputs to the dist folder.   
`npm start` - Creates the project in production mode, runs webpack-dev-server to watch for changes & refresh the page. Changes are output to the dist folder.   

### Test
`npm run test` - Runs lint tests; Unit and e2e tests can be added here
`npm run lint` - Runs eslint and stylelint tests   
`npm run lint:js` - Runs eslint test   
`npm run lint:css` - Runs stylelint test   

### Tools
`npm run generate:images` - Create a placeholder image (Edit `tools/image-generator.js` to change the image size)

Please [open an issue](https://github.com/ZachTRice/webpack-bootstrap-boilerplate/issues/new) for support.

## Contributing

Please contribute using [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow). Create a feature branch, add commits, and [open a pull request](https://github.com/ZachTRice/webpack-bootstrap-boilerplate/compare/).
