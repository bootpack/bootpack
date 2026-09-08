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

module.exports = { discoverPages };
