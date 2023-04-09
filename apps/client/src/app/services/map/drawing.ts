import { Cartesian3, Color, HeightReference, PolylineArrowMaterialProperty } from 'cesium';
import { viewer } from './map-instance';
import { MapPosition } from './types';

type MarkerParameters = { id: string; position: MapPosition };

export function drawOnMap(routeId: string, markers: MarkerParameters[]): void {
    const positions: MapPosition[] = [];

    removeAllDrawings();
    markers.forEach((marker) => {
        positions.push(marker.position);
        addMarker(marker);
    });
    addArrow(routeId, positions);
}

export function setVisibility(isVisible: boolean): void {
    viewer.entities.show = isVisible;
}

export function removeAllDrawings(): void {
    viewer.entities.removeAll();
}

function addMarker({ id, position }: MarkerParameters): void {
    viewer.entities.add({
        id,
        position: Cartesian3.fromDegrees(position.longitude, position.latitude),
        point: {
            pixelSize: 15,
            color: Color.fromAlpha(Color.fromCssColorString('#39FF14'), 0.7),
            heightReference: HeightReference.CLAMP_TO_GROUND
        }
    });
}

function addArrow(id: string, positions: MapPosition[]): void {
    viewer.entities.add({
        id,
        polyline: {
            positions: positions.map((position) => Cartesian3.fromDegrees(position.longitude, position.latitude)),
            width: 10,
            material: new PolylineArrowMaterialProperty(Color.WHITESMOKE),
            clampToGround: true
        }
    });
}
