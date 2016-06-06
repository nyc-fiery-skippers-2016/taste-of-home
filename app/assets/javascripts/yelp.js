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
//= require turbolinks
//= require_tree .

var markersArray = [];
var lastOpenedWindow;
var QUERY_DELAY = 1400;
var inactive = false;
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
  }else{
    //no location available
    newMap(mapOptions);
  }



}

function newMap(mapOptions){
  // create a new Google map with the options in the map element
  var map = new google.maps.Map($('#map_canvas')[0], mapOptions);
  bind_controls(map);
}

/**
 * Bind and setup search control for the map
 *
 * param: map - the Google map object
 */
var bind_controls = function(map) {
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
}

/**
 * Makes a post request to the server with the search term and
 * populates the map with the response businesses
 *
 * param: map - the Google map object
 */
var search = function(map) {

  // post to the search with the search term, take the response data
  // and process it

  $.get('/search', { term: $("#search-term").val(), category_filter: 'food', location: $("#search-location").val() }, function(data) {

    // do some clean up
    $('#results').show();
    $('#results').empty();
    clearMarkers();

      if (data.businesses.length ===1) {
      map.setCenter(new google.maps.LatLng(data.region.center.latitude, data.region.center.longitude));
      map.setZoom(16);
    } else {
      map.fitBounds(
        new google.maps.LatLngBounds(
          new google.maps.LatLng(data.latitude - data.latitude_delta, data.longitude - data.longitude_delta),
          new google.maps.LatLng(data.latitude + data.latitude_delta, data.longitude + data.longitude_delta)
        )
      );
    }
    // iterate through each business in the response capture the data
    // within a closure.
    data.forEach(function(store) {
      capture(index, map, business);
    });
  });
};

/**
 * Capture the specific business objects within a closure for setTimeout
 * or else it'll execute only on the last business in the array
 *
 * param: i - the index the business was at in the array, used to the
 *            timeout delay
 * param: map - the Google map object used for geocoding and marker placement
 * param: business - the business object from the response
 */
var capture = function(i, map, business) {
  setTimeout(function() {
    if (i === 15) {
      inactive = false;
    }

    $('#results').append(build_results_container(business, i));

    // get the geocoded address for the business's location
    geocode_address(map, business);
  }, QUERY_DELAY * i); // the delay on the timeout
};

/**
 * Builds the div that'll display the business result from the API
 *
 * param: business - object of the business response
 */
var build_results_container = function(business, i) {
  var storeResult =
    "<div class=\"result\" id=\""+ i + "\">" +
      "<img class=\"biz_img\" src=\""+ business.image_url +"\">" +
      "<a href=\"/stores/"+ business.id +"\"><h5>"+ business.name + "</h5></a>" +
      "<img src=\""+ business.rating_img_url +"\">" +
      "<p>"+ business.review_count +" reviews</p>" +
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
var geocode_address = function(map, business) {
  var geocoder = new google.maps.Geocoder();

  var address = [
    business.address,
    business.city,
    business.country_code
  ].join(', ');

  // geocode the address and get the lat/lng
  geocoder.geocode({address: address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {

      var content = "<b>"+business.name+"</b><br>";
      if(business.image_url !== undefined)
        content += "<img src=\""+business.image_url+"\"><br>";
      //content += "<a id=\""+business.id+"\" href=\"#\">Details</a><br>";
      content += "<a href=\"storeusers/create/"+business.id+"\">Favorite</a>";

      var infowindow = new google.maps.InfoWindow({
        content: content
      });
      // create a marker and drop it on the name on the geocoded location
      var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        map: map,
        position: results[0].geometry.location,
        title: business.name
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

