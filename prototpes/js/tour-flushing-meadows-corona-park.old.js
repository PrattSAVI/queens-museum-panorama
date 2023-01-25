const urlid = '1a2f1b172bb44a85986fb018f7f2c6b5'

const scrollingStory = document.querySelector('#scrolling-story');
const essay = document.querySelector('#essay'); // Floating window over the iframe
const iframe = document.querySelector('#api-frame');

var cameraPosition = null;
var targetlocation = null;
var initialCameraPosition = null;
var initialTouch = null;
var isDragging = false;
var cameraSpeed = -0.001;
var cameraScrollSpeed = 1.5;

// Camera Movement
function deltapos(x1, x2, step, i) {
  return x1 + (((x2 - x1) / step) * i)
}

//Camera Animation
function updateCamera() {
  if (viewer.api && viewer.camera && cameraPosition, targetlocation) {
      viewer.api.setCameraLookAt(cameraPosition, targetlocation, 0);
  }
  requestAnimationFrame(updateCamera);
}

// get IDs for the giver layer. Blend Object give things as Layer:XXX
function getIDs(result, layer) {
  let objs = result.children[0].children[0].children[0].children[0].children;

  let ids = [];
  objs.forEach(el => {
      if (el.name.includes(layer)) { // Filter Layer
          ids.push(el.instanceID)
      }
  });
  return ids
}

// get IDs for the giver layer. Blend Object give things as Layer:XXX
function getID_Reverse(result, layer) {
  let objs = result.children[0].children[0].children[0].children[0].children;
  let ids = [];
  objs.forEach(el => {
      if (!el.name.includes(layer)) { // Filter Layer
          ids.push(el.instanceID)
      }
  });
  return ids
}

// generic window resize listener event
function handleResize() {
  // 1. update marginTop of scrolling story so it is just below the fold.
  scrollingStory.style.marginTop = (window.innerHeight) + "px";

}


handleResize();
// Initializing viewer starts off the API. viewer.api
// This uses the first iframe
var viewer = new Viewer(urlid, iframe, function() {

  // Camera Set Up, position and target values
  let campos = viewer.camera.position
  cameraPosition = vec3.fromValues(campos[0], campos[1], campos[2])
  targetlocation = [50828, 9609, 480]; // Look at QM
  updateCamera(); // Initiate Animate

  // Get Object IDs and integrate into the scroll
  viewer.api.getSceneGraph(function(err, result) {

      //Get Ids to hide and show
      let past_prog = 0 // I'll use this to determine direction

      // 1st Scroll interaction is here.
      var scrollWindow = new ScrollWindow(essay, function(progress) {
          
          console.log(progress)

          // Viewer visibility
          var duration = [-770, -200];
          var path = [
              [52115, 10174, 1200],
              [52115, 10174, 800]
          ];

          let ids = getIDs(result, "Areas");
          var objs_count = ids.length

          // ---------------------------------- SHOW / HIDE -------------------------------------------
          var viewerEl = document.querySelector('#explore');

          // .Viewer contains iframes container, Show and hide the iframe, so fade
          if (progress > -200 && progress < 100) {
              if (progress < duration[0] || progress > duration[1]) {
                  viewerEl.classList.remove('visible'); // Make iframe invisible
              } else {
                  viewerEl.classList.add('visible');
              }
          }

          // Reset hidden objects
          if ((progress < 0 || progress > 100) && progress < 120) { // If the iframe has past
              ids.forEach(el => { viewer.api.show(el) })
          }

          // Which way is the site being scrolled
          if (progress > duration[0] & progress < duration[1]) {

              if (cameraPosition) { // Camera Movement over scroll
                  var x1 = path[0][0];
                  var x2 = path[1][0];
                  var y1 = path[0][1];
                  var y2 = path[1][1];
                  step = duration[1]
                      //console.log(progress, deltapos(x1, x2, step, progress), deltapos(y1, y2, step, progress), deltapos(path[0][2], path[1][2], step, progress))
                  cameraPosition = vec3.fromValues(deltapos(x1, x2, step, progress), deltapos(y1, y2, step, progress), deltapos(path[0][2], path[1][2], step, progress));
              }

          };

      });

  });

});