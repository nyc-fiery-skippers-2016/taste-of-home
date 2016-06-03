function initMap() {
  var pos = {
        lat: 0,
        lng: 0
      };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos.lat = position.coords.latitude;
      pos.lng = position.coords.longitude;
      setMap(pos);
    });
  }else{
    setMap(pos);
  }
}

function setMap(pos){
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: pos
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('search');
  var searchBox = new google.maps.places.SearchBox(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    // Create infoWindow for each search result
    for(var i = 0; i < markers.length; i++){
      // If this is not in a function, i will be markers.length
      addClickListener(markers[i], i);
    }

    map.fitBounds(bounds);
  });

}

function addClickListener(marker){
  marker.addListener('click', function() {
    debugger;
    var content = "<b>"+marker.title+"</b><br>";
    new google.maps.InfoWindow({
      content: content
    }).open(map, marker);
  });
}
