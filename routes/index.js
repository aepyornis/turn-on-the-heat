var express = require('express');
var router = express.Router();
var utils = require('../utils');

var counts;
utils.count_dictionary(function(obj){
  counts = obj;
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', counts);
});

router.get('/complaints', function(req,res,next){
  res.writeHead(200, {"Content-Type": "application/json"});
  res.send(JSON.strinigfy(complaints));
});

module.exports = router;
