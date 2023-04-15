import ClearRouteButton from '../ClearRouteButton';
import ExistingRouteForm from '../ExistingRouteForm/ExistingRouteForm';
import HideRouteButton from '../HideRouteButton';
import NewRouteForm from '../NewRouteForm';
import ToggleModeButton from '../ToggleModeButton';
import { ThemeProvider } from '@emotion/react';
import theme from '../../theme';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { thunkFetchRoutes } from '../../state/thunks/routesThunks';
import { useEffect } from 'react';
import './MainWindow.less';

export function MainWindow() {
    const mode = useAppSelector((state) => state.app.mode);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(thunkFetchRoutes());
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div className="box">
                <ToggleModeButton />
                {mode === 'create' ? <NewRouteForm /> : <ExistingRouteForm />}
                <HideRouteButton />
                <ClearRouteButton />
            </div>
        </ThemeProvider>
    );
}
