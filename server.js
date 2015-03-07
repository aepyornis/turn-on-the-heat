var connect = require('connect');
var serveStatic = require('serve-static');

// serve static files from public folder
connect().use(serveStatic(__dirname + '/public')).listen(8080);
