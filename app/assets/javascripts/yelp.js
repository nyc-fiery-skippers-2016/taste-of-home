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
var pepperIconURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFC0lEQVRYR8WWbUxVdRzHP+denuRimCSizKaiFjg1m4npXC2RmW65tcWKXlS65bRZW85Vzg1Cy2d8keYgJmW6RLEAwWw5tVVrZvYCBQ0fkASEywUu3HvPPc+n/a/XZg5R8qJn++/cF3fn+/n9/t/fg8SDf2Kmrp6sCtnaLXWx0oPXZ+j43LErElJdG2u31A1/GACu1KyURUnTk8pqt9SNfBgAMWmvjs11jXGVPiyAuCnvpZ8kWso4u7V+wmBmICr93UnljgTnYkuysEwLyQZLtnqiY6IT/Rf9K5uqmvcNFkBU2qr0ikdS4hbtWlaMKgexNBPTtnGYEis+X8aFrQ2TgGuDBTA0Nzu57ZfMpPhR6cOJinai+VX0oIahWtCuc25j/WigbTAAHGWw+pnpmRs9b7/Ea+dLiUsbxrARLoyAhqbomK0KtRvOjQTckQZwHIQ3Rsa7ds+troGiEmi7zisZHZxJNhmemoitmuiNPs4W1kccQCqEtGlwcc6BA8SePg3i4ATFZHdKD/lTdIZGO7HcypkLO/56EeiIWAaWw6OLoWtOSQkJlgV792I7neimia5oRKk6J69doCAnlRavvq5pf2Mh4I0UQMxRaJqel5eSPHEiFBVhR0WhmSZBVUU3dDzNLbjb293PQw7wN3AdUCIB4PwONo3LzFw1raAAtm3D1jRUy0JRVTRdC70v19WzHl4+Dn8AnUIcsCIB4PoB/FmVlThKS8HrDYmLyFVdRG/SfPESfwaDe96BPKAV0G4OwfsFcJbD5vTs7Pcz5s+Hw4dRbZugyICmohkGPq+XlmvNWjbMABqBAGBHCkBE35FVVTXEsXMnaiBAUNdD4qquoykKzZeu8CX2kq/gCOABzFtXgPvJgPMgbMrIzl6VMW8eWmUlsmGg6lpIXNc02ptbuCrLP70OS4FmILSIRAJAWgdPzob65yoqsIqLCbjdqKaBqmlouo6ntZVuf8CzELKBK0Dvram/3yuI+R6uPp2XN2pEdDS9h75FsUX0NwACvl4629xkweywuHC90df29X+uwFkBX4ybOfOtqR/n0fPhGhTbQjVNVFF2hk5nSysndKMgH0rEwAH0O61+AwWQiuHZNPj1hWPH8H36CXJHR6jshLi4f9nnx9fVrWXBU8BVINjf3jkQAGk7jMuAy3PLypB+P03P0SOhshNpFzWvKBo+t5uvbZaUQnW44ViRAHDWwLo4+Gjq5s0kxsXStWtXyNLC8TfF5c4uWgzj51xYEna96Hb9PnfLgFQKE0bDuZQZM2LS8/ORerrpLtxOMBBADZddUA7g93TRaFO9FNaGU9+n6wdShtJnMHYyXJm8di3JCxcSrKmm99ChG5EbRqjPy8EgfreH47BhPewPt1rvnVx/rwDOKihwwZrQbI+LxVdYGDKcJgxnGMiyTMDnQ/H5OGmzoQD2hB3vu73b3YsHHEfgTRsmOGCmA+aNWbCAJ5YvR6qtxVdeHio1IR6QZTwt1wmoSrAJjv8GNaWIBISGjOjz/ZqurwzEnAA1Kj6ex3NySJo1C1dCAjQ0wKlTBLxeFFOnw91BT1c3fr+f87B/JRSJhQLoCh95oOICRpjwkX2wIxHmDIHxAl+MqpvjSvxBHD80NsCPH8A34aEiups/3N9Fo/l3wt3N+bfPggRArMiPAbGAo48PCC7RUHqAbkDcsyix/0y2gQjfOgucQFxYXPzuqzRFdKKXC1FRBAO65/7A/gFUyHqyzlXYtAAAAABJRU5ErkJggg==";
var starIconURL = "data:image/png;base64,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";

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
  getFavorites(map);
}

function getFavorites(map){
  $.get('/favorites', {}, function(data) {
    data.forEach(function(place){
      geocode_address(map, place, true);
    });
  });
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
  $.get('/search', { term: $("#search-term").val(), category_filter: 'food,restaurants', location: $("#search-location").val() }, function(data) {
    // do some clean up
    $('#results').show();
    $('#index-icons').hide();
    $('#results').empty();
    clearMarkers();
      if (data.length <= 0){
        $('#search-error').remove();
        $('#map_search').append("<p id=\"search-error\">No places in <i>"+$('#search-location').val()+"</i> found with <i>"+$('#search-term').val()+"</i>.</p>");
      } else if (data.length === 1) {
        map.setCenter(new google.maps.LatLng(data[0].latitude, data[0].longitude));
        map.setZoom(16);
        $('#search-error').remove();
        populateListMap(map, data);
      } else {
        map.fitBounds(
          new google.maps.LatLngBounds(
            new google.maps.LatLng(data[0].latitude - data[0].latitude_delta, data[0].longitude - data[0].longitude_delta),
            new google.maps.LatLng(data[0].latitude + data[0].latitude_delta, data[0].longitude + data[0].longitude_delta)
            )
          );
          populateListMap(map, data);
          $('#search-error').remove();
        }
    });
};


var populateListMap = function(map, data) {
  for(var i = 0; i < data.length; i++){//excludes favorites
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
var geocode_address = function(map, store, favorite) {
  var geocoder = new google.maps.Geocoder();

  var address = store.address;

  // geocode the address and get the lat/lng
  geocoder.geocode({address: address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {

      var content = "<b>"+store.name+"</b><br>";
      if(store.img_url !== undefined)
        content += "<img src=\""+store.img_url+"\"><br>";
      //content += "<a id=\""+store.id+"\" href=\"#\">Details</a><br>";
      content += "<a id=\"favoriteLink\" href=\"storeusers/create/"+store.yelp_id+"\">Favorite</a>";

      var infowindow = new google.maps.InfoWindow({
        content: content
      });
      // create a marker and drop it on the name on the geocoded location

      var markerAttributes = {
        animation: google.maps.Animation.DROP,
        map: map,
        position: results[0].geometry.location,
        title: store.name,
        icon: pepperIconURL
      }

      if (favorite)
        markerAttributes['icon'] = starIconURL;

      var marker = new google.maps.Marker(markerAttributes);

      marker.addListener('click', function() {
        if(lastOpenedWindow !== undefined)
          lastOpenedWindow.close();
        lastOpenedWindow = infowindow;
        infowindow.open(map, marker);
        $('#favoriteLink').click(function(e){
          e.preventDefault();
          $.ajax({
            url: e.target.href
          });
          $('#favoriteLink').parent().append('<span>Favorited</span>');
          e.target.remove();
        });
      });

      // save the marker object so we can delete it later
      if (!favorite)
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
