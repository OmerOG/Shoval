import { Camera, Cartographic, createWorldTerrain, Rectangle, Viewer } from 'cesium';

// Israel Coordinates
Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromCartographicArray([
    Cartographic.fromDegrees(35.61953536765566, 33.36904941313795),
    Cartographic.fromDegrees(35.16813963965287, 33.16217366435166),
    Cartographic.fromDegrees(34.21595218448991, 31.299431493969042),
    Cartographic.fromDegrees(34.90824652926151, 29.490438603278438)
]);

// Initial zoom is better on my screen
Camera.DEFAULT_VIEW_FACTOR = -0.04;

export const viewer = new Viewer('cesiumContainer', {
    terrainProvider: createWorldTerrain(),
    timeline: false,
    fullscreenButton: false,
    animation: false,
    selectionIndicator: false,
    geocoder: false,
    baseLayerPicker: false,
    homeButton: false,
    vrButton: false,
    infoBox: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    sceneModePicker: false
});

viewer.scene.camera.percentageChanged = 0;
