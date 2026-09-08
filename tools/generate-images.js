const fs = require('node:fs/promises');
const path = require('node:path');
const { parseArgs } = require('node:util');
const sharp = require('sharp');

function imageSpec(image) {
  const width = Number(image.width ?? 800);
  const height = Number(image.height ?? 600);
  const title = image.title ?? 'placeholder';
  if (![width, height].every(size => Number.isInteger(size) && size > 0 && size <= 8192)) {
    throw new Error('Width and height must be integers from 1 to 8192.');
  }
  if (typeof title !== 'string' || !/^[a-z0-9][a-z0-9_-]*$/i.test(title)) {
    throw new Error('Title must use only letters, numbers, underscores and hyphens.');
  }
  return { width, height, filename: `${title}_${width}x${height}.jpg` };
}

async function generateImages(images, output = 'src/images') {
  const specs = images.map(imageSpec);
  if (new Set(specs.map(spec => spec.filename.toLowerCase())).size !== specs.length) {
    throw new Error('Duplicate image filenames.');
  }
  await fs.mkdir(output, { recursive: true });
  for (const spec of specs) {
    const buffer = await sharp({
      create: { width: spec.width, height: spec.height, channels: 3, background: '#176b87' }
    }).jpeg({ quality: 80 }).toBuffer();
    await fs.writeFile(path.join(output, spec.filename), buffer, { flag: 'wx' });
  }
  return specs.map(spec => spec.filename);
}

async function main() {
  const args = process.argv.slice(2);
  const multipleIndex = args.indexOf('--multiple');
  if (multipleIndex >= 0 && (!args[multipleIndex + 1] || args[multipleIndex + 1].startsWith('--'))) {
    args.splice(multipleIndex + 1, 0, 'placeholders.json');
  }
  const { values } = parseArgs({ args, options: {
    width: { type: 'string' }, height: { type: 'string' }, title: { type: 'string' },
    multiple: { type: 'string' }, output: { type: 'string', default: 'src/images' }
  } });
  const images = values.multiple
    ? JSON.parse(await fs.readFile(values.multiple, 'utf8')).images
    : [values];
  if (!Array.isArray(images) || images.length === 0) {
    throw new Error('The input JSON must contain a nonempty "images" array.');
  }
  console.log((await generateImages(images, values.output)).join('\n'));
}

if (require.main === module) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}

module.exports = { imageSpec, generateImages };
