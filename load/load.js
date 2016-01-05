var http = require('http');

var total = 0, errors = 0;

var agent = new http.Agent({maxSockets: 10});
var QPS = 10;

var host = process.argv[2] || 'localhost';
var port = process.argv[3] || 8000;

function requestFinished(res) {
  if (res && res.statusCode != 200) {
    errors++;
  }
  // drain the data, so that the connection is closed
  if (res) res.on('data', function() {});
  total++; report();
}

function report() {
  if ((total % 100) === 0) {
    console.log('%d requests completed (%d errors)', total, errors);
  }
}

function newRequest() {
    var req = http.get({host: host,
                        port: port,
                        agent: agent});
  req.on('response', requestFinished);
  req.on('error', function(err) {
    console.error(err);
    requestFinished();
  });
  // req.setTimeout(5000, function() {
  //   console.error('Request timed out');
  //   requestFinished(new Error('timed out'));
  // });
}

setInterval(newRequest, 1000 / QPS);
