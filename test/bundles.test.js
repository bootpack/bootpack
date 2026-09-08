const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const webpack = require('webpack');
const configure = require('../webpack.config');

test('development rebuilds a CSS-only page entry without changing shared CSS', { timeout: 60000 }, async context => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'bootpack-bundles-'));
  const stylesheet = path.join(directory, 'page.css');
  fs.writeFileSync(stylesheet, '.page-probe { color: red; }');
  const config = configure({}, { mode: 'development' });
  config.output.path = path.join(directory, 'dist');
  config.entry['pages/templates/album/index'].import = stylesheet;
  const compiler = webpack(config);
  let watcher;
  context.after(async () => {
    if (watcher) await new Promise(resolve => watcher.close(resolve));
    await new Promise(resolve => compiler.close(resolve));
    fs.rmSync(directory, { recursive: true, force: true });
  });
  let firstShared;
  await new Promise((resolve, reject) => {
    watcher = compiler.watch({ aggregateTimeout: 20 }, (error, stats) => {
      try {
        assert.ifError(error);
        assert.equal(stats.hasErrors(), false, stats.toString({ all: false, errors: true }));
        const output = path.join(config.output.path, 'css/pages/templates/album/index.css');
        const css = fs.readFileSync(output, 'utf8');
        const shared = fs.readFileSync(path.join(config.output.path, 'css/styles.css'), 'utf8');
        assert.ok(!shared.includes('.page-probe'));
        if (firstShared === undefined) {
          assert.match(css, /color: red/);
          firstShared = shared;
          fs.writeFileSync(stylesheet, '.page-probe { color: blue; }');
        } else {
          assert.match(css, /color: blue/);
          assert.equal(shared, firstShared);
          resolve();
        }
      } catch (failure) {
        reject(failure);
      }
    });
  });
});