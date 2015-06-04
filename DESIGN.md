# Design Document NPO GeoFinder
#### (Programmeerproject Juni 2015)

**Provide a list of classes and public methods (and their return types and/or arguments) that you’ve decided to implement**

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
  
 Methods:
 
1. NPO API method:
	- SET search query
	- GET argument based on search query
	- TRANS put return data into NPO item object
	
2. Markers method:
	- ADD adds property of NPO item object to marker
	- PLACE places marker on map

  

**Provide advanced sketches of UIs that clearly explain which features are connected to which underlying classes.**

![Alt text](https://github.com/johnlocker/NPOGeoFinder/blob/master/docs/flow_diagram.png)

![Alt text](https://github.com/johnlocker/NPOGeoFinder/blob/master/docs/sketch2.png)

**Provide a list of APIs and frameworks that you will be using to provide functionality in your app.**

+ Google Map API
+ NPO backstage API

<!---
**Provide a list of data sources, and database tables and fields (and their types) that you’ve decided to implement**
-->

