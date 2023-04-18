// Bounds for geocoder and pan
const NYC_BOUNDS = [-74.300, 40.400, -73.600, 41.000];

//Starting and max zoom for the map
const STARTING_ZOOM = 9;
const MAX_ZOOM = 16;

// Start the map here
const NYC_CENTER = [-73.846707, 40.7458395];

// We prioritize geocoding in proximity to the Queens Museum
const QUEENS_MUSEUM_COORDINATES = {
  longitude: -73.846707,
  latitude: 40.7458395
};

/* To hold the result when the geocoder matchers a location */
var storyLatitude = null;
var storyLongitude = null;
var storyLocation = null;
var storyLocationDetail = null;

let selectedLocationID = null;
let submittingStory = false;

let lastMarkerAdded = null;
let shareYourStoryVisible = false;


function closeSelectedLocation(){
  document.getElementById("selected-location").style.display = "none";
  document.getElementById("selected-location-close").style.display = "none";
};

function shareYourStoryToggle(){


  clearStory();

  if (shareYourStoryVisible){
    document.getElementById("your-story-and-submit").style.display = "none";
    document.getElementById("share-your-story-toggle").src = "images/icons/down_arrow.svg";
  }
  else{
    document.getElementById("your-story-and-submit").style.display = "block";
    document.getElementById("share-your-story-toggle").src = "images/icons/up_arrow.svg";
  }
  shareYourStoryVisible = !shareYourStoryVisible;

}

function clearStory(clearProgress=false){

  //Clear variables either way
  storyLatitude = null;
  storyLongitude = null;
  storyLocation = null;
  storyLocationDetail = null;
  selectedLocationID = null;
  submittingStory = false;

  document.getElementById("your-story").value = "";
  document.getElementById("publish-your-name").checked =  true;
  document.getElementById("your-name").value = "";
  document.querySelector("#geocoder input.mapboxgl-ctrl-geocoder--input").value = "";
  if (clearProgress){
    document.getElementById("submit-progress").classList.add("hidden");
    document.getElementById("submit-error-container").classList.add("hidden");
    document.getElementById("submit-success-container").classList.add("hidden");
  }

  if (lastMarkerAdded){
    lastMarkerAdded.remove();
    lastMarkerAdded = null;
  }

}

function submitStory() {
  if (!submittingStory){ //don't submit story twice
    submittingStory = true;
    console.log("Sumbitting story!)");
    //TODO Don't allow the user to submit unless they have entered a story
    document.getElementById("submit-progress").classList.remove("hidden");
    document.getElementById("submit-error-container").classList.add("hidden");
    document.getElementById("submit-success-container").classList.add("hidden");

    const yourStory = document.getElementById("your-story").value
    const publishYourName = document.getElementById("publish-your-name").checked ? "yes" : "no"
    const yourName = document.getElementById("your-name").value
    /*
    The action for the form is the "web app URL" which you get when you "deploy" the app in the Google Sheets/Apps Script
    The web app basically takes the "name" of the form elements, and if it can match it to a column header in the google sheet, it will input it there, after the last row.
    For example, the contents ot the following element will be put in the "Story" column
    <input type="text" name="Story">
    */

    let formData = new FormData();
    formData.append('Location', storyLocation);
    formData.append("Location Detail", storyLocationDetail)
    formData.append('Latitude', storyLatitude);
    formData.append('Longitude', storyLongitude);
    formData.append('Story', yourStory);
    formData.append('OK to publish name', publishYourName);
    formData.append('Name', yourName);

    fetch('https://script.google.com/macros/s/AKfycbyB50u5wLj9Gl3e13wE76P6OLdCeN_gUPVfjf-KDgsjOzNXybrh8xtG-85qFW3ADnzX/exec', {
      method: 'post',
      body: formData
    })
    .then(response => response.json())
    .then(response => {
      console.log(JSON.stringify(response));
      document.getElementById("submit-progress").classList.add("hidden");
      document.getElementById("submit-success-container").classList.remove("hidden");
      document.getElementById("submit-success-message").innerHTML = "Submitted!";
      clearStory()
      submittingStory = false;
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("submit-progress").classList.add("hidden");
      document.getElementById("submit-error-container").classList.remove("hidden");
      document.getElementById("submit-error-message").innerHTML = "Error: " + error.message + "?";
      submittingStory = false
    });
  }
}


//QM's Panorama public access token
mapboxgl.accessToken = 'pk.eyJ1IjoicXVlZW5zbXVzZXVtIiwiYSI6ImNsZzVoaGdhdjAzZXIzZm84bDByZXhlbXIifQ.BacI-pfRVLum9_2NaGajeA';

