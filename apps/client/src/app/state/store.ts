import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import routesSlice from './slices/routesSlice';
import pointsSlice from './slices/pointsSlice';
import popupSlice from './slices/popupSlice';
import newPointSlice from './slices/newPointSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
    reducer: {
        app: appSlice,
        routes: routesSlice,
        points: pointsSlice,
        popup: popupSlice,
        newPoint: newPointSlice
    }
});
