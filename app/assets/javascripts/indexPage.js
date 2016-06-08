var minnesotaIcon = {
  "name": "Minnesota",
  "iso": "US-MN",
  "alpha2": "MN",
  "numeric": 27,
  "gpo": "Minn."
}


$(document).ready(function() {

  // initialize icons and lists on load
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
    minnesotaIcon
  };
