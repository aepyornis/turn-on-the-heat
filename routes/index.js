var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/complaints', function(req,res,next){
  res.writeHead(200, {"Content-Type": "application/json"});
  res.send(JSON.strinigfy(complaints));
});

module.exports = router;
