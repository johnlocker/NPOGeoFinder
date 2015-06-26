/*
    Jonathan Klaiber
    student nr: 10004077
    Programming Project 2015

    This script contains functionality to communicate with an API.

    The script is adopted from 
    "http://rest.elkstein.org/2008/02/using-rest-in-javascript.html"

    Validated on http://www.javascriptlint.com
*/

function createRequest() {
	var result = null;
	if (window.XMLHttpRequest) {
	  // For FireFox, Safari, etc.
	  result = new XMLHttpRequest();
	  if (typeof result.overrideMimeType != "undefined") {
	    result.overrideMimeType("text/xml"); 
	  }
	}
	else if (window.ActiveXObject) {
	  // For MS InternetExplorer
	  result = new ActiveXObject("Microsoft.XMLHTTP");
	} 
	else {
		// Else request was not successful
		return 0;
	}
	return result;
}
