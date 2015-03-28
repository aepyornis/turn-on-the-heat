var _ = require('underscore');

// the data
// [[ID, 'date','closed', 'address',zip,long, lat, bbl]]
var complaints = [ [29100480,'2014-10-20T00:00:00','Closed','907 EAST 173 STREET',10460,-73.88930506860214,40.835912164819746,2029780205],
  [29099259,'2014-10-20T00:00:00','Closed','2264 85 STREET',11214,-73.99185421524078,40.60170816662655,3063480032],
  [29099917,'2014-10-20T00:00:00','Closed','1510 JESUP AVENUE',10452,-73.91893988017213,40.84360003088166,2028720287],
  [39099259,'2014-10-21T00:00:00','Closed','2264 85 STREET',11214,-73.99185421524078,40.60170816662655,3063480032],
  [39100480,'2014-10-21T00:00:00','Closed','907 EAST 173 STREET',10460,-73.88930506860214,40.835912164819746,2029780205],
  [49100480,'2014-10-22T00:00:00','Closed','907 EAST 173 STREET',10460,-73.88930506860214,40.835912164819746,2029780205] 
]

// [["ownername","ownerbusinessname","latestactiondate","bbl"]]
var dobjobs = [
  ["ANTHONY E FLOWERS","XYZ","2010-01-13","2029780205"],
  ["ANDREW GORMALLY","GORMENT LLC","2010-01-27","2039860007"],
  ["FRED MMEYROW","N/A","2010-01-04","2028720287"],
  ["FRANK CAPUTO","NA","2010-01-30","3003710039"],
  ["NEW","some stupid company","2011-03-01","2028720287"]
];

// [["cd","bldgclass","ownername","numfloords","unitsres","yearbuilt","bbl"]]
var pluto = [ 
  ["302","V1","OWNER A","0","2","0","2029780205"],
  ["302","D7","OWNER B","12","42","2014","3063480032"],
  ["302","E9","OWNER C","9","4","1920","2028720287"],
  ["302","U4","OWNER D","0","5","0","3049670040"]
];

// -> [[Address, bbl, count, jobsOwner, jobsBis, jobDate, plutoOwner, unitsRes]]
function join () {
   return  _.map(total_complaints(complaints), function(val, i, list) {
      var complaint = val;
      var bbl = complaint[1];
      complaint = complaint.concat(recentJob(bbl).slice(0, 3))
      complaint = complaint.concat(get_pluto_data(bbl));
      return complaint;
    })
}

// string -> ['plutoOwner', 'units res']
function get_pluto_data(bbl) {
  var taxlot = _.find(pluto, {'6': bbl})
  return [ taxlot[2], taxlot[4] ];
}

// string -> []
// get most recent based on a bbl
function recentJob(bbl) {
  if (_.isEmpty(dob_match(bbl))) {
    return [null, null, null, null];
  } else {
    return _.sortBy(dob_match(bbl), '2').reverse()[0];
  }
}

// string -> [[]] 
// gets all jobs for a given bbl,
function dob_match(bbl) {
    return _.where(dobjobs, {'3': bbl});
}

// Sorted buildings with must number of complaints:
// [] -> ['address', 'bbl', count]
// counts total complaints, consolidates, and adds total_complaints to end
function total_complaints(complaints) {
  var dict = count_dictionary(complaints);

  var arr_with_counts = []; 
  _.each(dict, function (count, bbl) {
    arr_with_counts.push([get_address(bbl), bbl, count]);
  })

  return _.sortBy(arr_with_counts, function(arr) { return arr[2]; }).reverse();

  function get_address(bbl) {
    return _.find(complaints, function(c){
      if (c[7] == bbl) {
        return true;
      } else {
        return false;
      }
    })[3]
  }
}

// [] -> {}
// returns json in format { 'bbl': count}
// production a 'dictionary' with the number of times each complaint appears in the dataset
function count_dictionary(complaints) {
  var dict = {};
  _.each(complaints, function(c){
      if (typeof dict[c[7]] == 'undefined') {
        dict[c[7]] = 1;
      } else {
        dict[c[7]] = dict[c[7]] + 1;
      }
    })
  return dict; 
}

module.exports = {

  count_dictionary: count_dictionary,
  total_complaints: total_complaints,
  join: join

}