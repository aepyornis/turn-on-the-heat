var request = require('request');
var fs = require('fs');
var Q = require('q');


// input: 'YYYY-MM-DD' -> callback (arr of complaints)
// output: callback (arr of complaints)
// downloads complaints, writes them to file
function download_complaints(date, callback) {

    var url_path = "https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=unique_key, created_date, closed_date, descriptor, incident_zip, incident_address, city, borough, status, latitude, longitude &$WHERE=agency='HPD' AND created_date >= " 
        url_path += "'" + date + "' AND complaint_type = 'HEAT/HOT WATER' &$order=created_date DESC &$limit=10000";
    var file_path = './data/' + date + '.txt';
    
    // streams
    var writeStream = fs.createWriteStream(file_path);
    var requestStream = request(encodeURI(url_path));

    var string_data = '';
    
    requestStream.pipe(writeStream);

    requestStream.on('data', function(data){
        string_data += data.toString();
    })

    requestStream.on('end', function(){
        var arr = JSON.parse(string_data);
        callback(arr);
    })

}

// date (str) -> promise of a number
// returns number of complaints from certain day
function count_complaints(date){
    var defer = Q.defer();
    var url_path = "https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=count(*)&$WHERE=agency='HPD' AND created_date >= '" + date + "' AND complaint_type = 'HEAT/HOT WATER'";

    request(url_path, function(err, response, body){
        if (err) {
            defer.reject(err);
        } else {
            var arr = JSON.parse(body);
            defer.resolve(arr[0].count);
        }
    })
    return defer.promise;
}

// -> callback with counts object
function count_dictionary(callback) {
  var counts = {
    yesterday: null,
    thisWeek: null,
    winter: null
  }
  var yesterday = count_complaints(Date.yesterday().toFormat('YYYY-MM-DD'))
    .then(function(val){
      counts.yesterday = val;
    });

  var thisWeek = count_complaints(Date.today().removeDays(7).toFormat('YYYY-MM-DD'))
    .then(function(val){
      counts.thisWeek = val;
    });

  var winter = count_complaints('2014-10-01')
    .then(function(val){
      counts.winter = val;
    });

  Q.all([yesterday, thisWeek, winter]).then(function yes(){
    callback(counts);
  }, function no(){
    throw new Error('count_compaints() error');
  })

}

module.exports = {
    'download_complaints': download_complaints,
    'count_dictionary': count_dictionary
}