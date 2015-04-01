var express = require('express');
var router = express.Router();
var q = require('q');
var _ = require('underscore');
var s = require("underscore.string");
var squel = require('squel')
  squel.useFlavour('postgres');
  squel.mySelect = require('./selectNull'); 
  squel.count = require('./count_squel')
var pg = require('pg');
  pg.defaults.database = 'heat311';
  pg.defaults.host = 'localhost';
  pg.defaults.user = 'mrbuttons';
  pg.defaults.password = 'mrbuttons';

/* GET home page. */

router.get('/datatables', function(req, res, next){
  //create response object
  var response = {};
  response.draw = req.query.draw;
  // total number of records in database.
  response.recordsTotal = '34445';
  
  //create SQL query 
  var sql_query = sql_query_builder(req.query);
  var countQuery = sql_count_builder(req.query);

  var sql_promise = do_query(sql_query)
    .then(function(result){
      response.data = result; 
  })

  var count_promise = do_query(countQuery)
    .then(function(result){
      response.recordsFiltered = result[0].c;
  })

  q.all([count_promise, sql_promise])
    .then(function(){
      res.send(JSON.stringify(response));
  })
          
})

module.exports = router;

// query functions

function do_query(sql) {
  var def = q.defer();
  pg.connect(function(err, client, done){
    if (err) {
        def.reject(err);
        console.log(err);
    } else {
        client.query(sql, function(err, result){
          if (err) {
            def.reject(err);
            console.log(err);
          }
          def.resolve(psql_to_dt(result.rows));
          done();
        })
      }
  })
  return def.promise;
}

function psql_to_dt(rows) {

  return _.map(rows, function(row){
      return change_row(row);
  })

  function change_row(row) {
    var newRow = row;
    if (row.jobs_date) {
      var date = '' + row.jobs_date;
      newRow['jobs_date'] = date.slice(4,15);
    }
    titleize('address');
    titleize('pluto_owner');
    titleize('jobs_owner');
    titleize('jobs_business');
    return newRow;

      function titleize(columnName) {
        if (row[columnName]) {
            newRow[columnName] = s.titleize(row[columnName].toLowerCase());
          } else {
            return;
        }
      }
  }

  

}



// {dt request object} -> 'sql query'
function sql_query_builder(dt) {
  // sequel select object
  var query = squel.mySelect();

  query.from('complaints_by_building')
    .where( where_exp(dt) )

  // order dir
  if (!_.isEmpty(dt.order)) { 
      _.each(dt.order, function(order){

      var direction = (order.dir === "desc") ? false : true;
      query.order(dt.columns[order.column].data, direction)
        query.nullOrder('LAST');
    })
  }
  // limit and offset
  query.limit(dt.length).offset(dt.start);

  return query.toParam();
}


function sql_count_builder(dt) {
  // sequel select object
  return squel.count()
    .from('complaints_by_building')
    .where( where_exp(dt) )
    .toParam()
}

function where_exp(dt) {
    var x = squel.expr();

    var searchable_columns = _.chain(dt.columns).filter(function(column) {
     return (column.searchable === 'true') ? true : false 
    }).pluck('data').value();

    // do global search on searchable columns
    if (dt.search.value){
        _.each(searchable_columns, function(col) {
          global_search(col)
        });
    }

    return x;

    function global_search(columnData) {
      var sql = columnData + " LIKE ?";
      var value = "%" + dt.search.value.toUpperCase() + "%";
      x.or(sql, value);
  }
}



