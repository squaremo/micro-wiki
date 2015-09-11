var http = require('http');
var urlparse = require('url').parse;

var db = require('./db');
var readAll = require('../us').readAll;

var server = http.createServer(handle);
server.listen(process.env['HTTP_PORT']);

function pageName(req) {
    var parts = urlparse(req.url);
    return parts.pathname.substr(1);
}

function handle(req, res) {
  if (req.method == 'POST') {
    readAll(req, function(err, content) {
      if (err !== null) {
        return malformed(res, err);
      }
      db.savePage(pageName(req), content);
      res.writeHeader(204);
      res.end();
      return;
    });
  }
  else if (req.method == 'GET') {
    var content = db.getPage(pageName(req));
    if (content == undefined) {
      return notfound(res);
    }
    return found(res, content);
  }
  else {
    res.writeHeader(405);
    res.end('Nope.');
  }
}

function malformed(res, msg) {
  res.writeHeader(400);
  res.end('Malformed request: ' + msg);
  return;
}

function notfound(res) {
  res.writeHeader(404);
  res.end('Not found.');
  return;
}

function found(res, content) {
  res.writeHeader(200);
  res.end(content);
}
