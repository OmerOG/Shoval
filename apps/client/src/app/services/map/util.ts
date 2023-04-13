import { Cartesian3, SceneTransforms } from 'cesium';
import { MapPosition, ScreenPosition } from './types';
import { viewer } from './map-instance';
import { Point as GeoJsonPoint } from 'geojson';

export function getScreenPositionFromMapPosition({ longitude, latitude, height }: MapPosition) {
    const mapCartesian = Cartesian3.fromDegrees(longitude, latitude, height);
    // const screenCartesian = SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, mapCartesian);
    const screenCartesian = viewer.scene.cartesianToCanvasCoordinates(mapCartesian);
    return { screenX: screenCartesian.x, screenY: screenCartesian.y };
}

export function getCartesianFromMapPosition(position: MapPosition): Cartesian3 {
    return Cartesian3.fromDegrees(position.longitude, position.latitude, position.height);
}

export function getGeoJsonPointFromMapPosition(position: MapPosition): GeoJsonPoint {
    const { latitude, longitude, height } = position;
    return {
        type: 'Point',
        coordinates: [latitude, longitude, height]
    };
}

export function getMapPositionFromGeoJsonPoint(point: GeoJsonPoint): MapPosition {
    const [latitude, longitude, height] = point.coordinates;
    return { latitude, longitude, height };
}