const map = new mapboxgl.Map({
  container: 'map', // Container ID
  style: 'mapbox://styles/queensmuseum/clg5h7wvm000d01o6wyjha5oq', // Map style to use
  customAttribution: '3D scan by CyArk, Built by Pratt SAVI',
  center: NYC_CENTER, // Starting position [lng, lat]
  zoom: STARTING_ZOOM, // Starting zoom level
  maxZoom: MAX_ZOOM,
  maxBounds: NYC_BOUNDS //constrain so user can't zoom or pan off NYC
});

// TODO, setup the map so you can't zoom or pan away from NYC

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Add geocoder to map, 
// Here is the basic example
// https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder/
// but we're going to modiify it to put the geocoder in our div instead of in the default position
// https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder-outside-the-map/
const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: 'Enter Address', // Placeholder text for the search bar
  bbox: NYC_BOUNDS, // Boundary for NYC
  proximity: QUEENS_MUSEUM_COORDINATES // Coordinates of Queens Museum
});

geocoder.on('result', e => {
  console.log(e);

  if (lastMarkerAdded){
    lastMarkerAdded.remove();
    lastMarkerAdded = null;
  }

  // Initialize a new marker based on the results
  // TODO customise the style of the marker 
  const marker = new mapboxgl.Marker()
    .setLngLat(e.result.center) // Marker [lng, lat] coordinates
    .addTo(map); // Add the marker to the map

  lastMarkerAdded = marker

  document.getElementById("your-story-and-submit").style.display = "block";

  //set global variables which are used when submitting the form
  storyLatitude = e.result.center[1];
  storyLongitude = e.result.center[0];
  storyLocation = e.result.text;
  storyLocationDetail = e.result.place_name;

});

// Instead of this:
//    // Add the geocoder to the map
//    map.addControl(geocoder);
// do this:
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

