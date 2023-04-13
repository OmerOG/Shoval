import { useEffect } from 'react';
import { addCtrlDoubleClickEvent } from '../services/map/events';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { MapPositionEvent } from '../services/map/types';
import { setMapPosition } from '../state/slices/newPointSlice';

export function useListenToPointCreation() {
    const mode = useAppSelector((state) => state.app.mode);
    const isRoutePublished = useAppSelector((state) => state.routes.isRoutePublished);
    const isRouteHidden = useAppSelector((state) => state.routes.isRouteHidden);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const shouldDenyNewPointCreation = () => isRouteHidden || (!isRoutePublished && mode === 'view');
        if (shouldDenyNewPointCreation()) return;

        const cleanupFunction = addCtrlDoubleClickEvent(({ latitude, longitude, height }: MapPositionEvent) => {
            dispatch(setMapPosition({ longitude, latitude, height }));
        });
        return cleanupFunction;
    }, [mode, isRoutePublished]);
}
