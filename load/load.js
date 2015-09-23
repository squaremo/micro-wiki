var http = require('http');

var requests = 0;
var REQUESTS = 10;
var total = 0, errors = 0;

function reqs() {
  while (requests < REQUESTS) {
    newRequest()
  }
}

function requestFinished() {
  requests--;
  total++; report();
  setImmediate(reqs);
}

function report() {
  if ((total % 100) === 0) {
    console.log('%d requests completed (%d errors)', total, errors);
  }
}

function newRequest() {
  var req = http.get({host: 'preso.weave.local',
                      agent: false});
  requests++;
  req.on('response', requestFinished);
  req.on('error', function(err) {
    console.error(err);
    errors++;
    requestFinished();
  });
}

reqs();
