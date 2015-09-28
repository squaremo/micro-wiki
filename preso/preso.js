var http = require('http');
var urlparse = require('url').parse;
var qsparse = require('querystring').parse;

var readAll = require('us').readAll;

var pages = require('./pages_client');
var prom = require('./prom');

var VERSION = require('./package.json').version;

var srv = http.createServer(handle);
srv.listen(process.env['HTTP_PORT']);

var counter = prom.newCounter({
  namespace: 'microwiki',
  name: 'http_requests',
  help: 'Front-end HTTP server request counter',
});

function count(obj) {
  counter.increment({
    method: obj.method,
    status: obj.status,
    service: 'preso',
    version: VERSION,
    service_instance: process.env['INSTANCE'] || 'preso'
  });
}

function handle(req, res) {
  var parts = urlparse(req.url);
  var name = parts.pathname.substr(1);

  if (req.method == "GET") {
    handleGet(name, req, res);
  }
  else if (req.method == "POST") {
    handlePost(name, req, res);
  }
}

function handleGet(name, req, res) {
  pages.getPage(name, function(err, content) {
    if (err !== null) {
      res.writeHeader(500);
      res.end('Begging your pardon, there seems to be a problem.');
      count({method: 'GET', status: 500});
    }
    else if (content) {
      res.writeHeader(200);
      outputPage(res, name, content);
      count({method: 'GET', status: 200});
    }
    else {
      res.writeHeader(404);
      outputPage(res, 'Not found sorry', '');
      count({method: 'GET', status: 404});
    }
  });
}

function handlePost(name, req, res) {
  readAll(req, function(err, buf) {
    if (err !== null) {
      res.writeHeader(400);
      res.end('Something wrong with the request');
      count({method: 'POST', status: 400});
    }
    var form = qsparse(buf.toString('utf8'));
    pages.savePage(name, form.content, function(err) {
      if (err !== null) {
        res.writeHeader(500);
        res.end('Problem while saving the page: ' + err.toString());
        count({method: 'POST', status: 500});
      }
      else {
        res.writeHeader(303, {'Location': '/'+name});
        res.end('Success! Now go to /' + name);
        count({method: 'POST', status: 303});
      }
    });
  });
}

function outputPage(res, name, content) {
  res.write('<h1>' + name + '</h1>');
  res.write(content, 'utf8');
  res.write('<hr/>');
  res.write('<form method="POST"><textarea name="content">' +
            content +
            '</textarea><input type="submit"/></form>');
  res.end();
}
