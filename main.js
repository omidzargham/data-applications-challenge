var myMap = L.map('map').setView([39.8283, -98.5795], 5);

const mapBoxToken = "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapBoxToken, {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  id: 'mapbox.streets'
}).addTo(myMap);

const baseurl = 'https://api.voltaapi.com/v1/'
var greenOrRed;

var theData = fetch(baseurl + 'stations')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    for (var i = 0; i < myJson.length; i++) {
      currentElem = myJson[i];
      if (currentElem.status === "active") {
        greenOrRed = "green";
      } else if (currentElem.status === "needs service") {
          greenOrRed = "red";
        }
        
        L.circleMarker([currentElem.location.coordinates[1], currentElem.location.coordinates[0]], {
          color: greenOrRed,
          fillColor: greenOrRed,
          fillOpacity: .3,
          radius: 6
        }).addTo(myMap).bindPopup("<center>" + currentElem.name 
        + "<br>" + "Station ID: " + currentElem.id + "</center>");
    }
  });

var legend = L.control({position: 'bottomright'});

legend.onAdd = function() {
  var div = L.DomUtil.create('div', 'info legend');
  var keyName = ["Active", "Needs Service"];
  var labels = ["green", "red"];

  for (var i = 0; i < keyName.length; i++) {
    div.innerHTML += '<i style="background:' + labels[i] + '"></i> ' + keyName[i] + '<br>';
  }

  return div;
};

legend.addTo(myMap);
