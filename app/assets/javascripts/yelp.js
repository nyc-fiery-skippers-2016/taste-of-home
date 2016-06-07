// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

var markersArray = [];
var lastOpenedWindow;
var mapCreated = false;

$(document).ready(function() {
  // initialize the map on load
  if(!mapCreated && $('#map_canvas')[0] !== undefined){
    initialize(); //can happen twice and create more than one map.
    mapCreated = true;
  }
});

/**
 * Initializes the map and some events on page load
 */
var initialize = function() {
  // Define some options for the map
  var mapOptions = {
    center: new google.maps.LatLng(0, 0),
    zoom: 1,

    // hide controls
    panControl: false,
    streetViewControl: false,

    // reconfigure the zoom controls
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM,
      style: google.maps.ZoomControlStyle.SMALL
    }
  };

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      mapOptions.center = new google.maps.LatLng(pos.lat, pos.lng);
      mapOptions.zoom = 12;

      newMap(mapOptions);
    }, function() {
      //handle potential error
      newMap(mapOptions);
    });
  } else {
    //no location available
    newMap(mapOptions);
  }
};

function newMap(mapOptions){
  // create a new Google map with the options in the map element
  var map = new google.maps.Map($('#map_canvas')[0], mapOptions);
  bindControls(map);
}

/**
 * Bind and setup search control for the map
 *
 * param: map - the Google map object
 */
var bindControls = function(map) {
  // get the container for the search control and bind and event to it on submit
  var controlContainer = $('#control_container')[0];
  google.maps.event.addDomListener(controlContainer, 'submit', function(e) {
    e.preventDefault();
    search(map);
  });

  // get the search button and bind a click event to it for searching
  var searchButton = $('#map_search_submit')[0];
  google.maps.event.addDomListener(searchButton, 'click', function(e) {
    e.preventDefault();
    search(map);
  });

  // push the search controls onto the map
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlContainer);
};

var search = function(map) {
  // post to the search with the search term, take the response data
  // and process it
  $.get('/search', { term: $("#search-term").val(), category_filter: 'food', location: $("#search-location").val() }, function(data) {

    // do some clean up
    $('#results').show();
    $('#results').empty();
    clearMarkers();

      if (data.length === 1) {
        map.setCenter(new google.maps.LatLng(data[0].latitude, data[0].longitude));
        map.setZoom(16);
      } else {
        for(var i = 0; i < data.length; i ++) {
          map.fitBounds(
            new google.maps.LatLngBounds(
              new google.maps.LatLng(data[i].latitude - data[i].latitude_delta, data[i].longitude - data[i].longitude_delta),
              new google.maps.LatLng(data[i].latitude + data[i].latitude_delta, data[i].longitude + data[i].longitude_delta)
              )
            );
          }
        populateListMap(map, data);
        }
    });
};


var populateListMap = function(map, data) {
  for(var i = 0; i < data.length; i++){
    $('#results').append(buildStoreHTML(data[i]));
    geocode_address(map, data[i]);
    }
  };

/**
 * Builds the div that'll display the business result from the API
 *
 * param: business - object of the business response
 */
var buildStoreHTML = function(store) {
  var storeResult =
    "<div class=\"result\">" +
      "<img src=\""+ store.img_url +"\">" +
      "<a href=\"/stores/"+ store.yelp_id +"\"><h5>"+ store.name + "</h5></a>" +
      "<img src=\""+ store.rating_url +"\">" +
      "<p>"+ store.review_count +" reviews</p>" +
      "<p class=\"clear-fix\"></p>" +
    "</div>";

  return storeResult;
};

/**
 * Geocode the address from the business and drop a marker on it's
 * location on the map
 *
 * param: map - the Google map object to drop a marker on
 * param: name - the name of the business, used for when you hover
 *               over the dropped marker
 * param: location_object - an object of the businesses address
 */
