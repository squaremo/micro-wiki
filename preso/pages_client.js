var http = require('http');
var readAll = require('us').readAll;
var prom = require('./prom');

var counter = prom.newCounter({
  namespace: 'microwiki',
  name: 'http_client',
  help: 'Service requests',
});

function count(obj) {
  counter.increment({
    operation: obj.operation,
    result: obj.result,
    service: 'pages',
    client: 'preso',
    client_instance: process.env['INSTANCE'] || 'preso'
  });
}

var PAGES_SVC = process.env['PAGES_SVC'] || 'pages';

function getPage(name, k) {
  http.request({host: PAGES_SVC, path: '/' + name}, function(res) {
    switch (res.statusCode) {
    case 200:
      count({operation: 'getPage', result: 'ok'});
      readAll(res, k);
      return;
    case 404:
      count({operation: 'getPage', result: 'notfound'});
      k(null, undefined);
      return;
    default:
      count({operation: 'getPage', result: 'error'});
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
      count({operation: 'savePage', result: 'ok'});
      k(null);
      return;
    default:
      count({operation: 'savePage', result: 'error'});
      k(new Error('Unexpected response: ' + res.statusCode));
      return;
    }
  });
  req.end(content);
}

module.exports.getPage = getPage;
module.exports.savePage = savePage;
