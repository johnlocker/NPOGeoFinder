/*
    Jonathan Klaiber
    student nr: 10004077
    Programming Project 2015

    Partly inspired by 
    "http://stackoverflow.com/questions/
     4413590/javascript-get-array-of-dates-between-2-dates"

    This script contains the functionality with regard
    to dates and date transformation

    Validated on http://www.javascriptlint.com
*/
"use strict";
// Transforms begin date into d3 date format (parser)
var parseBeginDate = d3.time.format("%d-%m-%Y").parse;
// Transforms d3 date format into correct date format for NPO API query
var queryDate = d3.time.format('%Y-%m-%d');
// Transforms d3 date format into common output date format
var transDate = d3.time.format("%d-%m-%Y");
// Transforms query result dates into d3 date format (parser)
var parseDate = d3.time.format("%Y-%m-%d %X").parse;

/*
Function getDates, next Date and prototype function .addDays
are used to fill an array with dates from startDate to stopDate
*/
Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};
function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push( new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}
function nextDate( startDate, dates ) {
  var startTime = +startDate;
  var nearestDate, nearestDiff = Infinity;
  for( var i = 0, n = dates.length;  i < n;  ++i ) {
      var diff = +dates[i] - startTime;
      if( diff > 0  &&  diff < nearestDiff ) {
          nearestDiff = diff;
          nearestDate = dates[i];
      }
  }
  return nearestDate;
}