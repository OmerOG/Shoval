import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Point } from '@shoval/common';
import PointForm from './PointForm/PointForm';
import { thunkCreatePoint } from '../state/thunks/pointsThunks';
import { MapPosition } from '../services/map/types';
import { thunkCreateRoute } from '../state/thunks/routesThunks';
import { v4 as uuid } from 'uuid';
import { getGeoJsonPointFromMapPosition } from '../services/map/util';
import { MapPopup } from './MapPopup';
import { clearMapPosition } from '../state/slices/newPointSlice';

interface Props {
    mapPosition: MapPosition;
}

export function NewPointPopup({ mapPosition }: Props) {
    const route = useAppSelector((state) => state.routes.currentRoute);
    const isRoutePublished = useAppSelector((state) => state.routes.isRoutePublished);
    const dispatch = useAppDispatch();

    const handleNewPoint = useCallback(
        (timestamp: string, description: string) => {
            if (!route) return;

            if (!isRoutePublished) {
                dispatch(thunkCreateRoute(route));
            }

            dispatch(
                thunkCreatePoint({
                    id: uuid(),
                    geography: getGeoJsonPointFromMapPosition(mapPosition),
                    routeId: route.id,
                    description,
                    timestamp,
                    createdAt: timestamp,
                    updatedAt: timestamp
                })
            );
            dispatch(clearMapPosition());
        },
        [isRoutePublished, route, mapPosition]
    );

    return (
        <MapPopup mapPosition={mapPosition}>
            <PointForm handleSubmit={handleNewPoint} handleCancel={() => dispatch(clearMapPosition())} />;
        </MapPopup>
    );
}
