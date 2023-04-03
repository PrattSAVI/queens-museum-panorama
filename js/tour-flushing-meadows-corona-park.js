const tour = {
    initial: {
        cameraPosition: [
            5.195940932233644,
            1.6780199301379457,
            3.9918165338647533
        ],
        targetLocation: [
            4.7004569374068055,
            0.6458094397407731,
            -0.2227992369431553
        ]
    },
    stops: {
        "scene-2": {
            cameraPosition: [
                4.8127636935173115,
                0.6855157632821853,
                2.3813691577377445
            ],
            targetLocation: [
                4.785263562323396,
                0.6476057335162367,
                -0.17772033105607
            ]
        },
        "scene-3": {
            cameraPosition: [
                4.138264102297727,
                0.7632731658460976,
                -0.024417063715493903
            ],
            targetLocation: [
                4.82437099544185,
                0.880352828574846,
                -0.10336241574889667
            ]
        },
        "scene-4": {
            cameraPosition: [
                4.959267525550021,
                0.8188588102415298,
                -0.10000119800489597
            ],
            targetLocation: [
                4.879312434631584,
                0.8726927465770248,
                -0.1298668848378096
            ]
        },
        "scene-4-queens-theater": {
            cameraPosition: 
            [
                4.88644535910335,
                0.8719915599183169,
                -0.1493609002998632
            ],
            targetLocation: [
                4.886375092946965,
                0.8720586601119494,
                -0.1493845695052008
            ]
        },
        "scene-4-queens-museum": {
            cameraPosition: 
            [
                5.030914887246318,
                1.0230986389915713,
                -0.15429113991903726
            ],
            targetLocation: [
                5.052915052687819,
                0.8278641251131429,
                -0.17447377079987544
            ]
        },
        "scene-5": {
            cameraPosition: [
                5.611899650065933,
                0.9864411154698757,
                -0.11816701443209343
            ],
            targetLocation: [
                4.94727919473584,
                0.848766565102315,
                -0.22156967969098512
            ]
        },
        "scene-5-heliport-queens-zoo": {
            cameraPosition: [
                4.950690493366548,
                1.0354958410698263,
                -0.12910186620579905
            ],
            targetLocation: [
                4.991788073205243,
                1.0606729428473205,
                -0.14902302342785706
            ]
        },
        "scene-6": {
            cameraPosition: [
                5.7668082762690025,
                -0.4806790039312755,
                0.07762550590881402
            ],
            targetLocation: [
                5.609495937728617,
                -0.17341931521748113,
                -0.06786435227913111
            ]
        },
        "scene-7": {
            cameraPosition: [
                4.531741555318921,
                1.0450381822009316,
                -0.06453826212837364
            ],
            targetLocation: [
                4.457965972603452,
                1.117524559904139,
                -0.11400517389624781
            ]
        },
        "scene-8": {
            cameraPosition: [
                6.827751956587205,
                1.3808174348211353,
                0.5649929131399765
            ],
            targetLocation: [
                4.627626847133825,
                0.4750373379760289,
                -0.36984843960475583
            ]
        }
    }
}
//URL ID for the Pratt SAVI Sketchfab Model of the Queens Museum Panorama
//TODO: Change this to a model in a Queens Museum SketchFab account?
const urlid = '4bf5a7686e5847efb2b38f69621875ac'
const CAMERA_LOOK_AT_DURATION = 3 // is the duration of the move from the current camera to the new camera (a number, in seconds;

const scrollingStoryViewport = document.getElementById('scrolling-story-viewport');
const scrollingStory = document.getElementById('scrolling-story');
const iframe = document.getElementById('api-frame');

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
    const stepHeight = Math.floor(window.innerHeight * 1);
    d3.selectAll("#scrolling-story .browser-height").style("margin-top", stepHeight + "px");

    const justAboveTheFoldTop = d3.select(scrollingStoryViewport).node().getBoundingClientRect().height - d3.select(".step.just-above-the-fold h2").node().getBoundingClientRect().height - 27 - 10;
    d3.selectAll(".step.just-above-the-fold").style("margin-top", justAboveTheFoldTop + "px");
    //let's make it visible now so that we can't see the shift
    scrollingStory.classList.remove("hidden")

}

//Camera Animation
function updateCamera(cameraPosition, targetLocation) {
    if (viewer.api && viewer.camera && cameraPosition, targetLocation) {
        viewer.api.setCameraLookAt(cameraPosition, targetLocation, CAMERA_LOOK_AT_DURATION);
    }
    //requestAnimationFrame(updateCamera);
}

function printCameraLookAt(){

    viewer.api.getCameraLookAt(
        function(err, camera) {
            console.info(camera);
        }
    );

}


// Initializing viewer starts off the API. viewer.api
// This uses the first iframe
var viewer = new Viewer(urlid, iframe, function() {

    updateCamera(tour.initial.cameraPosition, tour.initial.targetLocation); 

});

// scrollama event handlers
function onStepEnter(response) {
    console.log(response);
    // response = { element, direction, index }

    //TODO document how to get these coordinates
    switch(response.element.id) {
        case "introduction":
            var position = tour.initial.cameraPosition;
            var target = tour.initial.targetLocation;
            updateCamera(position, target); 
            break            
        default:
            var position = tour.stops[response.element.id].cameraPosition;
            var target = tour.stops[response.element.id].targetLocation;
            updateCamera(position, target); 
    }

}

handleResize();

// initialize the scrollama
var scroller = scrollama();

scroller
    .setup({
        step: "#scrolling-story .step",
        //root: scrollingStoryViewport, // root works if scrollingStoryViewport is at the bottom of the browser window, but once we have a bottom margin or bottom = x, only container works
        container: scrollingStoryViewport,
        // offset: 1, // likewise if scrollingStoryViewport is not flush at the bottom of the browser, we can't use 1 otherwise the onStepEnters won't fire, so we have to use something < 1
        offset: 0.95, 
        debug: false
    })
    .onStepEnter(onStepEnter);