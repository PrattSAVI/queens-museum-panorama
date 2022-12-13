//Pratt SAVI/QM access token
//TODO Change to QM access token
mapboxgl.accessToken = 'pk.eyJ1IjoicHJhdHRzYXZpIiwiYSI6ImNsOGVzYjZ3djAycGYzdm9vam40MG40cXcifQ.YHBszyZW7pMQShx0GZISbw';

const map = new mapboxgl.Map({
  container: 'map', // Container ID
  style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
  center: [-73.846707, 40.7458395], // Starting position [lng, lat]
  zoom: 10 // Starting zoom level
});

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
  bbox: [-74.27355, 40.48247, -73.68204, 40.92910], // Boundary for NYC
  proximity: {
    longitude: -73.846707,
    latitude: 40.7458395
  } // Coordinates of Queens Museum
});

// Instead of this:
//    // Add the geocoder to the map
//    map.addControl(geocoder);
// do this:
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

const marker = new mapboxgl.Marker() // Initialize a new marker for Queens Museum?
  .setLngLat([-73.846707, 40.7458395]) // Marker [lng, lat] coordinates
  .addTo(map); // Add the marker to the map




// After the map style has loaded on the page,
map.on('load', () => {

  /* This is how we might add a georeferenced tiled image of the 2d scan, but until that's ready, we'll just add a sample layer */
  map.addSource('2d-scan', {
    'type': 'raster',
    'url': 'mapbox://prattsavi.queens-museum-panorama-2d',
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

    map.addSource('stories', { type: 'geojson', data: storiesGeoJSON });

    map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',(error, image) => {
      if (error) throw error;
      map.addImage('custom-marker', image);

      map.addLayer({
        'id': 'stories',
        'type': 'symbol',
        'source': 'stories',
        'layout': {
          'icon-image': 'custom-marker'
        }
      })
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