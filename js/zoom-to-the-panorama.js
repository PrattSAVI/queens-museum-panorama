    // Your access token can be found at: https://cesium.com/ion/tokens.
    // This is the default access token from your ion account

    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZDAyZDcyNy00NGQwLTRkODItYjYzZS0xODk1ZDEyZGVjZWIiLCJpZCI6MTA3ODg2LCJpYXQiOjE2NjMwODM2MTV9.nT8QVqASAbBjcvuHZyFKIjhB6r1ncT-hFgL8XXkXFnA';
    // Initialize the Cesium Viewer in the HTML element with the `cesium-container` ID.
    const viewer = new Cesium.Viewer('cesium-container', {
      terrainProvider: Cesium.createWorldTerrain()
    });    
    // Add Cesium OSM Buildings, a global 3D buildings layer.
    //const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());   
    // Fly the camera to the Queens Museum at the given longitude, latitude, and height.
    viewer.camera.flyTo({
      destination : Cesium.Cartesian3.fromDegrees(-73.846707, 40.7458395, 400),   
      orientation : {
        heading : Cesium.Math.toRadians(0.0),
        pitch : Cesium.Math.toRadians(-15.0),
      }
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