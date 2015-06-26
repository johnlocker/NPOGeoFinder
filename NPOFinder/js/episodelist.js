/*
    Jonathan Klaiber
    student nr: 10004077
    Programming Project 2015

    Partly inspired by 
    "http://stackoverflow.com/questions/8683555/
     d3-js-create-an-expanding-list-viz-using-selection-on"

    This script contains the functionality with regard
    to the list on the right side of the NPOGeoFinder application.

    Validated on http://www.javascriptlint.com, validation passed
    except of D3.js parts of the code (linter cannot validate d3.js)
*/
"use strict";
var LoadEpisodelist = function() {
	/*
	Function to load list of NPO item without a location
	All list entries can be expanded by clicking on them.
	*/
	var episodelist = d3.select("#episodelist")
						.style("opacity", "1")
						.append("ul")
							.attr("id", "list");
	episodelist.selectAll("li")
	  .data(listArray.slice(0, 10))
	  .enter()
	  .append("li")
	    .attr("class", function(d){return d.program.toLowerCase();})
	    .text(function(d){return d.title;})
	    .on("click", expand);
};

function expand(d) {
    /*
    At click, list entry is expanded and shows date and
    url of NPO item.
    */
    if(d3.select(this).select("ul").empty()) {
	    d3.select(this)
		    .append("ul")
			    .attr("class", "sublist")
			    .selectAll("li")
			      .data([d])
			      .enter()
			    .append("li")
			      .text(function(d) {
			      	return "Date: " 
			      	       + transDate(d.date);
			      })
			    .append("li")
			      .text(function(d) {
			      	return ("Link: " 
			      		    + d.link.substring(d.link.indexOf("//")
			      		    + 2, d.link.indexOf(".nl") + 3)); 
			      })
			      .on("click", function(d){
			          var newTab = window.open(d.link, "_blank");
			          newTab.focus();
	        });
    } else {
    	d3.select(this).select("ul").remove();
    } 
}