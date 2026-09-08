const fs = require('node:fs');
const path = require('node:path');
const { gzipSync, brotliCompressSync } = require('node:zlib');

const directory = path.resolve(__dirname, '../dist/css');
if (!fs.existsSync(directory)) {
  console.error('Build first with npm run build, then run npm run report:css.');
  process.exitCode = 1;
} else {
  const report = fs.readdirSync(directory, { recursive: true })
    .filter(filename => filename.endsWith('.css'))
    .sort()
    .map(filename => {
      const content = fs.readFileSync(path.join(directory, filename));
      return {
        file: `css/${filename.split(path.sep).join('/')}`,
        bytes: content.length,
        gzipBytes: gzipSync(content).length,
        brotliBytes: brotliCompressSync(content).length
      };
    });
  console.log(JSON.stringify(report, null, 2));
}