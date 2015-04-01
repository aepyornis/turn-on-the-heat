var express = require('express');
var router = express.Router();
var utils = require('../utils');

/* GET home page. */
router.get('/table', function(req, res, next) {
  res.render('table');
});


module.exports = router;
