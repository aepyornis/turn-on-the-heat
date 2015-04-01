//create map
var map = L.map('map', {
  center: [40.716065, -73.930243],
  zoom: 11,
  minZoom: 10,
  maxZoom: 15,
  attributionControl: false
})

// open street map layer
var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a>',
    opacity: 0.6
});

//heat complaints layer
var heat = L.tileLayer('http://elephant-bird.net/tiles/heat/{z}/{x}/{y}.png', {minZoom: 10, maxZoom: 15});

// utfgrid with heat data
var heatGrid = new L.UtfGrid('http://elephant-bird.net/tiles/heat/{z}/{x}/{y}.json?callback={cb}', {});

// hack to change pointer
heatGrid.on('click', function (e) {}); 

heatGrid.on('mouseover', function (e) {
     var hoverText = '<p>Complaints: ' + e.data.total_comp + '<br>' + 'Address: ' + e.data.address + '</p>';
     $('#hover-text').html(hoverText)
});
heatGrid.on('mouseout', function (e) {
      $('#hover-text').html('<p>Hover over a dot</p>')
});

// 
$(document).ready(function() {
    map.addLayer(osm)
    map.addLayer(heat)
    $('#hover-text').html('<p>Zoom in to get details</p>')
    map.on('zoomstart', function(e){ limit_zoom(); })
    datatable();
    
});

function limit_zoom() {
  if (map.getZoom() >= 12 && !map.hasLayer(heatGrid)) {
    map.addLayer(heatGrid);
    $('#hover-text').html('<p>Hover over a dot</p>')
  } else if (map.getZoom() < 12 && map.hasLayer(heatGrid)) {
    map.removeLayer(heatGrid);
    $('#hover-text').html('<p>Zoom in to hover</p>')
  }
}

function datatable() {
  //create table html
  $('#complaints-table').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="complaints"></table>' );
  // add classes for bootstrap style
  $('#complaints').addClass("table table-striped table-condensed table-hover")
  //do the datatable magic
  $('#complaints').DataTable({
    data: top_100,
    "order": [[ 0, "desc" ]],
    columns: [
        { 
        "data": "total_complaints",
        "title": 'Total Complaints'
        },
        { 
          "data": "address",
          "title": "Address"
        },
        { 
          "data": "pluto_owner" ,
          "title": "Owner Name (Pluto)"
        },
        { 
          "data": "jobs_owner",
          "title": "Owner (DOB)" 
        },
        { 
          "data": "jobs_business",
          "title": "Owner's Business (DOB)"

        },
        { 
          "data": "jobs_date",
          "title": "DOB Source date"
        },
        { 
          "data": "units_res",
          "title": "Residential Units"
        }
    ]
  });
}
