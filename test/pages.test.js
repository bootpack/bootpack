const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { discoverPages, createPageBundles } = require('../tools/pages');

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

test('page bundles preserve shared defaults and keep the 404 self-contained', () => {
  const pages = [{ filename: 'index.html' }, { filename: '404.html' }];
  const bundles = createPageBundles(pages);
  assert.deepEqual(bundles.entry, {});
  assert.deepEqual(bundles.pages.map(page => page.chunks), [['index'], []]);
  assert.equal(pages[0].chunks, undefined);
});

test('page bundles inject only assigned entries after the shared entry', () => {
  const pages = ['index.html', 'guides/about.team.html', 'guides/help.htm'].map(filename => ({ filename }));
  const bundles = createPageBundles(pages, {
    'guides/about.team.html': './src/css/about.css',
    'guides/help.htm': './src/js/help.js'
  });
  assert.deepEqual(bundles.entry, {
    'pages/guides/about.team': { import: './src/css/about.css', dependOn: 'index' },
    'pages/guides/help': { import: './src/js/help.js', dependOn: 'index' }
  });
  assert.deepEqual(bundles.pages.map(page => page.chunks), [
    ['index'], ['index', 'pages/guides/about.team'], ['index', 'pages/guides/help']
  ]);
  assert.ok(bundles.pages.every(page => page.chunksSortMode === 'manual'));
});

test('page bundles reject stale mappings, invalid entries and ambiguous chunk names', () => {
  const pages = ['index.html', '404.html', 'help.html', 'help.htm'].map(filename => ({ filename }));
  for (const filename of ['missing.html', '404.html']) {
    assert.throws(() => createPageBundles(pages, { [filename]: './src/css/page.css' }), /existing non-404 page/);
  }
  for (const source of ['', null, []]) {
    assert.throws(() => createPageBundles(pages, { 'index.html': source }), /path/);
  }
  assert.throws(() => createPageBundles(pages, {
    'help.html': './src/css/first.css', 'help.htm': './src/css/second.css'
  }), /collision/);
});
