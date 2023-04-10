import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';
import * as socket from '../../services/socket';
import { Route } from '@shoval/common';
import { RootState } from '../store';
import { addRoute, removeLatestRoute, setIsRoutePublished, setRoutes } from '../slices/routesSlice';

export const thunkCreateRoute = createAsyncThunk<void, Route, { state: RootState }>(
    'routes/createRoute',
    async (route, thunkAPI) => {
        thunkAPI.dispatch(addRoute(route));
        try {
            const results = await Promise.allSettled([api.upsertRoute(route), socket.upsertRoute(route)]);
            
            if (results.some(result => result.status === "rejected")) {
                console.error('Failed creating route');
                thunkAPI.dispatch(removeLatestRoute());
                return;
            }
        } catch (err: any) {
            console.error('Failed creating route');
            thunkAPI.dispatch(removeLatestRoute());
            return;
        }
        thunkAPI.dispatch(setIsRoutePublished(true));
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
