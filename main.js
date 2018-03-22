var mymap = L.map('map').setView([39.8283, -98.5795], 5);

const mapBoxToken = "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapBoxToken, {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  id: 'mapbox.streets'
}).addTo(mymap);

var baseurl = 'https://api.voltaapi.com/v1/'
var greenOrRed = "green";

var theData = fetch(baseurl + 'stations')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson)
    for (var i=0; i < myJson.length; i++) {
      if (myJson[i].status === "active") {
        greenOrRed = "green";
      } else if (myJson[i].status === "needs service") {
          greenOrRed = "red";
        }
        
        L.circleMarker([myJson[i].location.coordinates[1], myJson[i].location.coordinates[0]], {
          color: greenOrRed,
          fillColor: greenOrRed,
          fillOpacity: .3,
          radius: 6
        }).addTo(mymap).bindPopup("<center>" + myJson[i].name 
        + "<br>" + "Station ID: " + myJson[i].id + "</center>");
    }
  });
