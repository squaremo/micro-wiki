var http = require('http');
var urlparse = require('url').parse;
var qsparse = require('querystring').parse;

var srv = http.createServer(handle);
srv.listen(process.env['HTTP_PORT']);

var pages = {};

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
  var content = pages[name];
  if (content !== undefined) {
    res.writeHeader(200);
    writePage(res, name, content);
  }
  else {
    res.writeHeader(404);
    writePage(res, 'Not found sorry', '');
  }
}

function handlePost(name, req, res) {
  readAll(req, function(buf) {
    var form = qsparse(buf.toString('utf8'));
    pages[name] = form.content;
    res.writeHeader(303, {'Location': '/'+name});
    res.end();
  });
}

function writePage(res, name, content) {
  res.write('<h1>' + name + '</h1>');
  res.write(content, 'utf8');
  res.write('<form method="POST"><textarea name="content"></textarea><input type="submit"/></form>');
  res.end();
}

function readAll(s, k) {
  var bufs = [];
  s.on('data', function(b) { bufs.push(b); });
  s.on('end', function() { k(Buffer.concat(bufs)); });
}
