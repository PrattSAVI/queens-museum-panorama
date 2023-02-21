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
                4.151882071706647,
                0.6811372498971952,
                -0.02787594569011345
            ],
            targetLocation: [
                4.837988964850769,
                0.7982169126259439,
                -0.10682129772351641
            ]
        },
        "scene-4": {
            cameraPosition: [
                5.234873032669884,
                0.6783852795753871,
                -0.11722169181213456
            ],
            targetLocation: [
                4.9048423994836625,
                0.8958428437560108,
                -0.1571824438428475
            ]
        },
        "scene-5": {
            cameraPosition: [
                5.598123335156016,
                1.2167965156173548,
                -0.03016527139268138
            ],
            targetLocation: [
                4.9406551302023605,
                0.8706317103949578,
                -0.2081056675592846
            ]
        },
        "scene-6": {
            cameraPosition: [
                5.683661893244516,
                -0.5543508194888556,
                0.037976669286635054
            ],
            targetLocation: [
                5.489376248015667,
                -0.25928847070816746,
                -0.08657968499175124
            ]
        },
        "scene-7": {
            cameraPosition: [
                3.860030330939561,
                1.273784349634381,
                0.031081535467549153
            ],
            targetLocation: [
                4.213965303607448,
                1.123142340694579,
                -0.029758089335884717
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

const scrollingStoryViewport = document.getElementById('scrolling-story-viewport');
const scrollingStory = document.getElementById('scrolling-story');
const iframe = document.getElementById('api-frame');

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
    const stepHeight = Math.floor(window.innerHeight * 1);
    d3.selectAll(".step.browser-height").style("margin-top", stepHeight + "px");

    const justAboveTheFoldTop = d3.select(scrollingStoryViewport).node().getBoundingClientRect().height - d3.select(".step.just-above-the-fold h2").node().getBoundingClientRect().height - 27;
    d3.selectAll(".step.just-above-the-fold").style("margin-top", justAboveTheFoldTop + "px");
    //let's make it visible now so that we can't see the shift
    scrollingStory.classList.remove("hidden")

}

//Camera Animation
function updateCamera(cameraPosition, targetLocation) {
    if (viewer.api && viewer.camera && cameraPosition, targetLocation) {
        viewer.api.setCameraLookAt(cameraPosition, targetLocation, 2);
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