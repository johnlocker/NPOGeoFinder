/*
    Jonathan Klaiber
    student nr: 10004077
    Programming Project 2015

    This script contains functionality to communicate with an API.

    Partly inspired by 

*/

function createRequest() {
	var result = null;
	if (window.XMLHttpRequest) {
	  // FireFox, Safari, etc.
	  result = new XMLHttpRequest();
	  if (typeof result.overrideMimeType != 'undefined') {
	    result.overrideMimeType('text/xml'); // Or anything else
	  }
	}
	else if (window.ActiveXObject) {
	  // MSIE
	  result = new ActiveXObject("Microsoft.XMLHTTP");
	} 
	else {
	  // No known mechanism -- consider aborting the application
	}
	return result;
}