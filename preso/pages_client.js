var http = require('http');
var readAll = require('us').readAll;
var prom = require('./prom');

var client_counter = prom.newCounter({
  namespace: 'microwiki',
  name: 'http_client',
  help: 'Service requests',
  labels: {service: 'pages', client: 'preso'}
});

var PAGES_SVC = process.env['PAGES_SVC'] || 'pages';

function getPage(name, k) {
  http.request({host: PAGES_SVC, path: '/' + name}, function(res) {
    switch (res.statusCode) {
    case 200:
      client_counter.increment({operation: 'getPage', result: 'ok'});
      readAll(res, k);
      return;
    case 404:
      client_counter.increment({operation: 'getPage', result: 'notfound'});
      k(null, undefined);
      return;
    default:
      client_counter.increment({operation: 'getPage', result: 'error'});
      k(new Error('Unexpected response ' + res.StatusCode));
      return;
    }
  }).end();
}

function savePage(name, content, k) {
  var req = http.request({host: PAGES_SVC,
                          path: '/' + name,
                          method: 'POST'});
  req.setHeader('Content-Length', content.length);
  req.on('response', function(res) {
    switch (res.statusCode) {
    case 204:
      client_counter.increment({operation: 'savePage', result: 'ok'});
      k(null);
      return;
    default:
      client_counter.increment({operation: 'savePage', result: 'error'});
      k(new Error('Unexpected response: ' + res.statusCode));
      return;
    }
  });
  req.end(content);
}

module.exports.getPage = getPage;
module.exports.savePage = savePage;
