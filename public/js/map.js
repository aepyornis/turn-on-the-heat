//create map
var map = L.map('map', {
  center: [40.716065, -73.930243],
  zoom: 11,
  minZoom: 10,
  maxZoom: 15
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

heatGrid.on('click', function (e) {
     console.log('click')
}); 

heatGrid.on('mouseover', function (e) {
     console.log('mouse')
});
heatGrid.on('mouseout', function (e) {
      
});


map.addLayer(osm)
map.addLayer(heat)
map.on('zoomstart', function(e){
  limit_zoom();
})

function limit_zoom() {
  if (map.getZoom() >= 12 && !map.hasLayer(heatGrid)) {
    map.addLayer(heatGrid);
  } else if (map.getZoom() < 12 && map.hasLayer(heatGrid)) {
    map.removeLayer(heatGrid);
  }
}
