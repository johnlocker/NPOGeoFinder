# NPO GeoFinder 
#### (Programmeerproject Juni 2015)

Student: Jonathan Klaiber <br>
Student number: 10004077


### Application Goals

The goal of the NPO Geo Finder application is to give users an application by which they can find an NPO item (for example: a news fragment, a documentary, episode of a television show) based on a location. The user is prompted to insert a location (for example: Amsterdam) and receives a list of the most proximate NPO items to that location.

Supplementary features: A tab where users can choose a NPO television show (for example: "Tegenlicht") and get all locations on a map associated with that show. The same feature could be implemented with different television stations ("de omroepen").

<br>

**What features will be exposed to the end user, what problem will be solved for the user.**

The users will be able to search for NPO items based on a location. The general problem that will be solved for the user is that an NPO item can also be selected based on location and not only based on date (as it happens now on "uitzendinggemist.nl").


**A preliminary sketch of what the application will look like.**

Sketch:

![Alt text](https://github.com/johnlocker/NPOGeoFinder/blob/master/docs/sketch.jpg)

**What data sets and data sources will you need, how you will get the data into the right form for your app.**

I will use the NPO Backstage API to obtain the geo location data. I don't know yet if a python script that scrapes the data from time to time (e.g. once daily) or a dynamical JavaScript script will be used to fetch the geo location data. The google maps API will be used to obtain the geo location of the prompted location. 

**What separate parts of the application can be defined (decomposing the problem) and how these should work together.**

Separate Parts:

- main website
- transforming inserted "character" location into geo location data
- obtaining (dynamically or via a preprocessed file on the server) geo location data of all avaliable NPO items
- distance computation between location and NPO items
- displaying of 10 nearst locations on webpage
- obtaining extra information (link to wach, duration, etc.) for NPO items to show in tooltip

**How the platform will facilitate creating your application, and what external components (APIs) you need to make certain features possible.**

The external compoments are the NPO backstage API and the google maps API.

**Potential problems that may arise during development and what possibilities you have to overcome these.**

I see potential problems with regard to the fetching of the data, especially how easily the data can be obtained and how fast it will be (it should be not to slow).

**A short review of similar applications or visualizations in terms of features and possibly technical aspects.**
