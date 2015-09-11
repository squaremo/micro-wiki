var pages = {};

function getPage(name) {
  return pages[name];
}

function savePage(name, content) {
  pages[name] = content;
}

module.exports.getPage = getPage;
module.exports.savePage = savePage;
