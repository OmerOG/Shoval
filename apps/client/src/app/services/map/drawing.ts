import { Color, Entity, HeightReference, PolylineArrowMaterialProperty } from 'cesium';
import { viewer } from './map-instance';
import { MapPosition } from './types';
import { getCartesianFromMapPosition } from './util';

type MarkerParameters = { id: string; position: MapPosition };

let arrows: Entity[] = [];

export function drawOnMap(routeId: string, markers: MarkerParameters[]): void {
    const positions: MapPosition[] = [];

    markers.forEach((marker) => {
        positions.push(marker.position);
        upsertMarker(marker);
    });
    upsertArrow(routeId, positions);
}

export function setVisibility(isVisible: boolean): void {
    viewer.entities.show = isVisible;
}

export function removeAllDrawings(): void {
    viewer.entities.removeAll();
}

export function upsertMarker({ id, position }: MarkerParameters): void {
    if (viewer.entities.getById(id)) return;
    viewer.entities.add({
        id,
        position: getCartesianFromMapPosition(position),
        point: {
            pixelSize: 15,
            color: Color.fromAlpha(Color.fromCssColorString('#39FF14'), 0.7),
            heightReference: HeightReference.CLAMP_TO_GROUND
        }
    });
}

export function removeMarker(id: string): void {
    viewer.entities.removeById(id);
}

function addArrow(id: string, positions: MapPosition[]): void {
    arrows.push(viewer.entities.add({
        id,
        polyline: {
            positions: positions.map(getCartesianFromMapPosition),
            width: 10,
            material: new PolylineArrowMaterialProperty(Color.WHITESMOKE),
            clampToGround: true
        }
    }));
}

function upsertArrow(id: string, positions: MapPosition[]): void {
    const arrow = arrows.find(arrow => arrow.id === id);
    if (!arrow?.polyline) {
        addArrow(id, positions);
        return;
    };
    // @ts-ignore
    arrow.polyline.positions = positions.map(getCartesianFromMapPosition);
}

