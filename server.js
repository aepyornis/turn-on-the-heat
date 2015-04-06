var fs = require('fs');
var express = require('express');
var path = require('path');
var utils = require('./utils');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// routes
var router = require('./routes/index');
var table_draw = require('./routes/datatables')
app.use('/', router);
app.use('/', table_draw);

var server_port = process.env.OPENSHIFT_NODEJS_PORT || '3000';
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || 'localhost';

var server = app.listen(server_port, server_ip_address, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at http://%s:%s', host, port)
})

