import { useEffect, useMemo } from 'react';
import ClearRouteButton from './components/ClearRouteButton';
import ExistingRouteForm from './components/ExistingRouteForm/ExistingRouteForm';
import HideRouteButton from './components/HideRouteButton';
import NewRouteForm from './components/NewRouteForm';
import ToggleModeButton from './components/ToggleModeButton';
import { socket } from './services/socket';
import { thunkFetchRoutes } from './state/thunks/routesThunks';
import { addPoint, updatePoint } from './state/slices/pointsSlice';
import { Point } from '@shoval/common';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import './App.less';
import { useListenToPointCreation } from './hooks/useListenToPointCreation';
import { useMapClick } from './hooks/useMapClick';
import { NewPointPopup } from './components/NewPointPopup';
import { ExistingPointPopup } from './components/ExistingPointPopup';
import { useDrawOnMap } from './hooks/useDrawOnMap';

function removeLoaderElement(): void {
    const loaderElement = document.querySelector('.loader-container');
    if (loaderElement) loaderElement.remove();
}

function App() {
    const mode = useAppSelector((state) => state.app.mode);
    const routeId = useAppSelector((state) => state.routes.currentRoute?.id);
    const isRouteHidden = useAppSelector((state) => state.routes.isRouteHidden);
    const clickedEntity = useMapClick();
    const mapPosition = useAppSelector((state) => state.newPoint.mapPosition);

    const dispatch = useAppDispatch();

    useListenToPointCreation();
    useDrawOnMap();

    const handleNewPoint = (point: Point) => {
        dispatch(addPoint(point));
    };

    const handleUpdatePoint = (point: Point) => {
        dispatch(updatePoint(point));
    };

    useEffect(() => {
        removeLoaderElement();
        dispatch(thunkFetchRoutes());
    }, []);

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

    const shouldDisplayPopup = useMemo(() => {
        return routeId && !isRouteHidden && (mapPosition || clickedEntity);
    }, [routeId, isRouteHidden, mapPosition, clickedEntity]);

    return (
        <>
            {shouldDisplayPopup &&
                (mapPosition ? (
                    <NewPointPopup mapPosition={mapPosition} />
                ) : (
                    clickedEntity && <ExistingPointPopup point={clickedEntity} />
                ))}
            <ThemeProvider theme={theme}>
                <div className="box">
                    <ToggleModeButton />
                    {mode === 'create' ? <NewRouteForm /> : <ExistingRouteForm />}
                    <HideRouteButton />
                    <ClearRouteButton />
                </div>
            </ThemeProvider>
        </>
    );
}

export default App;

