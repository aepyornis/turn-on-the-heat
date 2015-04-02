var express = require('express');
var router = express.Router();
var utils = require('../utils');


var counts;
set_counts();
// update the counts twice a day
setInterval(set_counts, 43200);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', counts);
});

router.get('/table', function(req, res, next) {
  res.render('table');
});


module.exports = router;


function set_counts() {
    utils.count_dictionary(function(obj){
        counts = obj;
    });
}
