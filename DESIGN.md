# Design Document NPO GeoFinder
#### (Programmeerproject Juni 2015)

**What is the minimum viable product? What are possible supplementary features on top of the minimum product?**

Minimum viable Product: 

The minimum viable version of the NPO GeoFinder website consists of a search entry box, a list of search results and a map. The user must be able to 
insert a location and subsequently get this location displayed with a marker on the map. All NPO video should be displayed as markers on the map, within the borders of the map (I haven't specified yet exactly what section of the map is visible
around the location). Displaying the markers will either happen automatically or by pressing a show marker button. The list of search results must display the 10 most proximate search results
with distance and title. When the user clicks on a NPO marker, the title, date and a link to the online video stream must be displayed in a "tooltip" style box.
Up to now, only the NPO Journalistiek items have become available online through the NPO Backstage API. The minimum viable product will contain solely NPO Journalistiek items because I
don't know yet when other items will be available. 

Supplementary features:

When time is left, a filter function will be implemented to filter the search query by date and television program.
Extra time will also be allocated into improving the visualization. 


**Provide a list of classes and public methods (and their return types and/or arguments) that you’ve decided to implement**
  
 Methods/Functions:
 
1. NPO API method:
	- SET search query
	- GET argument based on JSON search query
	- TRANS put return data into NPO item object
	
2. Markers method:
	- ADD adds property of NPO item object to marker
	- PLACE places marker on map

3. Filter To JSON:
	- Transforms filter object into JSON search query
	- Argument: Filter Object
	- Return: JSON formatted search query

**Provide advanced sketches of UIs that clearly explain which features are connected to which underlying classes.**

![Alt text](https://github.com/johnlocker/NPOGeoFinder/blob/master/docs/flow_diagram.png)

![Alt text](https://github.com/johnlocker/NPOGeoFinder/blob/master/docs/sketch2.png)

**Provide a list of APIs and frameworks that you will be using to provide functionality in your app.**

+ Google Map API
+ NPO backstage API


**Provide a list of data sources, and database tables and fields (and their types) that you’ve decided to implement**

Objects:

+ Location object:
  - property 1: location as string 
  - property 2: location as latitude/longitude float
  - property 3: map borders as latitude/longitude floats

+ Filter object:
  - property 1: location object
  - property 2: date as string
  - property 3: television station as string
  - property 4: television program as string
  
+ NPO item object:
  - property 1: title as string
  - property 2: location object
  - property 3: date as date type
  - property 4: stream link as string


