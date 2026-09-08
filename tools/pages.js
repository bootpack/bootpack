const fs = require('node:fs');
const path = require('node:path');

function discoverPages(sourceDirectory) {
  const pages = [];

  function visit(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(absolutePath);
      } else if (entry.isFile() && /\.html?$/i.test(entry.name)) {
        pages.push({
          template: absolutePath,
          filename: path.relative(sourceDirectory, absolutePath).split(path.sep).join('/')
        });
      }
    }
  }

  visit(sourceDirectory);
  return pages.sort((first, second) => first.filename.localeCompare(second.filename, 'en'));
}

function createPageBundles(pages, pageEntries = {}) {
  const entry = {};
  const chunksByPage = new Map();
  for (const [filename, source] of Object.entries(pageEntries)) {
    if (filename === '404.html' || !pages.some(page => page.filename === filename)) {
      throw new Error(`Page entry must reference an existing non-404 page: ${filename}`);
    }
    if (typeof source !== 'string' || !source.trim()) {
      throw new Error(`Page entry must be a CSS, Sass or JavaScript path: ${filename}`);
    }
    const chunk = `pages/${filename.replace(/\.html?$/i, '')}`;
    if (Object.hasOwn(entry, chunk)) {
      throw new Error(`Page entry chunk name collision: ${filename}`);
    }
    entry[chunk] = { import: source, dependOn: 'index' };
    chunksByPage.set(filename, chunk);
  }
  return {
    entry,
    pages: pages.map(page => ({
      ...page,
      chunks: page.filename === '404.html' ? [] : ['index', chunksByPage.get(page.filename)].filter(Boolean),
      chunksSortMode: 'manual'
    }))
  };
}

module.exports = { discoverPages, createPageBundles };
