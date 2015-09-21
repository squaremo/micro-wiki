module.exports.readAll = function(stream, k) {
  var bs = [];
  stream.on('data', function(b) { bs.push(b); });
  stream.on('end', function() { k(null, Buffer.concat(bs)) });
  stream.on('error', function(err) { k(err); });
};
