/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable
window.addEventListener('load', initializeMap);
/*
The International Name challenge in Lesson 2 where you'll create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
$(document).ready(function() {
	//console.log("In helper2 ready");
	//console.log("helper2 name: " +bio.name);
	$('button').click(function() {
		var iName = inName() || function(){};
		$('#name').html(iName);  
	});

});

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
	//Make sure the map bounds get updated on page resize
	//console.log("Resizing...");
	map.fitBounds(mapBounds);
});

/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/
clickLocations = [];

function logClicks(x,y) {
	clickLocations.push(
		{
			x: x,
			y: y
		}
	);
	console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
	// your code goes here!
	logClicks(loc.pageX,loc.pageY);
});





/*
pinPoster(locations) takes in the array of locations created by locationFinder()
and fires off Google place searches for each location
*/
function pinPoster(locations) {

	// creates a Google place search service object. PlacesService does the work of
	// actually searching for location data.
	var service = new google.maps.places.PlacesService(map);

	// Iterates through the array of locations, creates a search object for each location
	for (var place in locations) {
		// the search request object
		var request = {
			query: locations[place].location
		};

		var loc = locations[place];
		/*Did callbackwrapper/function.call trick to get this scope to refer to the location object instead of window*/
		//console.log("Before callback: "+loc.infoWindowText);
		var callbackwrapper = function() {
			//console.log("wrap this: "+this.name);
			var _this = this
			this.callback = function(results,status) {
				//console.log("Inside: "+ _this.infoWindowText);
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					//console.log("In callback: "+ _this.infoWindowText+"..."+results[0].formatted_address);
					createMapMarker(results[0], _this);
				}
			};
		};
		callbackwrapper.call(locations[place]);

		// Actually searches the Google Maps API for location data and runs the callback
		// function with the search results after each search.
		service.textSearch(request, locations[place].callback);
	}
}
/*
createMapMarker(placeData) reads Google Places search results to create map pins.
placeData is the object returned from search results containing information
about a single location.
*/
function createMapMarker(placeData,loc) {
	//console.log("In createMapMarker: "+txt.infoWindowText);

	// The next lines save location data from the search result object to local variables
	var lat = placeData.geometry.location.lat();  // latitude from the place service
	var lon = placeData.geometry.location.lng();  // longitude from the place service
	var name = placeData.formatted_address;   // name of the place from the place service
	var bounds = window.mapBounds;            // current boundaries of the map window
	
	// marker is an object with additional data about the pin for a single location
	var marker = new google.maps.Marker({
		map: map,
		position: placeData.geometry.location,
		title: name
	});

	// infoWindows are the little helper windows that open when you click
	// or hover over a pin on a map. They usually contain more information
	// about a location.
	var infoWindow = new google.maps.InfoWindow({
	  content: loc.infoWindowText
	});

	// hmmmm, I wonder what this is about...
	google.maps.event.addListener(marker, 'click', function() {
		// your code goes here!
		infoWindow.open(map,marker);
	});

	// this is where the pin actually gets added to the map.
	// bounds.extend() takes in a map location object
	bounds.extend(new google.maps.LatLng(lat, lon));
	// fit the map to the new marker
	map.fitBounds(bounds);
	// center the map
	map.setCenter(bounds.getCenter());
}

/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {
	var locations;
	var mapOptions = {
		disableDefaultUI: true
	};
	
	map = new google.maps.Map(document.querySelector('#map-div'), mapOptions);


	/*locationFinder() returns an array of every location string from the JSONs
	written for bio, education, and work.
	*/
	function locationFinder() {

		// initializes an empty array
		var locations = [];

		// Creates location objects and adds them to the array
		//console.log("Here's a spot Bio: "+bio.contacts.location);
		locations.push(new Location("My home",bio.contacts.location));

		// iterates through school locations and appends each location to
		// the locations array
		for (var school in education.schools) {
			//console.log("Here's a spot School: "+education.schools[school].location);
			locations.push(new Location(education.schools[school].name,education.schools[school].location));
		}

		// iterates through work locations and appends each location to
		// the locations array
		for (var job in work.jobs) {
			//console.log("Here's a spot Job: "+work.jobs[job].location);
			locations.push(new Location(work.jobs[job].employer,work.jobs[job].location));
		}
		return locations;
	}

	// Sets the boundaries of the map based on pin locations
	window.mapBounds = new google.maps.LatLngBounds();

	// locations is an array of location strings returned from locationFinder()
	locations = locationFinder();

	// pinPoster(locations) creates pins on the map for each location in
	// the locations array
	pinPoster(locations);
}


