import { MapPosition, MapPositionEventCallback } from './types';
import {
    Billboard,
    Cartesian2,
    Cartographic,
    Entity,
    KeyboardEventModifier,
    Math,
    ScreenSpaceEventHandler,
    ScreenSpaceEventType
} from 'cesium';
import { viewer } from './map-instance';

export function addCtrlDoubleClickEvent(callback: MapPositionEventCallback): () => void {
    viewer.screenSpaceEventHandler.setInputAction(
        (event: ScreenSpaceEventHandler.PositionedEvent) => {
            const coordinates = getMapPositionFromWindowPosition(event.position);

            if (!coordinates) return;

            callback({ screenX: event.position.x, screenY: event.position.y, ...coordinates });
        },
        ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
        KeyboardEventModifier.CTRL
    );

    return () => {
        viewer.screenSpaceEventHandler.removeInputAction(
            ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
            KeyboardEventModifier.CTRL
        );
    };
}

export function addEntityClickEvent(callback: (id?: string) => void): () => void {
    viewer.screenSpaceEventHandler.setInputAction((event: ScreenSpaceEventHandler.PositionedEvent) => {
        let id = undefined;

        const object = viewer.scene.pick(event.position);
        if (object) {
            id = object.id.id;
        }

        callback(id);
    }, ScreenSpaceEventType.LEFT_CLICK);

    return () => {
        viewer.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
    };
}

export function addPreRenderEvent(callback: (...args: any[]) => void): () => void {
    viewer.scene.preRender.addEventListener(callback);

    return () => {
        viewer.scene.preRender.removeEventListener(callback);
    };
}

export function addCameraMoveEvent(callback: (...args: any[]) => void): () => void {
    viewer.scene.camera.changed.addEventListener(callback);

    return () => {
        viewer.scene.camera.changed.removeEventListener(callback);
    };
}

export function addCameraStartEndMoveEvent(
    moveStartCallback: (...args: any[]) => void,
    moveEndCallback: (...args: any[]) => void
): () => void {
    viewer.camera.moveStart.addEventListener(moveStartCallback);
    viewer.camera.moveEnd.addEventListener(moveEndCallback);

    return () => {
        viewer.camera.moveStart.removeEventListener(moveStartCallback);
        viewer.camera.moveEnd.removeEventListener(moveEndCallback);
    };
}

function getMapPositionFromWindowPosition(windowPosition: Cartesian2): MapPosition | undefined {
    const ray = viewer.camera.getPickRay(windowPosition);
    if (!ray) return undefined; // picked coordinates in outer space
    const intersection = viewer.scene.globe.pick(ray, viewer.scene);
    const cartographic = Cartographic.fromCartesian(intersection!!);

    return {
        longitude: Math.toDegrees(cartographic.longitude),
        latitude: Math.toDegrees(cartographic.latitude),
        height: cartographic.height
    };
}
