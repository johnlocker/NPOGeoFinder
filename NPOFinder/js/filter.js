/*
    Jonathan Klaiber
    student nr: 10004077
    Programming Project 2015

    This script contains the filter functionality

    Partly inspired by 
    "http://stackoverflow.com/questions/17664697/find-
     the-time-closest-to-current-time-with-5-date-objects-javascript"

    Validated on http://www.javascriptlint.com, validation passed
    except of D3.js parts of the code (linter cannot validate d3.js)
*/
"use strict";
// Global variables used to communicate between scripts
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
var beginDate = "01-01-2000"
var from = parseBeginDate(beginDate);
var to = new Date();
to.setDate(to.getDate() - 1);

function LoadFilter () {
  /* 
  Loads filter functionality, the program filter and
  the date brush filter.
  */
  // Constants
  var dates = getDates(parseBeginDate(beginDate), new Date());
  var beginExtend;
  var endExtend;
  var s = [0, dates.length - 1];
  var minPeriod = 1;
  var margin = {top: 20, right: 50, bottom: 200, left: 250},
                width = 500,
                height = 40,
                marginFilterLabel = 10,
                placehoderWidth = 70;
  var marginSliderDate = {from: 140, to: 30};
  // Initialising filter
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
      var orgMapTop = d3.select("#map-canvas").style("top");
      d3.select("#map-canvas").style("top", 
      	transPixel(d3.select("#map-canvas").style("top")) +
  		  transPixel(d3.select("#filtertoggle").style("height")) + "px");
      var orgResultTop = d3.select("#results").style("top");
      d3.select("#results").style("top", 
      	transPixel(d3.select("#results").style("top")) +
      	transPixel(d3.select("#filtertoggle").style("height")) + "px");
      var orgEpisodeTop = d3.select("#episodelist").style("top");
      d3.select("#episodelist").style("top",
        transPixel(d3.select("#episodelist").style("top")) +
        transPixel(d3.select("#filtertoggle").style("height")) + "px");

      // adusting filter arrow	
  	  d3.select("#arrow-right").attr("id", "arrow-down")
  		// Initialising program checkboxes
      var programfilter = d3.select(".programfilter")
      	.append("div").attr("class", "slidertext")
          .attr("fill", "white")
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
                      .attr("checked", "yes");
      // show the current filter values, checked or unchecked
      for (var prog in programChecked) {
          var progA;
          if(prog == "kroncrv") {
            progA = "kro-ncrv"
          } else {
            progA = prog;
          }
          document.getElementById(progA + "Box").checked = programChecked[prog];
      };
      // Change checkbox values at change
      d3.selectAll(".programbox").on("change", function() {
        prog = this.id.substring(0, this.id.length - 3)
        if(prog == "kro-ncrv") {
          prog = "kroncrv";
        }
        programChecked[prog] = document.getElementById(this.id).checked;
      });
      // Date brush 
      var x = d3.scale.linear()
          .domain([0, dates.length - 1])
          .range([0, width]);
      var y = d3.random.normal(height / 2, height / 8);
      // Initialise brush
      var startBrush;
      var endBrush;
      var svg;
      var brush;
      if(s[0] == s[1]) {
        if(s[0] === 0){
          startBrush = s[0];
          endBrush = s[1] + minPeriod;
        } else {
          startBrush = s[0] - minPeriod;
          endBrush = s[1];
        }
        brush = d3.svg.brush()
              .x(x)
              .extent([startBrush, endBrush])
              .on("brushstart", brushstart)
              .on("brush", brushmove)
              .on("brushend", brushend);
      } else {
        brush = d3.svg.brush()
              .x(x)
              .extent([s[0], s[1]])
              .on("brushstart", brushstart)
              .on("brush", brushmove)
              .on("brushend", brushend);
      }
      // Initialise brush begin and end shape
      var arc = d3.svg.arc()
          .outerRadius(height / 2)
          .startAngle(0)
          .cornerRadius(height / 1.5)
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
                         .style("fill", "white")
                         .text("Date:");
      var fromDate = svg.append("text")
                    .attr("class", "slidertext");
      var toDate = svg.append("text")
                  .attr("class", "slidertext");
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
      d3.select("#dateSVG").remove();
      d3.select("#filtertoggle").remove();
      d3.select("#map-canvas").style("top", orgMapTop);
      d3.select("#results").style("top", orgResultTop);
      d3.select("#episodelist").style("top", orgEpisodeTop);
      d3.select("#arrow-down").attr("id", "arrow-right");
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
            .attr("width", rectWidth);
      // Storing date information from date filter
  	  from = dates[Math.round(s[0])];
  	  to = dates[Math.round(s[1])];
      // Limit range of brush
      var sBegin;
      var sEnd;
      if (s[0] == s[1]) {
        if(s[0] === 0) {
          sBegin = s[0];
          sEnd = s[1] + minPeriod; 
        } else {
          sBegin = s[0] - minPeriod;
          sEnd = s[1];
        }
        brush.extent([sBegin, sEnd]);
      } else {
        sBegin = s[0];
        sEnd = s[1];
      }
  	  fromDate.attr("x", x(sBegin) - marginSliderDate.from)
  	          .attr("y", height * 0.1)
              .style("fill", "white")		          
              .text("from: " + transDate(from));
  	  toDate.attr("x", x(sEnd) + marginSliderDate.to) 
	          .attr("y", height * 0.1)
            .style("fill", "white")
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
