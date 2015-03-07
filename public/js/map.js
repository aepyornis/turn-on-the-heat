var map = L.map('map', {
  center: [40.716065, -73.930243],
  zoom: 12
})

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

complaints.forEach(add_circle_to_map);

function add_circle_to_map(complaint) {
  if (complaint.latitude && complaint.latitude) {
    var lat_lng = [complaint.latitude, complaint.longitude];
    var path_options = {
      radius: 5
    }
    L.circleMarker(lat_lng, path_options).addTo(map);
  }
}

