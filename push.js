const https = require('https');
const fs = require('fs');
const path = require('path');

var TOKEN = process.argv[2] || '';
var REPO = process.argv[3] || '';
var BASE = process.argv[4] || 'C:\\myqian\\my-next-app';

function api(method, endpoint, data) {
  return new Promise((resolve, reject) => {
    var body = data ? JSON.stringify(data) : undefined;
    var opts = {
      hostname: 'api.github.com', path: endpoint, method: method,
      headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json', 'User-Agent': 'git-push' }
    };
    if (body) opts.headers['Content-Length'] = Buffer.byteLength(body);
    var req = https.request(opts, function(res) {
      var chunks = [];
      res.on('data', function(c) { chunks.push(c); });
      res.on('end', function() {
        var text = Buffer.concat(chunks).toString();
        if (res.statusCode >= 400) reject(new Error('HTTP ' + res.statusCode + ': ' + text.substring(0, 200)));
        else { try { resolve(JSON.parse(text)); } catch(e) { reject(new Error(text.substring(0, 100))); } }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function walkDir(dir, entries) {
  var ignore = ['.git', 'node_modules', '.next', '.vercel', '.pnpm-store'];
  var files = fs.readdirSync(dir);
  for (var i = 0; i < files.length; i++) {
    var name = files[i];
    var fullPath = path.join(dir, name);
    var stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (ignore.indexOf(name) >= 0) continue;
      await walkDir(fullPath, entries);
    } else {
      var relPath = path.relative(BASE, fullPath).split('\\').join('/');
      if (relPath === '.env.local') continue;
      if (relPath.indexOf('.env.') === 0) continue;
      var ext = path.extname(relPath).toLowerCase();
      if (['.ts','.tsx','.js','.mjs','.json','.css','.md','.txt','.lock','.gitignore'].indexOf(ext) >= 0 || relPath === 'README.md') {
        var content = fs.readFileSync(fullPath).toString('base64');
        var blob = await api('POST', '/repos/' + REPO + '/git/blobs', { content: content, encoding: 'base64' });
        entries.push({ path: relPath, mode: '100644', type: 'blob', sha: blob.sha });
        console.log('  OK ' + relPath);
      }
    }
  }
}

(async function() {
  var branch = await api('GET', '/repos/' + REPO + '/git/refs/heads/main');
  var baseSha = branch.object.sha;
  console.log('Base: ' + baseSha);
  var entries = [];
  await walkDir(BASE, entries);
  console.log('Files: ' + entries.length);
  console.log('Tree...');
  var tree = await api('POST', '/repos/' + REPO + '/git/trees', { base_tree: baseSha, tree: entries });
  console.log('Commit...');
  var commit = await api('POST', '/repos/' + REPO + '/git/commits', { message: 'feat: 牛的起源文章页面', tree: tree.sha, parents: [baseSha] });
  await api('PATCH', '/repos/' + REPO + '/git/refs/heads/main', { sha: commit.sha, force: true });
  console.log('Done! https://github.com/' + REPO);
})();
