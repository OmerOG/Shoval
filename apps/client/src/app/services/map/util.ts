import { Cartesian3, SceneTransforms } from "cesium";
import { MapPosition, ScreenPosition } from "./types";
import { viewer } from "./map-instance";

export function getScreenPositionFromMapPosition({ longitude, latitude, height }: MapPosition) {
	const mapCartesian = Cartesian3.fromDegrees(longitude, latitude, height);
	// const screenCartesian = SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, mapCartesian);
	const screenCartesian = viewer.scene.cartesianToCanvasCoordinates(mapCartesian);
	return { screenX: screenCartesian.x, screenY: screenCartesian.y };
}