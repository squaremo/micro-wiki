var Redis = require('ioredis');
var redis = new Redis({host: process.env['REDIS_SVC'],
                       port: 6379});
redis.on('ready', function() {
  console.log('Connected to Redis');
});
redis.on('error', function(err) {
  console.error(err);
  process.exit(1);
});

function getPage(name, k) {
  redis.get(name, k);
}

function savePage(name, content) {
  redis.set(name, content);
}

module.exports.getPage = getPage;
module.exports.savePage = savePage;
