let viewer = null;
let selectedLocation = null;

let marker = null
let previousLocation = null

const locations = [
  { 
    label:"Queens Museum",
    longitude: -73.846707,
    latitude: 40.7458395,
    height: 125, 
    imageURL: "images/city-landmarks-tour/queens-museum.jpg",
    imageCaption: "Queens Museum Caption"
  },
  { 
    label:"Empire State Building",
    longitude: -73.9856554,
    latitude: 40.7484356,
    height: 700, //With the spire, it's 443m tall, however the scan amplified the height by a factor of 2. 700 seems to work
    imageURL: "images/city-landmarks-tour/empire-state-building.jpg",
    imageCaption: "Empire State Building Caption"
  }
];

$(document).ready(function(){

  document.getElementById("fly-out-control-close").addEventListener("click", function(){ document.getElementById("fly-out").classList.remove("visible")});
  document.getElementById("fly-out-control-next").addEventListener("click", function(){ flyTo(selectedLocation.nextLocation)});
  document.getElementById("fly-out-control-previous").addEventListener("click", function(){ flyTo(selectedLocation.previousLocation)});
  
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

  //TODO we might want to order these in the order we want them to render?
  // 1409363 is the QM asset
  tileAssets = [ 1409363, 1409427,1409426,1409424,1409420,1409417,1409405,1409402,1409397,1409393,1409386,1409380,1409375,1409369,1409359,1409353,1409338,1409337,1409329,1409327,1409322,1409317,1409313,1409300,1409252,1409251,1409209,1409206,1409170,1409165,1409137,1409123,1409122,1409102,1409101,1409087,1408942,1408936,1408935,1408930,1408929,1408927 ];
  tileAssets.forEach((tileAsset, i) => {
    viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
          url: Cesium.IonResource.fromAssetId(tileAsset),
          maximumScreenSpaceError: 16,
          maximumMemoryUsage: 512
      })
    )
  })

  locations.forEach((location, i) => {
    var entity = viewer.entities.add({
      name : location.label,
      properties: location,
      position : Cesium.Cartesian3.fromDegrees(location.longitude, location.latitude, location.height ? location.height : 200),
      billboard : {
        image : 'images/marker_ltgreen.svg',
        sizeInMeters:true,
        width : 200,
        height : 200
      }
    });
    //store the marker entity in the location object
    location.entity = entity
    
    //also create pointers so we can navigate the array of locations (via previous/next pointers
    location.previousLocation = previousLocation
    if (previousLocation)
      previousLocation.nextLocation = location
  
    //remember this location for the next iteration
    previousLocation = location
  })
  
  // disable double click on a location
  viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  
  viewer.selectedEntityChanged.addEventListener(function(selectedEntity) {
    if (Cesium.defined(selectedEntity)) {
        if (Cesium.defined(selectedEntity.name)) {
          console.log('Selected ' + selectedEntity.name)
          console.log('Image Caption ' + selectedEntity.properties.imageCaption)
          document.getElementById("fly-out").classList.add("visible")
          document.getElementById("fly-out-title").innerHTML = selectedEntity.name
          document.getElementById("fly-out-image").src = selectedEntity.properties.imageURL
          document.getElementById("fly-out-image-caption").innerHTML = selectedEntity.properties.imageCaption
        } else {
          console.log('Unknown entity selected.');
        }
    } else {
      console.log('Deselected.');
    }
  });
  
  d3.select("#side-panel-locations")
    .selectAll("li")
    .data(locations)
    .enter().append("li")
      .append("a")
        .on("click", function(event, d) {
          flyTo(d)
        })
        .text(function(d) { return d.label; })  
  
  // Lock camera to a point looking down on NYC
  var center = Cesium.Cartesian3.fromDegrees(-73.9330226, 40.708081, 2000);
  var transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);
  viewer.scene.camera.lookAtTransform(
    transform, 
    new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 2000)
  );
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
  if (location){
    selectedLocation = location
    viewer.flyTo(
      location.entity,
      {
        duration: 3.0, //Take 3 seconds to fly to the location
        offset: new Cesium.HeadingPitchRange(
          Cesium.Math.toRadians(29), //Heading, we offset to 29 degrees to the NE, which is the orientation of manhattan, but we might want to change this.
          Cesium.Math.toRadians(-45), //Pitch
          2000 //Range in metres
        )
      }
    ).then(
      function(value) {
        /* code if successful */ 
        console.log("flyTo successful")
        // Lock the camera so it looks at the location
        var center = Cesium.Cartesian3.fromDegrees(location.longitude, location.latitude, location.height ? location.height : 200);
        var transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);
        viewer.scene.camera.lookAtTransform(
          transform, 
          new Cesium.HeadingPitchRange(Cesium.Math.toRadians(29), Cesium.Math.toRadians(-45), 2000)
        );
      },
      function(error) {
        /* code if some error */ 
      }
    )
  }
}