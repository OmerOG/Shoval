import { useEffect } from 'react';
import ClearRouteButton from './components/ClearRouteButton';
import ExistingRouteForm from './components/ExistingRouteForm';
import HideRouteButton from './components/HideRouteButton';
import NewRouteForm from './components/NewRouteForm';
import ToggleModeButton from './components/ToggleModeButton';
import { useDrawOnMap } from './hooks/useDrawOnMap';
import { socket } from './services/socket';
import { thunkFetchRoutes } from './state/thunks/routesThunks';
import { PointModals } from './components/PointModals';
import { addPoint } from './state/slices/pointsSlice';
import { Point } from '@shoval/common';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import './App.less';

function removeLoaderElement(): void {
    const loaderElement = document.querySelector('.loader-container');
    if (loaderElement) loaderElement.remove();
}

function App() {
    const mode = useAppSelector((state) => state.app.mode);
    const routeId = useAppSelector((state) => state.routes.currentRoute?.id);
    const dispatch = useAppDispatch();

    const handleNewPoint = (point: Point) => {
        dispatch(addPoint(point));
    };

    useEffect(() => {
        removeLoaderElement();
        dispatch(thunkFetchRoutes());
    }, []);

    useEffect(() => {
        if (!routeId) return;
        socket.emit('subscribe', routeId);
        socket.on('point', handleNewPoint);

        return () => {
            socket.emit('unsubscribe', routeId);
            socket.off('point', handleNewPoint);
        };
    }, [routeId]);

    useDrawOnMap();

    return (
        <>
            <ThemeProvider theme={theme}>
                <PointModals />
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

