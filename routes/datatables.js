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
  pg.defaults.database = (process.env.OPENSHIFT_POSTGRESQL_DB_HOST) ? 'turnontheheat' : 'heat311';
  pg.defaults.host = process.env.OPENSHIFT_POSTGRESQL_DB_HOST || 'localhost';
  pg.defaults.user = process.env.OPENSHIFT_POSTGRESQL_DB_USERNAME || 'mrbuttons';
  pg.defaults.password = process.env.OPENSHIFT_POSTGRESQL_DB_PASSWORD || 'mrbuttons';
  if (process.env.OPENSHIFT_POSTGRESQL_DB_PORT) { pg.defaults.port = process.env.OPENSHIFT_POSTGRESQL_DB_PORT }

/* GET home page. */

router.get('/datatables', function(req, res, next){
  //create response object
  var response = {};
  response.draw = req.query.draw;
  // total number of records in database.
  response.recordsTotal = '35637';
  
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
          def.resolve(stylize_result(result.rows));
          done();
        })
      }
  })
  return def.promise;
}

// [] -> []
// stylizes the result from postgres, 
function stylize_result(rows) {

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
    titleize('jobs_owner');
    filter_out_good_guys(row.jobs_business);
    return newRow;

    function filter_out_good_guys(bis) {
      if (/deli|EQUIPMENT LEASING|GROCERY/gi.test(bis)) {
        newRow.jobs_owner = '';
        newRow.jobs_date = '';
        newRow.jobs_business = '';
      } 
    }

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

  query.from('super_complaints')
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
    .from('super_complaints')
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



