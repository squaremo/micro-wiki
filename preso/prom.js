var Prom = require('prometheus-client');

module.exports = new Prom();
module.exports.listen(process.env['PROM_PORT']);
