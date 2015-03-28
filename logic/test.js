var should = require('should');
var queries = require('./javascript');
// excepted outcomes 
// In order complaints should be: 2029780205: 3, 3063480032: 2, 2028720287: 1
// All join should from dobjobs except for 3063480032
// Should get most recent dobjobs for 2028720287 -> ["NEW","N/A","2011-03-01","2028720287"]
// all should join from pluto 

var complaints = [ [29100480,'2014-10-20T00:00:00','Closed','907 EAST 173 STREET',10460,-73.88930506860214,40.835912164819746,2029780205],
[29099259,'2014-10-20T00:00:00','Closed','2264 85 STREET',11214,-73.99185421524078,40.60170816662655,3063480032],
[29099917,'2014-10-20T00:00:00','Closed','1510 JESUP AVENUE',10452,-73.91893988017213,40.84360003088166,2028720287],
[39099259,'2014-10-21T00:00:00','Closed','2264 85 STREET',11214,-73.99185421524078,40.60170816662655,3063480032],
[39100480,'2014-10-21T00:00:00','Closed','907 EAST 173 STREET',10460,-73.88930506860214,40.835912164819746,2029780205],
[49100480,'2014-10-22T00:00:00','Closed','907 EAST 173 STREET',10460,-73.88930506860214,40.835912164819746,2029780205] ]

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

// excepted outcomes 
// In order complaints should be: 2029780205: 3, 3063480032: 2, 2028720287: 1
// All join from dobjobs except for 3063480032
// Should get most recent dobjobs for 2028720287 -> ["NEW","N/A","2011-03-01","2028720287"]
// all join from pluto 

describe('count_dictionary', function(){

  it('works with simple example', function(){
    var complaints = [[29100480,'2014-10-20T00:00:00','Closed','907 EAST 173 STREET',10460,-73.88930506860214,40.835912164819746, 111], [29099259,'2014-10-20T00:00:00','Closed','2264 85 STREET',11214,-73.99185421524078,40.60170816662655, 222], [29099917,'2014-10-20T00:00:00','Closed','1510 JESUP AVENUE',10452,-73.91893988017213,40.84360003088166, 111]];
    var result = {
      '111': 2,
      '222': 1
    }; 
    var count_dictionary = queries.count_dictionary(complaints);

    count_dictionary.should.eql(result);

  })

})  

describe('total_complaints', function(){

  it('produces correct array', function(){
    var result = [ 
      ['907 EAST 173 STREET', '2029780205' , 3],
      ['2264 85 STREET','3063480032', 2],
      ['1510 JESUP AVENUE','2028720287', 1] 
    ];

    queries.total_complaints(complaints).should.eql(result);
  })

})

describe('join', function(){

  it('produces correct array', function(){
    // Address, bbl, count, jobsOwner, jobsBis, jobDate, plutoOwner, unitsRes]
     var result = [ 
      ['907 EAST 173 STREET', '2029780205' , 3, 'ANTHONY E FLOWERS', 'XYZ', '2010-01-13', 'OWNER A', '2'],
      ['2264 85 STREET','3063480032', 2, null, null, null, 'OWNER B', '42'],
      ['1510 JESUP AVENUE','2028720287', 1, 'NEW', 'some stupid company', '2011-03-01', 'OWNER C', '4'] 
    ];

    queries.join().should.eql(result);
  })


})