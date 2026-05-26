const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogg': 'video/ogg',
  '.mov': 'video/quicktime',
  '.mov.mov': 'video/quicktime',
  '.mp4.mp4': 'video/mp4',
  '.mp4.MOV': 'video/mp4',
  '.avi': 'video/x-msvideo',
  '.mkv': 'video/x-matroska',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

const VIDEO_EXTS = new Map([
  ['.mp4', true], ['.webm', true], ['.ogg', true],
  ['.mov', true], ['.avi', true], ['.mkv', true],
  ['.mov.mov', true], ['.mp4.mp4', true], ['.mp4.MOV', true],
]);

function setCrossOrigin(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Type');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range, Accept-Ranges, Content-Length');
}

function sendError(res, code, message) {
  const body = Buffer.from(message, 'utf-8');
  res.writeHead(code, { 'Content-Type': 'text/plain; charset=utf-8', 'Content-Length': body.length });
  res.end(body);
}

function sendFile(res, filePath, stats, contentType, isVideo, start, end) {
  setCrossOrigin(res);

  if (start !== undefined && end !== undefined && isVideo) {
    const chunksize = end - start + 1;
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${stats.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
    };
    res.writeHead(206, headers);
    fs.createReadStream(filePath, { start, end, highWaterMark: 65536 })
      .on('error', () => { if (!res.headersSent) sendError(res, 500, 'Stream Error'); })
      .pipe(res);
    return;
  }

  const headers = {
    'Content-Length': stats.size,
    'Content-Type': contentType,
    'Accept-Ranges': 'bytes',
    'Cache-Control': isVideo ? 'no-cache, no-store, must-revalidate' : 'public, max-age=31536000, immutable',
    'X-Content-Type-Options': 'nosniff',
  };
  if (isVideo) {
    headers['Content-Disposition'] = 'inline';
  }
  res.writeHead(200, headers);
  fs.createReadStream(filePath, { highWaterMark: 65536 })
    .on('error', () => { if (!res.headersSent) sendError(res, 500, 'Stream Error'); })
    .pipe(res);
}

const server = http.createServer((req, res) => {
  let rawPath = decodeURIComponent(req.url.split('?')[0]);
  let relativePath = rawPath.replace(/^\/+/, '');
  if (!relativePath || relativePath === '.') {
    relativePath = 'index.html';
  }

  let filePath = path.join(__dirname, relativePath);
  let ext = path.extname(filePath).toLowerCase();

  if (!ext) {
    const htmlFile = `${filePath}.html`;
    const indexFile = path.join(filePath, 'index.html');
    if (fs.existsSync(htmlFile)) {
      filePath = htmlFile;
      ext = '.html';
    } else if (fs.existsSync(indexFile)) {
      filePath = indexFile;
      ext = '.html';
    }
  }

  // Fix double extensions (.mp4.MOV, .mov.mov, .mp4.mp4 — Windows appends extra ext)
  const baseName = path.basename(filePath).toLowerCase();
  const doubleMatch = baseName.match(/\.(mp4|mov|webm|ogg)\.(mp4|mov|webm|ogg)$/);
  if (doubleMatch) ext = '.' + doubleMatch[1];
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const isVideo = VIDEO_EXTS.has(ext);

  if (req.method === 'OPTIONS') {
    setCrossOrigin(res);
    res.writeHead(204);
    return res.end();
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') return sendError(res, 404, '404 - Not Found');
      return sendError(res, 500, `Server Error: ${err.code}`);
    }
    if (stats.isDirectory()) {
      const indexFile = path.join(filePath, 'index.html');
      return fs.stat(indexFile, (indexErr, indexStats) => {
        if (indexErr) {
          if (indexErr.code === 'ENOENT') return sendError(res, 404, '404 - Not Found');
          return sendError(res, 500, `Server Error: ${indexErr.code}`);
        }
        return sendFile(res, indexFile, indexStats, MIME_TYPES['.html'], false);
      });
    }

    const range = req.headers.range;
    if (range && isVideo) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      if (isNaN(start) || start >= stats.size || end >= stats.size || start > end) {
        setCrossOrigin(res);
        res.writeHead(416, {
          'Content-Range': `bytes */${stats.size}`,
          'Access-Control-Allow-Origin': '*',
        });
        return res.end();
      }
      return sendFile(res, filePath, stats, contentType, isVideo, start, end);
    }

    sendFile(res, filePath, stats, contentType, isVideo);
  });
});

server.listen(PORT, () => {
  console.log(`✓ Server running at http://localhost:${PORT}/`);
  console.log(`✓ Range Requests (206 Partial Content) enabled for videos`);
  console.log(`✓ CORS enabled for all origins`);
});
