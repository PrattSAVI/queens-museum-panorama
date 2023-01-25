// Bounds for geocoder and pan
const NYC_BOUNDS = [-74.27355, 40.48247, -73.68204, 40.92910];

//Starting and max zoom for the map
const STARTING_ZOOM = 10;
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

let selectedLocationID = null;

function submitStory() {
  console.log("Sumbitting story!)")
  //TODO Don't allow the user to submit unless they have entered a story
  const yourStory = document.getElementById("your-story").value
  /*
  The action for the form is the "web app URL" which you get when you "deploy" the app in Google Sheets/Apps Script
  The web app basically takes the "name" of the form elements, and if it can match it to a column header in the google sheet, it will input it there, after the last row.
  For example, the contents ot the following element will be put in the "Sender's Name" column
  <input class="mdc-text-field__input" type="text" aria-labelledby="senders-name" name="Sender's Name" required>
  */

  let formData = new FormData();
  formData.append('Location', storyLocation);
  formData.append('Latitude', storyLatitude);
  formData.append('Longitude', storyLongitude);
  formData.append('Story', yourStory);

  /* TODO Do we want to submit any other information about the geo referenced location, e.g. the full location
      place_name : "Brooklyn Museum, 200 Eastern Pkwy, New York City, New York 11238, United States"
      or just
      text : "Brooklyn Museum"
  */

  // TODO show progress indicator and handle submitting twice
  fetch('https://script.google.com/macros/s/AKfycbwZ4tkU-9je_waA46r59Q2IkiiZ4WDr_ojnfqLQkegqd1tkdZUldP8lBI2MmL2xHVT1/exec', {
    method: 'post',
    body: formData
  })
  .then(response => response.json())
  .then(response => console.log(JSON.stringify(response)))
}


//Pratt SAVI/QM access token
//TODO Change to QM access token
mapboxgl.accessToken = 'pk.eyJ1IjoicHJhdHRzYXZpIiwiYSI6ImNsOGVzYjZ3djAycGYzdm9vam40MG40cXcifQ.YHBszyZW7pMQShx0GZISbw';

const map = new mapboxgl.Map({
  container: 'map', // Container ID
  style: 'mapbox://styles/prattsavi/clbqt0kf2000d14pfxbpyxnnu', // Map style to use
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

  // Initialize a new marker based on the results
  // TODO customise the style of the marker 
  const marker = new mapboxgl.Marker() 
    .setLngLat(e.result.center) // Marker [lng, lat] coordinates
    .addTo(map); // Add the marker to the map

  document.getElementById("your-story-and-submit").style.display = "block"

  //set global variables which are used when submitting the form
  storyLatitude = e.result.center[1]
  storyLongitude = e.result.center[0]
  storyLocation = e.result.text

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
    'url': 'mapbox://prattsavi.queens-museum-panorama-2d-v2',
    'attribution': 'TODO Attribution' 
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
    //convert to GEOJson, first the features
    const storiesFeatures = stories.map((story) => {
      return { 
        "type" : "Feature", 
        "geometry" : { 
          "type" : "Point", 
          "coordinates" : [story.longitude, story.latitude] 
        },
        "properties": {
          ...story
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
          'icon-image': 'marker-black'
        },
        'paint': {
          'icon-color': [
            'case', // Use the 'case' expression: https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/#case
            ['boolean', ['feature-state', 'selected'], false],
            '#35C775', // selected
            'black' // not selected
            ]
        }
      })

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

          const story = e.features[0].properties.story;
          const storyLocation = e.features[0].properties.location; //Note location refers to the location of the browser's URL, so we have to use a different variable name
           
          document.getElementById("selected-location-location").innerHTML = storyLocation
          document.getElementById("selected-location-story").innerHTML = story
          document.getElementById("selected-location").style.display = "block"

          //TODO Add a close button and make it work for stories at the same location

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