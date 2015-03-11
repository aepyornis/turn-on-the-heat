var fs = require('fs');
var express = require('express');
var download_complaints = require('./download_complaints');
require('date-utils');

var app = express();

var complaints;

load_complaints('2015-03-09');

app.use('/complaints', function(req,res,next){
  res.writeHead(200, {"Content-Type": "application/json"});
  res.send(JSON.strinigfy(complaints));
})

// serve static files from public folder
app.use(serveStatic(__dirname + '/public'));
//start server
app.listen(8080);

// date
function load_complaints(yesterday) {
  fs.readFile((yesterday + '.txt'), function(err, data) {
      if (err) {
          console.log('no file...starting to download')
          download_complaints(Date.yesterday().toFormat('YYYY-MM-DD'), function(arr){
              complaints = arr; 
          })
      } else {
          console.log('already downloaded these');
          complaints = JSON.parse(data);
      }
  })
}

// Date.yesterday().toFormat('YYYY-MM-DD')