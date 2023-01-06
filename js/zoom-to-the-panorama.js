    // Your access token can be found at: https://cesium.com/ion/tokens.
    // This is the default access token from your ion account

    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZDAyZDcyNy00NGQwLTRkODItYjYzZS0xODk1ZDEyZGVjZWIiLCJpZCI6MTA3ODg2LCJpYXQiOjE2NjMwODM2MTV9.nT8QVqASAbBjcvuHZyFKIjhB6r1ncT-hFgL8XXkXFnA';
    // Initialize the Cesium Viewer in the HTML element with the `cesium-container` ID.
    
    // Mapbox style provider
    // https://cesium.com/learn/cesiumjs/ref-doc/MapboxStyleImageryProvider.html#.ConstructorOptions
    const mapbox = new Cesium.MapboxStyleImageryProvider({
      //styleId: 'streets-v11',
      username: 'prattsavi',
      styleId: 'clbqn0k2t001g14rt5d4dqm6h',
      accessToken: 'pk.eyJ1IjoicHJhdHRzYXZpIiwiYSI6ImNsOGVzYjZ3djAycGYzdm9vam40MG40cXcifQ.YHBszyZW7pMQShx0GZISbw' //Pratt SAVI token
    });
    
    viewer = new Cesium.Viewer(
      'cesium-container',
      {
        //https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: true,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: true, 
        navigationInstructionsInitiallyVisible: true, //default
        imageryProvider: mapbox   
      }
    );

    let tileset = null
    //TODO we might want to order these in the order we want them to render?
    tileAssets = [ 1409427,1409426,1409424,1409420,1409417,1409405,1409402,1409397,1409393,1409386,1409380,1409375,1409369,1409363,1409359,1409353,1409338,1409337,1409329,1409327,1409322,1409317,1409313,1409300,1409252,1409251,1409209,1409206,1409170,1409165,1409137,1409123,1409122,1409102,1409101,1409087,1408942,1408936,1408935,1408930,1408929,1408927 ];
    tileAssets.forEach((tileAsset, i) => {
      tileset = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: Cesium.IonResource.fromAssetId(tileAsset),
            maximumScreenSpaceError: 16,
            maximumMemoryUsage: 512
        })
      )
    })

    //const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());   
    // Fly the camera to the Queens Museum at the given longitude, latitude, and height.
    viewer.camera.flyTo({
      destination : Cesium.Cartesian3.fromDegrees(-73.846707, 40.7458395, 400),   
      orientation : {
        heading : Cesium.Math.toRadians(0.0),
        pitch : Cesium.Math.toRadians(-15.0),
      }
    });
