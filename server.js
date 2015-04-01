var fs = require('fs');
var express = require('express');
var path = require('path');
var utils = require('./utils');
require('date-utils');
// load complaints 
// var complaints = load_complaints(Date.yesterday().toFormat('YYYY-MM-DD'));
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

//start server
app.listen(3000);
console.log('server started at localhost');

//  'YYYY-MM-DD' -> []
// downloads the complaints  or loads them from file
function load_complaints(date) {
  fs.readFile(('./data/json/' + date + '.txt'), function(err, data) {
      if (err) {
          console.log('no file...starting to download')
          utils.download_complaints(date, function(arr){
              return arr;
          })
      } else {
          console.log('already downloaded these');
          return JSON.parse(data);
      }
  })
}