var geocode_address = function(map, store) {
  var geocoder = new google.maps.Geocoder();

  var address = store.address;

  // geocode the address and get the lat/lng
  geocoder.geocode({address: address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {

      var content = "<b>"+store.name+"</b><br>";
      if(store.img_url !== undefined)
        content += "<img src=\""+store.img_url+"\"><br>";
      //content += "<a id=\""+store.id+"\" href=\"#\">Details</a><br>";
      content += "<a href=\"storeusers/create/"+store.yelp_id+"\">Favorite</a>";

      var infowindow = new google.maps.InfoWindow({
        content: content
      });
      // create a marker and drop it on the name on the geocoded location
      var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        map: map,
        position: results[0].geometry.location,
        title: store.name,
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFC0lEQVRYR8WWbUxVdRzHP+denuRimCSizKaiFjg1m4npXC2RmW65tcWKXlS65bRZW85Vzg1Cy2d8keYgJmW6RLEAwWw5tVVrZvYCBQ0fkASEywUu3HvPPc+n/a/XZg5R8qJn++/cF3fn+/n9/t/fg8SDf2Kmrp6sCtnaLXWx0oPXZ+j43LErElJdG2u31A1/GACu1KyURUnTk8pqt9SNfBgAMWmvjs11jXGVPiyAuCnvpZ8kWso4u7V+wmBmICr93UnljgTnYkuysEwLyQZLtnqiY6IT/Rf9K5uqmvcNFkBU2qr0ikdS4hbtWlaMKgexNBPTtnGYEis+X8aFrQ2TgGuDBTA0Nzu57ZfMpPhR6cOJinai+VX0oIahWtCuc25j/WigbTAAHGWw+pnpmRs9b7/Ea+dLiUsbxrARLoyAhqbomK0KtRvOjQTckQZwHIQ3Rsa7ds+troGiEmi7zisZHZxJNhmemoitmuiNPs4W1kccQCqEtGlwcc6BA8SePg3i4ATFZHdKD/lTdIZGO7HcypkLO/56EeiIWAaWw6OLoWtOSQkJlgV792I7neimia5oRKk6J69doCAnlRavvq5pf2Mh4I0UQMxRaJqel5eSPHEiFBVhR0WhmSZBVUU3dDzNLbjb293PQw7wN3AdUCIB4PwONo3LzFw1raAAtm3D1jRUy0JRVTRdC70v19WzHl4+Dn8AnUIcsCIB4PoB/FmVlThKS8HrDYmLyFVdRG/SfPESfwaDe96BPKAV0G4OwfsFcJbD5vTs7Pcz5s+Hw4dRbZugyICmohkGPq+XlmvNWjbMABqBAGBHCkBE35FVVTXEsXMnaiBAUNdD4qquoykKzZeu8CX2kq/gCOABzFtXgPvJgPMgbMrIzl6VMW8eWmUlsmGg6lpIXNc02ptbuCrLP70OS4FmILSIRAJAWgdPzob65yoqsIqLCbjdqKaBqmlouo6ntZVuf8CzELKBK0Dvram/3yuI+R6uPp2XN2pEdDS9h75FsUX0NwACvl4629xkweywuHC90df29X+uwFkBX4ybOfOtqR/n0fPhGhTbQjVNVFF2hk5nSysndKMgH0rEwAH0O61+AwWQiuHZNPj1hWPH8H36CXJHR6jshLi4f9nnx9fVrWXBU8BVINjf3jkQAGk7jMuAy3PLypB+P03P0SOhshNpFzWvKBo+t5uvbZaUQnW44ViRAHDWwLo4+Gjq5s0kxsXStWtXyNLC8TfF5c4uWgzj51xYEna96Hb9PnfLgFQKE0bDuZQZM2LS8/ORerrpLtxOMBBADZddUA7g93TRaFO9FNaGU9+n6wdShtJnMHYyXJm8di3JCxcSrKmm99ChG5EbRqjPy8EgfreH47BhPewPt1rvnVx/rwDOKihwwZrQbI+LxVdYGDKcJgxnGMiyTMDnQ/H5OGmzoQD2hB3vu73b3YsHHEfgTRsmOGCmA+aNWbCAJ5YvR6qtxVdeHio1IR6QZTwt1wmoSrAJjv8GNaWIBISGjOjz/ZqurwzEnAA1Kj6ex3NySJo1C1dCAjQ0wKlTBLxeFFOnw91BT1c3fr+f87B/JRSJhQLoCh95oOICRpjwkX2wIxHmDIHxAl+MqpvjSvxBHD80NsCPH8A34aEiups/3N9Fo/l3wt3N+bfPggRArMiPAbGAo48PCC7RUHqAbkDcsyix/0y2gQjfOgucQFxYXPzuqzRFdKKXC1FRBAO65/7A/gFUyHqyzlXYtAAAAABJRU5ErkJggg=="
      });

      marker.addListener('click', function() {
        if(lastOpenedWindow !== undefined)
          lastOpenedWindow.close();
        lastOpenedWindow = infowindow;
        infowindow.open(map, marker);
      });

      // save the marker object so we can delete it later
      markersArray.push(marker);
    } else {
      console.log("Geocode was not successful for the following reason: " + status);
    }
  });

};

/**
 * Remove all of the markers from the map by setting them
 * to null
 */
var clearMarkers = function() {
  markersArray.forEach(function(marker) {
    marker.setMap(null);
  });

  markersArray = [];
};
