import { Point } from '../types';
import { MapPosition } from './map/types';

export function getPointMapPosition(point: Point): MapPosition {
    const [latitude, longitude, height] = point.geography.coordinates;
    return { latitude, longitude, height };
}
