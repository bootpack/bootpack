const fs = require('node:fs/promises');
const path = require('node:path');
const { parseArgs } = require('node:util');
const sharp = require('sharp');

async function compressImages(input = 'src/images', output = 'optimized-images') {
  const source = await fs.realpath(input);
  const destination = path.join(await fs.realpath(path.dirname(path.resolve(output))), path.basename(output));
  const related = (parent, child) => {
    const relative = path.relative(parent, child);
    return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
  };
  if (related(source, destination) || related(destination, source)) {
    throw new Error('Input and output directories must be separate, not nested.');
  }
  await fs.mkdir(destination, { recursive: false });
  const files = [];
  async function visit(directory) {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) await visit(filename);
      else if (entry.isFile() && /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(entry.name)) files.push(filename);
    }
  }
  await visit(source);
  for (const filename of files) {
    const target = path.join(destination, path.relative(source, filename));
    await fs.mkdir(path.dirname(target), { recursive: true });
    if (/\.(gif|svg)$/i.test(filename)) await fs.copyFile(filename, target, fs.constants.COPYFILE_EXCL);
    else await sharp(filename).toFile(target);
  }
  return files.length;
}

async function main() {
  const { values } = parseArgs({ options: {
    input: { type: 'string', default: 'src/images' },
    output: { type: 'string', default: 'optimized-images' }
  } });
  console.log(`Processed ${await compressImages(values.input, values.output)} images into ${values.output}. Originals unchanged.`);
}

if (require.main === module) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}

module.exports = { compressImages };
