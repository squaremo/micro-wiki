module.exports.client = function(url) {
  return new Client(url);
}

function Client(url) {
  this.url = url;
}

Client.prototype.getPage = function(name) {
}

Client.prototype.savePage = function(name, content) {
}