// After the map style has loaded on the page,
map.on('load', () => {

  map.addSource('2d-scan', {
    'type': 'raster',
    'url': 'mapbox://queensmuseum.panorama-2d'
  });
  
  map.addLayer({
    id: '2d-scan',
    'type': 'raster',
    'source': '2d-scan',
    'paint': {
    'raster-fade-duration': 0
    }
  });

  /*
    The following URLs are from the "File" -> "Share" -> "Publish to the Web" the sheet "Published Stories" of the spreadsheet:
    CSV version:
    https://docs.google.com/spreadsheets/d/e/2PACX-1vSoE3LqrHKuJI4MFBPYR5OnlJrRFCTrHAZhQuHJUxPI8O7j1tK1lUNoMjCnUMMBjIjdJdMXvFxRaZyC/pub?gid=1228347493&single=true&output=csv
    HTML version:
    https://docs.google.com/spreadsheets/d/e/2PACX-1vSoE3LqrHKuJI4MFBPYR5OnlJrRFCTrHAZhQuHJUxPI8O7j1tK1lUNoMjCnUMMBjIjdJdMXvFxRaZyC/pubhtml?gid=1228347493&single=true
    Note, it appears that Google caches these URLs or doesn't do a great version of publishing the most recent data, so we're going to try to bust their cache by appending a timestamp at the end of the URL
  */

  const PUBLISHED_STORIES_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSoE3LqrHKuJI4MFBPYR5OnlJrRFCTrHAZhQuHJUxPI8O7j1tK1lUNoMjCnUMMBjIjdJdMXvFxRaZyC/pub?gid=1228347493&single=true&output=csv'
  
  d3.csv(PUBLISHED_STORIES_URL + '&cachebuster=' + Date.now()).then((stories) => {
    
    //group the stories by lat/long. This will be a an array of all of the stories, with the first and second elements the latitude and longitdue, followed by the complete data:
    //   [
    //     [
    //         "40.7458395",
    //         "-73.846707",
    //         [
    //             {
    //                 "date": "1/6/2023 11:00:03",
    //                 "location": "Queens Museum of Art",
    //                 "latitude": "40.7458395",
    //                 "longitude": "-73.846707",
    //                 "story": "Here's my story about the Queens Museum",
    //                 "published_name": "",
    //                 "status": "Published"
    //             }
    //         ]
    //     ],
    //     [
    //         "40.780135",
    //         "-73.96527",
    //         [
    //             {
    //                 "date": "1/31/2023 23:29:55",
    //                 "location": "Central Park",
    //                 "latitude": "40.780135",
    //                 "longitude": "-73.96527",
    //                 "story": "My story about central park",
    //                 "published_name": "a name",
    //                 "status": "Published"
    //             },
    //             {
    //                 "date": "2/1/2023 0:00:24",
    //                 "location": "Central Park",
    //                 "latitude": "40.780135",
    //                 "longitude": "-73.96527",
    //                 "story": "this is what happened to me in central park",
    //                 "published_name": "",
    //                 "status": "Published"
    //             },
    //             {
    //                 "date": "2/1/2023 0:01:40",
    //                 "location": "Central Park",
    //                 "latitude": "40.780135",
    //                 "longitude": "-73.96527",
    //                 "story": "Another central park story",
    //                 "published_name": "",
    //                 "status": "Published"
    //             }
    //         ]
    //     ]
    // ]    



    const storiesByLatLong = d3.flatGroup(stories, d => d.latitude, d => d.longitude)
    
    //convert to GEOJson, first the features
    const storiesFeatures = storiesByLatLong.map((latLong) => {
      return { 
        "type" : "Feature", 
        "geometry" : { 
          "type" : "Point", 
          "coordinates" : [latLong[1], latLong[0]] // expecting: longitude, latitude
        },
        "properties": {
          "stories": latLong[2] 
        }
      }
    })

    const storiesGeoJSON = 
    {
      "type" : "FeatureCollection",
      "features" : storiesFeatures
    }

    map.addSource('stories', { 
      type: 'geojson', 
      data: storiesGeoJSON,
      generateId: true // This ensures that all features have unique IDs 
    });

    map.loadImage('./images/marker_black.png',(error, image) => {
      if (error) throw error;
      // Apart from other hacks (loading an image into a font, or having separate layers, it's not possible to change the color of a marker dynamically, e.g. on hover etc., so we're going to use sdf images, see here: https://docs.mapbox.com/help/troubleshooting/using-recolorable-images-in-mapbox-maps/)
      // As it turns out, we don't even need to convert the image to an sdf (e.g. by following this post: https://stackoverflow.com/questions/63299999/how-can-i-create-sdf-icons-used-in-mapbox-from-png), we can just set the sdf: true option on a regular png
      map.addImage('marker-black', image, { sdf: true });

      map.addLayer({
        'id': 'stories',
        'type': 'symbol',
        'source': 'stories',
        'layout': {
          'icon-image': 'marker-black',
          'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.5, 16, 0.75]
        },
        'paint': {
          'icon-color': [
            'case', // Use the 'case' expression: https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/#case
            ['boolean', ['feature-state', 'selected'], false],
            '#35C775', // selected
            '#FA8CA3' // not selected
            ]
        }
      })

      map.on('mouseenter', 'stories', () => {
        map.getCanvas().style.cursor = 'pointer'
      });
      map.on('mouseleave', 'stories', () => {
        map.getCanvas().style.cursor = ''
      });

      map.on('click', 'stories', (e) => {

        if (e.features.length > 0) {
          if (selectedLocationID !== null) {
            map.setFeatureState(
              { source: 'stories', id: selectedLocationID },
              { selected: false }
            );
          }
          selectedLocationID = e.features[0].id;
          map.setFeatureState(
            { source: 'stories', id: selectedLocationID },
            { selected: true }
          )

          // https://github.com/mapbox/mapbox-gl-js/issues/2434
          // per ^ this apparent bug in mapbox-gl, even though the geojson spec support s
          // objects in  properties, if we pass objects in, we get string-i-fied objects back in mapbox-gl
          // so lets use JSON.parse...
          const storiesAtLocation = JSON.parse(e.features[0].properties.stories);

          d3.select("#selected-location")
            .selectAll("div.selected-location-story")
            .remove();

          const selectedLocationStories = d3.select("#selected-location")
            .selectAll("div.selected-location-story")
            .data(storiesAtLocation)
            .enter()
            .append("div")
            .classed("selected-location-story", true);

          selectedLocationStories
            .append("div")
            .classed("selected-location-story-location", true)
            .text(function(d) { return d.location; });

          selectedLocationStories
            .append("div")
            .classed("selected-location-story-story", true)
            .text(function(d) { return d.story; });

          selectedLocationStories
            .append("div")
            .classed("selected-location-story-name", true)
            .classed("hidden", function(d) { return d.published_name != "" ? false : true ; })
            .text(function(d) { return `- ${d.published_name != "" ? d.published_name : ""}`; });

          document.getElementById("selected-location").style.display = "block";
          document.getElementById("selected-location-close").style.display = "block";

        }
      });
    })
  })
});


let lastZoom = map.getZoom();
const zoomThreshold = 13;

map.on('zoom', () => {
  const currentZoom = map.getZoom();
  if (currentZoom > lastZoom) {
    // zoom in
    if (currentZoom > zoomThreshold) {
      //hide 2d-scan
      map.setLayoutProperty('2d-scan', 'visibility', 'none');
    }
  } else {
    // zoom out
    if (currentZoom <= zoomThreshold) {
      //show 2d-scan
      map.setLayoutProperty(
        '2d-scan',
        'visibility',
        'visible'
        );
    }
  }

  lastZoom = currentZoom;
});