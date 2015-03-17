// downloads heat/hot water complaints data from NYC open data
require('date-utils');
var fs = require('fs');
var request = require('request');

var start_date = process.argv[2] || '2014-10-01';

download_days_since(start_date);

function download_days_since(date) {
    var date_array = days_since(date);

    date_array.forEach(function(day){
        download_complaints(day, function(){
            console.log(day + " is downloaded");
        })
    })
}

// string -> [string]
// returns array of dates in 'YYYY-MM-DD' from a certain date until today. 
function days_since(date) {
    var date_array = [];    
    var start = new Date(date);
    var today = Date.today();
    var days = start.getDaysBetween(today);

    for (var i = 1; i < days; i++) {
        var date = new Date(start.getFullYear(), start.getMonth(), (start.getDate() + i))

        date_array.push(date.toFormat('YYYY-MM-DD'));
    }   

    return date_array;
}

// input: 'YYYY-MM-DD' -> callback (arr of complaints)
// output: callback (arr of complaints)
// downloads complaints, writes them to file
function download_complaints(date, callback) {

    var url_path = "https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=unique_key, created_date, closed_date, descriptor, incident_zip, incident_address, city, borough, status, latitude, longitude &$WHERE=agency='HPD' AND created_date = " 
        url_path += "'" + date + "T00:00:00' AND complaint_type = 'HEAT/HOT WATER' &$order=created_date DESC &$limit=50000";
    var file_path = './data/json/' + date + '.txt';
    
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