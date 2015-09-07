var http = require('http');

var srv = http.createServer(handle);
srv.listen(os.ENV['HTTP_PORT']);

function handle(req, res) {
    res.writeHeader();
    res.end();
}
