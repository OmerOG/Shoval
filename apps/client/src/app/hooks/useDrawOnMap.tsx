import { useEffect } from 'react';
import { drawOnMap, removeAllDrawings } from '../services/map/drawing';
import { addCtrlDoubleClickEvent } from '../services/map/events';
import { v4 as uuid } from 'uuid';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { thunkCreateRoute } from '../state/thunks/routesThunks';
import { Point } from '@shoval/common';
import { MapPositionEvent } from '../services/map/types';
import { thunkCreatePoint } from '../state/thunks/pointsThunks';

export function useDrawOnMap() {
    const mode = useAppSelector((state) => state.app.mode);
    const isRoutePublished = useAppSelector((state) => state.routes.isPublishedRoute);
    const route = useAppSelector((state) => state.routes.currentRoute);
    const points = useAppSelector((state) => state.points.points);
    const disptach = useAppDispatch();

    useEffect(() => {
        if (!route) {
            removeAllDrawings();
            return;
        }

        drawOnMap(
            route.id,
            points.map((point) => {
                const [latitude, longitude, height] = point.geography.coordinates;
                return { id: point.id, position: { latitude, longitude, height } };
            })
        );
    }, [points, route]);

    useEffect(() => {
        if (!route) return;

        const cleanupFunction = addCtrlDoubleClickEvent(({ latitude, longitude, height }: MapPositionEvent) => {
            if (!isRoutePublished && points.length === 0) {
                disptach(thunkCreateRoute(route));
            }

            const timeNow = new Date().toISOString();
            const point: Point = {
                id: uuid(),
                geography: {
                    type: 'Point',
                    coordinates: [latitude, longitude, height]
                },
                routeId: route.id,
                description: 'this is a description',
                timestamp: timeNow,
                createdAt: timeNow,
                updatedAt: timeNow
            };
            disptach(thunkCreatePoint(point));
        });
        return cleanupFunction;
    }, [mode, route, points, isRoutePublished]);
}
