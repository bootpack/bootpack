const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { parseArgs } = require('node:util');
const sirv = require('sirv');

const { values } = parseArgs({ options: {
  port: { type: 'string', default: '4173' }, base: { type: 'string', default: '/' }
} });
const port = Number(values.port);
if (!Number.isInteger(port) || port < 1 || port > 65535 || !/^\/(?:[\w-]+\/)*$/.test(values.base)) {
  throw new Error('Use a port from 1 to 65535 and a base such as / or /bootpack/.');
}
const serve = sirv(path.join(__dirname, '../dist'), { dev: true });
const notFound = fs.readFileSync(path.join(__dirname, '../dist/404.html'));
http.createServer((request, response) => {
  if (!request.url.startsWith(values.base)) {
    response.writeHead(404).end('Not found');
    return;
  }
  request.url = '/' + request.url.slice(values.base.length);
  serve(request, response, () => response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(notFound));
}).listen(port, '127.0.0.1', () => console.log(`Preview: http://127.0.0.1:${port}${values.base}`));
