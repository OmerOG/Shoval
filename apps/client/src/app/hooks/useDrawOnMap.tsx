import { useEffect } from 'react';
import { drawOnMap, removeAllDrawings } from '../services/map/drawing';
import { useAppSelector } from '../state/hooks';

export function useDrawOnMap() {
    const routeId = useAppSelector((state) => state.routes.currentRoute?.id);
    const points = useAppSelector((state) => state.points.points);
    const mapPosition = useAppSelector((state) => state.newPoint.mapPosition);

    useEffect(() => {
        if (!routeId) {
            removeAllDrawings();
            return;
        }

        const markers = points.map((point) => {
            const [latitude, longitude, height] = point.geography.coordinates;
            return { id: point.id, position: { latitude, longitude, height } };
        });

        if (mapPosition) {
            markers.push({ id: 'draft-point', position: mapPosition });
        }

        drawOnMap(routeId, markers);
    }, [points, routeId, mapPosition]);
}
