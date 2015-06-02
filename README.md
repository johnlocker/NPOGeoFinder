# NPO GeoFinder 
#### (Programmeerproject Juni 2015)

Student: Jonathan Klaiber <br>
Student number: 10004077


### Application Goals

The goal of the NPO Geo Finder application is to give users an application by which they can find an NPO item (for example: a news fragment, a documentary, episode of a television program) based on a location. The user is prompted to insert a location (for example: Amsterdam) and receives a list of the most proximate NPO items to that location.

Supplementary features: A extra option where users can filter a NPO program (for example: "Tegenlicht") and get all locations on a map associated with that program. The same sort of filter could be implemented with different television stations ("de omroepen").

<br>

**What features will be exposed to the end user, what problem will be solved for the user.**

The users will be able to search for NPO items based on a location. The general problem that will be solved for the user is that an NPO item can also be found based on location and not only based on date (as it happens now on "uitzendinggemist.nl").


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
- displaying of nearst locations on website
- obtaining extra information (link to wach, duration, etc.) for NPO items to show in tooltip

**How the platform will facilitate creating your application, and what external components (APIs) you need to make certain features possible.**

The external compoments are the NPO backstage API and the google maps API.

**Potential problems that may arise during development and what possibilities you have to overcome these.**

I see potential problems with regard to the fetching of the data, especially how easily the data can be obtained and how fast it will be. The
exact implementation of the data fetching mechanism will be considerably determined by its speed. 
Another problem with regard to the NPO API could be the availability of geo location data. At the introduction presentation of the NPO API, the
announcement was that geo location data of various NPO programs will be available. However, when I did a quick search on the NPO API, I only
found geo location data associated to the NPO Journalitiek program.

**A short review of similar applications or visualizations in terms of features and possibly technical aspects.**

I found a [Youtube video search by location](http://ctrlq.org/youtube/). On this website a location can be specified and based on that
location Youtube videos are shown that have been created. The Youtube video finder application seems to function well in terms of specifying
a location. The instructions are clear and the handling is intuitive. However, the linking of a loation to a youtube video does not work well.
As I see it, the specified location has to match the location of the youtube video exactly, otherwise no results are found. Videos are seldomly 
found due to the exact machting constraint. With regard to my application, the location video matching should be based on approximaty and not on
the exact location. The "tooltip" of the Youtube video search by location is nicely implemented. The "tooltip" shows a small preview of the video 
that was found. With a click on the video preview, the actual video player in a extended tooltip is opened and the video is played. For my application a link to an 
external source (e.g. "uitzendinggemist.nl") will be sufficient. 
