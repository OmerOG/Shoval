import { useEffect, useMemo } from 'react';
import { socket } from './services/socket';
import { addPoint, updatePoint } from './state/slices/pointsSlice';
import { Point } from '@shoval/common';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { useListenToPointCreation } from './hooks/useListenToPointCreation';
import { useMapClick } from './hooks/useMapClick';
import { NewPointPopup } from './components/NewPointPopup';
import { ExistingPointPopup } from './components/ExistingPointPopup';
import { useDrawOnMap } from './hooks/useDrawOnMap';
import { MainWindow } from './components/MainWindow/MainWindow';
import { useRemoveLoader } from './hooks/useRemoveLoader';
import './App.less';

export default function App() {
    const routeId = useAppSelector((state) => state.routes.currentRoute?.id);
    const isRouteHidden = useAppSelector((state) => state.routes.isRouteHidden);
    const clickedEntity = useMapClick();
    const mapPosition = useAppSelector((state) => state.newPoint.mapPosition);
    const dispatch = useAppDispatch();

    useRemoveLoader();
    useListenToPointCreation();
    useDrawOnMap();

    const handleNewPoint = (point: Point) => {
        dispatch(addPoint(point));
    };

    const handleUpdatePoint = (point: Point) => {
        dispatch(updatePoint(point));
    };

    useEffect(() => {
        if (!routeId) return;
        socket.emit('subscribe', routeId);
        socket.on('point', handleNewPoint);
        socket.on('updatePoint', handleUpdatePoint);

        return () => {
            socket.emit('unsubscribe', routeId);
            socket.off('point', handleNewPoint);
            socket.off('updatePoint', handleUpdatePoint);
        };
    }, [routeId]);

    const shouldDisplayPopup = useMemo(() => routeId && !isRouteHidden, [routeId, isRouteHidden]);

    return (
        <>
            <MainWindow />
            {shouldDisplayPopup && (
                <>
                    {mapPosition && <NewPointPopup mapPosition={mapPosition} />}
                    {clickedEntity && <ExistingPointPopup point={clickedEntity} />}
                </>
            )}
        </>
    );
}

