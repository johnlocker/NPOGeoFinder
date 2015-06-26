/*
    Jonathan Klaiber
    student nr: 10004077
    Programming Project 2015

    Partly inspired by 
	"http://www.geodatasource.com/developers/javascript"

	"http://stackoverflow.com/questions/1431094/how-do-i-
	 replace-a-character-at-a-particular-index-in-javascript"

	"https://developers.google.com/maps/
	 documentation/javascript/examples/infowindow-simple"

	"https://developers.google.com/maps/documentation/
	 javascript/examples/marker-remove"

    This script contains functionality of markers.

    Validated on http://www.javascriptlint.com, validation passed
    except of D3.js parts of the code (linter cannot validate d3.js)
*/
"use strict";

function placeMarker(map, item) {
	/* 
	Places marker on map. Provides functionality (info window)
	for markers.
	*/
	var googleLatLng = new google.maps.LatLng(item.locationLat, 
											  item.locationLong);
	// Getting marker icon
	var icon;
	if (programArray.indexOf(item.program.toLowerCase()) > -1) {
	  icon = "images/" + item.program.toLowerCase() + "_logo_small.png";
	} else {
	  icon = "images/npo_journalistiek_logo_small.png";
	}
	var marker = new google.maps.Marker({
	          position: googleLatLng,
	          map: map,
	          icon: icon,
	          id: item.id,
	          draggable: true
	});
	markers.push(marker);
	// Adding info window functionality
	var infoString = '<div id="content">' +
	    			 '<div id="siteNotice">' +
	    			 "</div>" +
	    			 '<div id="bodyContent">' +
	    			 // info title
	    			 "<p><b>Title: </b>" + item.title + "<br>" +
	    			 // info date
	    			 "<b>Date: </b>" + transDate(item.date) + "<br>" +
	    			 // info link
	    			 '<b>Link: </b> <a href="' + item.link +
	    			 ' "target=_blank">' +
	    			 item.link.substring(item.link.indexOf("//") 
	    			 					 + 2, item.link.indexOf(".nl") 
	    			 					 + 3) 
	    			 + "</a>" + "<br>" +
	    			 // info distance
	    			"<b>Distance to Search Marker: </b>" +
	    			item.distance + " km <br> <br>" +
	    			// info description
	     			"<b> Description: </b> <br>" + 
	     			item.description.substring(
	     				item.description.indexOf("<p>"), 
	     				item.description.indexOf("</p>")) +
	    			"</p>"+
	    			"</div>"+
	    			"</div>";
	// Initialising info window
	var infowindow = new google.maps.InfoWindow({
	    content: infoString,
	    maxWidth: 250
	 });
	// Adding click event to marker
	google.maps.event.addListener(marker, "click", function() {
	    infowindow.open(map, marker);
	});
}

function setAllMap(map) {
	// Sets the map on all markers in the array.
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
}

function clearMarkers() {
	// Removes the markers from the map, but keeps them in the array.
	setAllMap(null);
}
function deleteMarkers() {
	// Deletes all markers in the array by removing references to them.
	clearMarkers();
	markers = [];
}

function ItemMarker(id, 
					title, 
					program, 
					date, 
					locationChar, 
					latitude, 
					longitude, 
					link, 
					description, 
					locationMarker) {
	// Item marker object that contains item information
	this.id = id;
	this.title = title;
	this.date = date;
	this.locationChr = locationChar;
	this.locationLat = latitude;
	this.locationLong = longitude;
	this.link = link;
	this.description = description;
	this.distance = distance(locationMarker[0],
	                         locationMarker[1],
	                         latitude,
	                         longitude);
	if (program !== null) {
	  this.program = program;
	} else {
	  this.program = "npo_journalistiek";
	}
}

String.prototype.replaceAt=function(index, character) {
	// Replaces character at index.
    return this.substr(0, index) 
    	   + character 
    	   + this.substr(index + character.length);
}

function distance(lat1, lon1, lat2, lon2) {
	/*
	Function distance calculates the distance between
	two geo location points (assuming the world is flat).
	*/
	var radlat1 = Math.PI * lat1 / 180;
	var radlat2 = Math.PI * lat2 / 180;
	var radlon1 = Math.PI * lon1 / 180;
	var radlon2 = Math.PI * lon2 / 180;
	var theta = lon1 - lon2;
	var radtheta = Math.PI * theta/180;
	var dist = Math.sin(radlat1)
	           * Math.sin(radlat2)
	           + Math.cos(radlat1) 
	           * Math.cos(radlat2) 
	           * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	// Distance in kilometers
	dist = dist * 1.609344;
	dist = Math.round(dist * 100) * 0.01;
	return dist;
}