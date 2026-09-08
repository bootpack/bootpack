const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { discoverPages } = require('../tools/pages');

function fixture(context) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'bootpack-pages-'));
  context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}

test('discovers nested and dotted HTML filenames with portable output paths', context => {
  const directory = fixture(context);
  fs.mkdirSync(path.join(directory, 'guides', 'nested'), { recursive: true });
  for (const filename of ['index.html', 'guides/about.team.html', 'guides/nested/help.htm', 'ignored.css']) {
    fs.writeFileSync(path.join(directory, filename), '');
  }
  const pages = discoverPages(directory);
  assert.deepEqual(pages.map(page => page.filename), [
    'guides/about.team.html', 'guides/nested/help.htm', 'index.html'
  ]);
  assert.ok(pages.every(page => path.isAbsolute(page.template)));
  assert.deepEqual(discoverPages(directory), pages);
});

test('handles a root-only page without waiting on subdirectories', context => {
  const directory = fixture(context);
  fs.writeFileSync(path.join(directory, 'index.html'), '');
  assert.equal(discoverPages(directory)[0].filename, 'index.html');
});

test('empty directories have no pages', context => {
  assert.deepEqual(discoverPages(fixture(context)), []);
});
