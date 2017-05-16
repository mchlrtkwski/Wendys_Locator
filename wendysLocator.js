//Obtain location data from user
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

//intiate variables
var map;
var service;
var infowindow;

function showPosition(position) {

  var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

//Display Map
  map = new google.maps.Map(document.getElementById('map'), {
      center: currentLocation,
      zoom: 15
    });

//Mark Users Location
  var markerOptions = {
    position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
  };
  var marker = new google.maps.Marker(markerOptions);
  marker.setMap(map);


  //Specify Request Information
    var request = {
      location: currentLocation,
      radius: '10000',
      name: ['Wendys']
    };

  //Call Google Places API for Locations
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);


//Create Markers for each location
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          //Icon that I placed on imgur
          icon: "http://i.imgur.com/3yWFN5R.png"
        });
      }
}
