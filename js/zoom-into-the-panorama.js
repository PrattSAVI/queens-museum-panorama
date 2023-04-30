    // Your access token can be found at: https://cesium.com/ion/tokens.
    // This is the default access token from your ion account

    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZDAyZDcyNy00NGQwLTRkODItYjYzZS0xODk1ZDEyZGVjZWIiLCJpZCI6MTA3ODg2LCJpYXQiOjE2NjMwODM2MTV9.nT8QVqASAbBjcvuHZyFKIjhB6r1ncT-hFgL8XXkXFnA';
    // Initialize the Cesium Viewer in the HTML element with the `cesium-container` ID.
    
    // Mapbox style provider
    // https://cesium.com/learn/cesiumjs/ref-doc/MapboxStyleImageryProvider.html#.ConstructorOptions
    const mapbox = new Cesium.MapboxStyleImageryProvider({
      username: 'queensmuseum',
      styleId: 'clg5hyuhy009001qob7elqvbz',
      accessToken: 'pk.eyJ1IjoicXVlZW5zbXVzZXVtIiwiYSI6ImNsZzVoaGdhdjAzZXIzZm84bDByZXhlbXIifQ.BacI-pfRVLum9_2NaGajeA' // QM Panorama public access token
    });
    
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
        navigationHelpButton: true, 
        navigationInstructionsInitiallyVisible: true, //default
        imageryProvider: mapbox,
        skyBox: false  
      }
    );

    viewer.scene.frameState.creditDisplay.addDefaultCredit(new Cesium.Credit("3D scan by CyArk, Built by Pratt SAVI"));

    // set the background color to white:
    viewer.scene.backgroundColor = Cesium.Color.clone(Cesium.Color.GREY);

    // TODO we might want to order these in the order we want them to render?
    // 1409363 is the QM asset
    tileAssets = [ 1409363, 1410856, 1409427,1409426,1409424,1409420,1409417,1409405,1409402,1409397,1409393,1409386,1409380,1409375,1409369,1409359,1409353,1409338,1409337,1409329,1409327,1409322,1409317,1409313,1409300,1409252,1409251,1409209,1409206,1409170,1409165,1409137,1409123,1409122,1409102,1409101,1409087,1408942,1408936,1408935,1408930,1408929,1408927 ];
    const numberOfTilesetsToLoad = null; //Give us the ability to test loading a smaller number of tilesets
    // const numberOfTilesetsToLoad = 10; //Let us test loading a smaller number of tilesets

    tileAssets.forEach((tileAsset, i) => {
      if ((!numberOfTilesetsToLoad) || (i < numberOfTilesetsToLoad)){
        tileset = viewer.scene.primitives.add(
          new Cesium.Cesium3DTileset({
              url: Cesium.IonResource.fromAssetId(tileAsset),
              maximumScreenSpaceError: 64,
              maximumMemoryUsage: 10,
              skipLevelOfDetail: true, // Determines if level of detail skipping should be applied during the traversal.
              debugShowMemoryUsage: false,
              maximumScreenSpaceError: 200, // Default: 16. The maximum screen space error used to drive level of detail refinement.
              baseScreenSpaceError : 1024,
              skipScreenSpaceErrorFactor : 16,
              skipLevels : 1,
              immediatelyLoadDesiredLevelOfDetail : false,
              loadSiblings : false,
              cullWithChildrenBounds : true
          })
        )
        }
    })

    viewer.scene.globe.tileCacheSize = 1000 // Default Value: 100

    viewer.camera.flyTo({
      destination : Cesium.Cartesian3.fromDegrees(-73.846707, 40.737, 1200),   
      orientation : {
        heading : Cesium.Math.toRadians(29.0),
        pitch : Cesium.Math.toRadians(-30.0),
      }
    });
