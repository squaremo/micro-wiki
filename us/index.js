module.exports.readAll = function(stream, k) {
  var bs = [];
  stream.on('data', bs.push.bind(bs));
  stream.on('end', k.bind(null, null, Buffer.concat(bs)));
};
