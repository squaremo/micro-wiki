var http = require('http');
var urlparse = require('url').parse;

var readAll = require('us').readAll;
var Prom = require('prometheus-client');

var db = require('./db');

var server = http.createServer(handle);
server.listen(process.env['HTTP_PORT']);

var prom = new Prom();
var count = prom.newCounter({
  namespace: 'microwiki',
  name: 'http_service_requests',
  help: 'Request to service',
  labels: {service: 'pages'},
});

prom.listen(process.env['PROM_PORT']);

function log(req) {
  var len = (req.headers['content-length'] || 0);
  console.log('HTTP %s %s (%d bytes)', req.method, req.url, len);
}

function pageName(req) {
    var parts = urlparse(req.url);
    return parts.pathname.substr(1);
}

function handle(req, res) {
  log(req);
  if (req.method == 'POST') {
    readAll(req, function(err, content) {
      if (err !== null) {
        res.writeHeader(500);
        res.end('Error reading content: ' + err);
        count.increment({status: 500});
        return;
      }
      db.savePage(pageName(req), content);
      console.log('Saved %d bytes to "%s"', content.length, pageName(req));
      res.writeHeader(204);
      res.end();
      count.increment({
        status: 204,
      });
      return;
    });
  }
  else if (req.method == 'GET') {
    var content = db.getPage(pageName(req));
    if (content === undefined) {
      return notfound(res);
    }
    return found(res, content);
  }
  else {
    res.writeHeader(405);
    res.end('Nope.');
    count.increment({
      status: 405,
    });
  }
}

function malformed(res, msg) {
  res.writeHeader(400);
  res.end('Malformed request: ' + msg);
  count.increment({
    status: 400,
  });
}

function notfound(res) {
  res.writeHeader(404);
  res.end('Not found.');
  count.increment({
    status: 404,
  });
}

function found(res, content) {
  res.writeHeader(200);
  res.end(content);
  count.increment({
    status: 200,
  });
}
