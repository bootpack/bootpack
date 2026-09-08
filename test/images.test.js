const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const sharp = require('sharp');
const { imageSpec, generateImages } = require('../tools/generate-images');
const { compressImages } = require('../tools/compress-images');

test('validates dimensions and prevents filename traversal', () => {
  for (const width of [0, -1, 'bad', 8193, 1.5]) assert.throws(() => imageSpec({ width }));
  assert.throws(() => imageSpec({ title: '../outside' }));
  assert.equal(imageSpec({}).filename, 'placeholder_800x600.jpg');
});

test('generates multiple images, refuses overwrites, and preserves compression originals', async context => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'bootpack-images-'));
  context.after(() => fs.rm(root, { recursive: true, force: true }));
  const source = path.join(root, 'source');
  const output = path.join(root, 'optimized');
  await generateImages([{ width: 20, height: 10 }, { title: 'second', width: 10, height: 20 }], source);
  const original = await fs.readFile(path.join(source, 'placeholder_20x10.jpg'));
  assert.equal((await sharp(original).metadata()).width, 20);
  await assert.rejects(generateImages([{ width: 20, height: 10 }], source), { code: 'EEXIST' });
  await assert.rejects(compressImages(source, source), /separate/);
  await assert.rejects(compressImages(source, path.join(source, 'nested')), /separate/);
  assert.equal(await compressImages(source, output), 2);
  assert.deepEqual(await fs.readFile(path.join(source, 'placeholder_20x10.jpg')), original);
  await assert.rejects(compressImages(source, output), { code: 'EEXIST' });
});
