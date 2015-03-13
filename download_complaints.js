var request = require('request');
var fs = require('fs');

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

module.exports = download_complaints;