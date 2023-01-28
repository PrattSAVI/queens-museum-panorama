// If the location has no height, what to use
const DEFAULT_LOCATION_HEIGHT = 200;

const BILLBOARD_IMAGE = 'images/marker_pink.svg';
const BILLBOARD_HEIGHT = 200;
const BILLBOARD_WIDTH = 200;

const MAXIMUM_ZOOM_DISTANCE = 50000;
const MINIMUM_ZOOM_DISTANCE = 1000;

const FLYTO_OFFSET_HEADING = 29; // 29 degrees to the east of north, to line up with Manhattan's grid
const FLYTO_OFFSET_PITCH = -30; // 30 degrees down
const FLYTO_OFFSET_RANGE = 2500; // metres

let viewer = null;
let selectedLocation = null;

let marker = null;
let previousLocation = null;

let locations = null; 
// we load this dynamically from /data/city-landmarks-tour-locations.csv, and it is in the basic form of:
// [
//   { 
//     name:"Queens Museum",
//     longitude: -73.846707,
//     latitude: 40.7458395,
//     height: 150, 
//     image_url: "images/city-landmarks-tour/queens-museum.jpg",
//     image_caption: "Queens Museum Caption"
//   },
//   { 
//     name:"Empire State Building",
//     longitude: -73.9856554,
//     latitude: 40.7484356,
//     height: 700, //With the spire, it's 443m tall, however the scan amplified the height by a factor of 2. 700 seems to work
//     image_url: "images/city-landmarks-tour/empire-state-building.jpg",
//     image_caption: "Empire State Building Caption"
//   }
// ];

$(document).ready(function(){

  document.getElementById("fly-out-control-close").addEventListener("click", function(){ document.getElementById("fly-out").classList.remove("visible")});
  document.getElementById("fly-out-control-next").addEventListener("click", function(){ showFlyout(selectedLocation.nextLocation); flyTo(selectedLocation.nextLocation)});
  document.getElementById("fly-out-control-previous").addEventListener("click", function(){ showFlyout(selectedLocation.previousLocation); flyTo(selectedLocation.previousLocation)});
  
  // Your access token can be found at: https://cesium.com/ion/tokens.
  // This is the default access token from your ion account
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZDAyZDcyNy00NGQwLTRkODItYjYzZS0xODk1ZDEyZGVjZWIiLCJpZCI6MTA3ODg2LCJpYXQiOjE2NjMwODM2MTV9.nT8QVqASAbBjcvuHZyFKIjhB6r1ncT-hFgL8XXkXFnA';

  // Mapbox style provider
  // https://cesium.com/learn/cesiumjs/ref-doc/MapboxStyleImageryProvider.html#.ConstructorOptions
  const mapbox = new Cesium.MapboxStyleImageryProvider({
    //styleId: 'streets-v11',
    username: 'prattsavi',
    styleId: 'clbqn0k2t001g14rt5d4dqm6h',
    accessToken: 'pk.eyJ1IjoicHJhdHRzYXZpIiwiYSI6ImNsOGVzYjZ3djAycGYzdm9vam40MG40cXcifQ.YHBszyZW7pMQShx0GZISbw' //Pratt SAVI token
  });

  // Initialize the Cesium Viewer in the HTML element with the `cesium-container` ID.
  viewer = new Cesium.Viewer(
    'cesium-container',
    {
      //https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions
      animation: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      sceneModePicker: false,
      selectionIndicator: false,
      timeline: false,
      navigationHelpButton: false, //we might need to reposition this, or recreate it?
      navigationInstructionsInitiallyVisible: false, //default true 
      imageryProvider: mapbox     
    }
  );

  // TODO we might want to order these in the order we want them to render?
  // 1409363 is the QM asset
  tileAssets = [ 1409363, 1410856, 1409427,1409426,1409424,1409420,1409417,1409405,1409402,1409397,1409393,1409386,1409380,1409375,1409369,1409359,1409353,1409338,1409337,1409329,1409327,1409322,1409317,1409313,1409300,1409252,1409251,1409209,1409206,1409170,1409165,1409137,1409123,1409122,1409102,1409101,1409087,1408942,1408936,1408935,1408930,1408929,1408927 ];
  tileAssets.forEach((tileAsset, i) => {
    viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
          url: Cesium.IonResource.fromAssetId(tileAsset),
          maximumScreenSpaceError: 16,
          maximumMemoryUsage: 512
      })
    )
  })

  // how far away can we zoom out
  viewer.scene.screenSpaceCameraController.maximumZoomDistance = MAXIMUM_ZOOM_DISTANCE;
  // how close can we zoom in
  viewer.scene.screenSpaceCameraController.minimumZoomDistance = MINIMUM_ZOOM_DISTANCE;

  viewer.scene.globe.tileCacheSize = 1000 // Default Value: 100

  // load the locations from ./data/data/city-landmarks-tour-locations.csv
  d3.csv("./data/city-landmarks-tour-locations.csv").then((_locations) => {

    _locations.forEach(location => {
      location.longitude = +location.longitude;
      location.latitude = +location.latitude;
      location.height = +location.height;
    });

    locations = _locations

    locations.forEach((location, i) => {
      //this might be handy to use as a key
      location.location_index = i
      var entity = viewer.entities.add({
        name : location.name,
        properties: { locationIndex: i}, //this doesn't seem to like storing a proper object, e.g. when I tried storying an object with objects as properties, it didn't like it
        
        position : Cesium.Cartesian3.fromDegrees(location.longitude, location.latitude, location.height ? location.height : DEFAULT_LOCATION_HEIGHT),
        // model: {
        //   uri: "./3d/map_pointer/scene.gltf",
        //   minimumPixelSize: 25,
        //   scale: 50,
        //   maximumScale: 2000,
        // }
        billboard : {
          image : BILLBOARD_IMAGE,
          sizeInMeters:true,
          width : BILLBOARD_WIDTH,
          height : BILLBOARD_HEIGHT
        }
      });
      // https://cesium.com/learn/cesiumjs/ref-doc/Billboard.html#scaleByDistance
      // Set a billboard's scaleByDistance to scale by 1 when the
      // camera is 5000 meters from the billboard and 2 as
      // the camera distance approaches 20000 meters.
      entity.billboard.scaleByDistance = new Cesium.NearFarScalar(5000, 1, 20000, 2);

      //store the marker entity in the location object
      location.entity = entity;
      
      //also create pointers so we can navigate the array of locations (via previous/next pointers
      location.previousLocation = previousLocation;
      if (previousLocation)
        previousLocation.nextLocation = location;
    
      //remember this location for the next iteration
      previousLocation = location;
    })

    d3.select("#side-panel-locations")
    .selectAll("li")
    .data(locations)
    .enter().append("li")
      .attr("id", function(d) { return `side-panel-location-${d.location_index}`; })
      .on("click", function(event, d) {
        flyTo(d)
        showFlyout(d)
      })
      .append("a")
        .text(function(d) { return d.name; }) 
    
    flyTo(locations[0])

  });
  
  // disable double click on a location
  viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  
  viewer.selectedEntityChanged.addEventListener(function(selectedEntity) {
    if (Cesium.defined(selectedEntity)) {
        if (Cesium.defined(selectedEntity.name)) {
          const location = locations[selectedEntity.properties.locationIndex]
          console.log('Selected ' + selectedEntity.name)
          console.log('Image Caption ' + location.image_caption)
          showFlyout(location)
          flyTo(location)
        } else {
          console.log('Unknown entity selected.');
        }
    } else {
      console.log('Deselected.');
    }
  });

  // If the mouse is over the billboard, change its scale and color
  var element = document.getElementById('cesium-container');
  handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function(movement) {
    var pickedObject = viewer.scene.pick(movement.endPosition);
    if (Cesium.defined(pickedObject)) {
      element.style.cursor = 'pointer';
    } else {
      element.style.cursor = 'default';
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  
  // // Lock camera to a point looking down on NYC
  // var center = Cesium.Cartesian3.fromDegrees(-73.9330226, 40.708081, 0);
  // var transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);
  // viewer.scene.camera.lookAtTransform(
  //   transform, 
  //   new Cesium.HeadingPitchRange(
  //     Cesium.Math.toRadians(29), //Heading, we offset to 29 degrees to the NE, which is the orientation of manhattan, but we might want to change this.
  //     Cesium.Math.toRadians(-90), //Look straight down
  //     50000)
  // );
});

