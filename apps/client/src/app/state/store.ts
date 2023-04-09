import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import routesSlice from './slices/routesSlice';
import pointsSlice from './slices/pointsSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
    reducer: {
        app: appSlice,
        routes: routesSlice,
        points: pointsSlice
    }
});
