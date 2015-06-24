/*
    Jonathan Klaiber
    student nr: 10004077
    Programming Project 2015

    This script contains the filter functionality

    Partly inspired by 
    "http://stackoverflow.com/questions/17664697/find-
     the-time-closest-to-current-time-with-5-date-objects-javascript"
*/
"use strict";
// Constants
var programArray = ["avro", "bnn", "kro", "kro-ncrv",
                  "max", "ncrv", "nos", "nps", "tros",
                  "vara", "vpro", "ntr", "eo"]
var programChecked = {avro: true, 
                      bnn: true, 
                      kro: true, 
                      kroncrv: true, 
                      max: true, 
                      ncrv: true,
                      nps: true,
                      nos: true, 
                      tros: true,
                      vara: true, 
                      vpro: true, 
                      ntr: true, 
                      eo: true};
var margin = {top: 20, right: 50, bottom: 200, left: 250},
  width = 500,
  height = 40,
  marginFilterLabel = 10,
  placehoderWidth = 70;
var svg;
var brush;
var fromDate;
var toDate;
var x;
var dates 
var beginDate = "01-01-2000"
var from = parseBeginDate(beginDate)
var s;
var to = new Date();
to.setDate(to.getDate() - 1);

function LoadFilter () {
  /* 
  Loads filter functionality, the program filter and
  the date brush filter.
  */
	d3.select("#filterdiv").on("click", function() {
    if(d3.select("#filtertoggle").empty()) {
    	// Initialising filtertoggle div
      d3.select("body")
      	.append("div")
          	.attr("class", "intro")
          	.attr("id", "filtertoggle")
          	.append("div")
          		.attr("class", "programfilter");
      // moving map canvas and result bar at click
      var orgMapTop = d3.select("#map-canvas").style("top")
      d3.select("#map-canvas").style("top", 
      	transPixel(d3.select("#map-canvas").style("top")) +
  		  transPixel(d3.select("#filtertoggle").style("height")) + "px")
      var orgResultTop = d3.select("#results").style("top")
      d3.select("#results").style("top", 
      	transPixel(d3.select("#results").style("top")) +
      	transPixel(d3.select("#filtertoggle").style("height")) + "px")
      var orgEpisodeTop = d3.select("#episodelist").style("top")
      d3.select("#episodelist").style("top",
        transPixel(d3.select("#episodelist").style("top")) +
        transPixel(d3.select("#filtertoggle").style("height")) + "px")

      // adusting filter arrow	
  	  d3.select("#arrow-right").attr("id", "arrow-down")
  		// Initialising program checkboxes
      var programfilter = d3.select(".programfilter")
      	.append("div").attr("class", "slidertext")
        	.text("Programs:  ")
        	.selectAll("div")
            .data(programArray)
            .enter()
            .append("div")
              .attr("class", "inlinediv")
              .style("background", function(d){
              	return ("url(images/" + d + 
              		    "_logo_very_small.png) no-repeat center center");})
                .append("div")
                  .style("width", placehoderWidth + "px")
                  .style("display", "inline-block")
                  .style("position", "relative")
                    .append("div")
                     .style("display", "inline-block")
                     .style("position", "relative")
                     .attr("id", "placeholderdiv")
                     .style("width", "20px")
                     .append("input")
                        .attr("class", "programbox")
                        .attr("id", function(d) {
                        return d + "Box"
                        })
                        .attr("type", "checkbox")
                        .attr("checked", "yes")
      // show the current filter values, checked or unchecked
      for (var prog in programChecked) {
          var progA;
          if(prog == "kroncrv") {
            progA = "kro-ncrv"
          } else {
            progA = prog
          }
          document.getElementById(progA + "Box").checked = programChecked[prog]
      };
      // Change checkbox values at change
      d3.selectAll(".programbox").on("change", function() {
        prog = this.id.substring(0, this.id.length - 3)
        if(prog == "kro-ncrv") {
          prog = "kroncrv"
        }
        programChecked[prog] = document.getElementById(this.id).checked
      });
      // Date brush 
      dates = getDates(parseBeginDate(beginDate), new Date())
      var x = d3.scale.linear()
          .domain([0, dates.length])
          .range([0, width]);
      var y = d3.random.normal(height / 2, height / 8);
      // Initialise brush
      brush = d3.svg.brush()
                    .x(x)
                    .extent([dates.indexOf(nextDate(from, dates)), 
                             dates.indexOf(nextDate(to, dates))])
                    .on("brushstart", brushstart)
                    .on("brush", brushmove)
                    .on("brushend", brushend);
      // Initialise brush begin and end shape
      var arc = d3.svg.arc()
          .outerRadius(height / 2)
          .startAngle(0)
          .endAngle(function(d, i) { return i ? -Math.PI : Math.PI; });
      // Initialise date svg
      svg = d3.select("#filtertoggle").append("svg")
              .attr("width", "1000")
              .attr("height", "80")
              .attr("id", "dateSVG")
              .append("g")
                .attr("transform", "translate(" + margin.left 
                                                + "," 
                                                + margin.top 
                                                + ")");
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.svg.axis().scale(x).orient("bottom"));
      var line = svg.append("g").append("line")
                    .attr("x1", 0)
                    .attr("y1", height / 2)
                    .attr("x2", width)
                    .attr("y2", height / 2)
                    .attr("stroke-width", 2) 
                    .attr("stroke", "white");
      // Labeling of date brush
      var dateLabel = svg.append("text")
                         .attr("class", "slidertext")
                         .attr("x", - margin.left + marginFilterLabel)
                         .attr("y", height / 2)
                         .text("Date:")
      fromDate = svg.append("text")
                    .attr("class", "slidertext")
      toDate = svg.append("text")
                  .attr("class", "slidertext")
      var brushg = svg.append("g")
                      .attr("class", "brush")
                      .call(brush);
      brushg.selectAll(".resize").append("path")
            .attr("transform", "translate(0," +  height / 2 + ")")
            .attr("d", arc);
      brushg.selectAll("rect")
            .attr("height", height);
      brushstart();
      brushmove();
    } else {
      // Remove filter elements
      d3.select("#dateSVG").remove()
      d3.select("#filtertoggle").remove()
      d3.select("#map-canvas").style("top", orgMapTop)
      d3.select("#results").style("top", orgResultTop)
      d3.select("#episodelist").style("top", orgEpisodeTop)
      d3.select("#arrow-down").attr("id", "arrow-right")
    }
  	function brushstart() {
  		svg.classed("selecting", true);
  	}
  	function brushmove() {
      // Callback for movement of brush
  	  s = brush.extent();
      // Adjust interactivity rectangle to brush width
      var rectWidth = x(s[1]) - x(s[0])
      brushg.select(".background")
            .attr("x", x(s[0]))
            .attr("width", rectWidth)
      // Storing date information from date filter
  	  from = dates[Math.round(s[0])];
  	  to = dates[Math.round(s[1] - 1)];
  	  fromDate.attr("x", x(s[0] ) - 140)
  	          .attr("y", height * 0.1)		          
              .text("from: " + transDate(from));
  	  toDate.attr("x", x(s[1]) + 30) 
	          .attr("y", height * 0.1)
	          .text("to: " + transDate(to));
  	}
  	function brushend() {
  	  svg.classed("selecting", !d3.event.target.empty());
  	}
 	});
}
function transPixel(charPixel) {
  // Transforms pixel string ("100px") into integer
	return parseInt(charPixel.substring(0, charPixel.length - 2));
}