function onToggleSidePanel(){
  const sidePanel = document.getElementById("side-panel")
  sidePanel.classList.toggle("collapsed")
  // TODO use an icon, not text
  if (sidePanel.classList.contains("collapsed"))
    document.getElementById("toggle-side-panel-label").textContent = "Open"
  else
    document.getElementById("toggle-side-panel-label").textContent = "Close"
}

function onToggleSidePanel(){
  const sidePanel = document.getElementById("side-panel")
  sidePanel.classList.toggle("collapsed")
  // TODO use an icon, not text
  if (sidePanel.classList.contains("collapsed"))
    document.getElementById("toggle-side-panel-label").textContent = "Open"
  else
    document.getElementById("toggle-side-panel-label").textContent = "Close"
}

function flyTo(location){
  if (location && (selectedLocation == null || selectedLocation.name != location.name)){ //only fly to a new location
    if (selectedLocation){
      document.getElementById("side-panel-location-" + selectedLocation.location_index).classList.remove("selected");
    }
    document.getElementById("side-panel-location-" + location.location_index).classList.add("selected");

    selectedLocation = location

    viewer.flyTo(
      location.entity,
      {
        duration: 3.0, //Take 3 seconds to fly to the location
        offset: new Cesium.HeadingPitchRange(
          Cesium.Math.toRadians(FLYTO_OFFSET_HEADING), //Heading, we offset to 29 degrees to the NE, which is the orientation of manhattan, but we might want to change this.
          Cesium.Math.toRadians(FLYTO_OFFSET_PITCH), //Pitch
          FLYTO_OFFSET_RANGE //Range in metres
        )
      }
    ).then(
      function(value) {
        /* code if successful */ 
        console.log("flyTo successful")
        // Lock the camera so it looks at the location
        var center = Cesium.Cartesian3.fromDegrees(location.longitude, location.latitude, location.height ? location.height : DEFAULT_LOCATION_HEIGHT);
        var transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);
        viewer.scene.camera.lookAtTransform(
          transform, 
          new Cesium.HeadingPitchRange(
            Cesium.Math.toRadians(FLYTO_OFFSET_HEADING), 
            Cesium.Math.toRadians(FLYTO_OFFSET_PITCH), 
            FLYTO_OFFSET_RANGE //Range in metres
          )
        );
      },
      function(error) {
        /* code if some error */ 
      }
    )
  }
}

function showFlyout(location) {
  document.getElementById("fly-out").classList.add("visible");
  document.getElementById("fly-out-title").innerHTML = location.name;
  document.getElementById("fly-out-image").src = location.image_url;
  document.getElementById("fly-out-image-caption").innerHTML = location.image_caption;
  
  if (location.previousLocation == null)
    document.getElementById("fly-out-control-previous").classList.remove("enabled")
  else
    document.getElementById("fly-out-control-previous").classList.add("enabled")

  if (location.nextLocation == null)
    document.getElementById("fly-out-control-next").classList.remove("enabled")
  else
    document.getElementById("fly-out-control-next").classList.add("enabled")

};