/*
    Jonathan Klaiber
    student nr: 10004077
    Programming Project 2015

    This script contains functionality of the result bar.
    
    Validated on http://www.javascriptlint.com, validation passed
    except of D3.js parts of the code (linter cannot validate d3.js)
*/
"use strict";
var DisplayResultBar = function(keyword, markerArray, listArray) {
  /*
    Displays the search results at the bottom of the map once
    a request has been sended.
  */
  // Remove old results if there are any
  d3.select("#resulttext").remove();
  // Display resultstext
  d3.select("#results")
      .style("opacity", "1")
      .append("div").style("color", "#3c3c3c")
        .attr("id", "resulttext")
        .text("Keyword: " 
          + keyword
          + "   -   "
          + markerArray.length 
          + " locations - " 
          + listArray.length 
          + " none locations (list)");
};

