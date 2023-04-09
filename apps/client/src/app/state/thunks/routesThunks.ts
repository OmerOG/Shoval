import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';
import * as socket from '../../services/socket';
import { Route } from '../../types';
import { RootState } from '../store';
import { addRoute, setIsRoutePublished, setRoutes } from '../slices/routesSlice';

export const thunkCreateRoute = createAsyncThunk<void, Route, { state: RootState }>(
    'routes/createRoute',
    async (route, thunkAPI) => {
        try {
            await Promise.allSettled([api.upsertRoute(route), socket.upsertRoute(route)]);
        } catch (err: any) {
            console.error('Failed creating route');
            return;
        }
        thunkAPI.dispatch(setIsRoutePublished(true));
        thunkAPI.dispatch(addRoute(route));
    }
);

export const thunkFetchRoutes = createAsyncThunk<void, void, { state: RootState }>(
    'routes/fetchRoutes',
    async (_, thunkAPI) => {
        try {
            const routes = await api.getRoutes();
            thunkAPI.dispatch(setRoutes(routes));
        } catch (err: any) {
            console.error('Failed fetching routes');
        }
    }
);
