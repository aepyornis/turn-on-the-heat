var request = require('request');
var fs = require('fs');
require('date-utils');

// Get yesterday's complaints -> count them -> update json -> 
// write complaints to file

// update map. 

get_yesterdays_complaints();

function get_yesterdays_complaints() {

    var url_path = "https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=unique_key, created_date, closed_date, descriptor, incident_zip, incident_address, city, borough, status, latitude, longitude &$WHERE=agency='HPD' AND created_date >= " 
        url_path += "'" + Date.yesterday().toFormat('YYYY-MM-DD') + "T00:00:00' AND complaint_type = 'HEAT/HOT WATER' &$order=created_date DESC &$limit=10000";
    
    var file_path = Date.yesterday().toFormat('YYYY-MM-DD') + '.json';
    var writeStream = fs.createWriteStream(file_path);

    request(encodeURI(url_path))
        .on('response', function(response){
            console.log('status code:' + response.statusCode)
        })
        .on('data', function(data){
            // console.log(data.toString());
        })
        .pipe(writeStream);
}

function write_complaints_file() {

}

function count_comlaints() {

}

function update_json () {

}













