import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Route } from '../../types';

interface RoutesState {
    isPublishedRoute: boolean;
    isRouteHidden: boolean;
    currentRoute: Route | undefined;
    routes: Route[];
}

const initialState: RoutesState = {
    isPublishedRoute: false,
    isRouteHidden: false,
    currentRoute: undefined,
    routes: []
};

export const routesSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {
        setCurrentRoute: (state, action: PayloadAction<Route>) => {
            state.currentRoute = action.payload;
        },
        setIsRoutePublished: (state, action: PayloadAction<boolean>) => {
            state.isPublishedRoute = action.payload;
        },
        setIsRouteHidden: (state, action: PayloadAction<boolean>) => {
            state.isRouteHidden = action.payload;
        },
        setCurrentRouteName: (state, action: PayloadAction<string>) => {
            if (!state.currentRoute) return;
            state.currentRoute.name = action.payload;
        },
        clearCurrentRoute: (state) => {
            state.currentRoute = undefined;
            state.isPublishedRoute = false;
        },
        setRoutes: (state, action: PayloadAction<Route[]>) => {
            state.routes = action.payload;
        },
        addRoute: (state, action: PayloadAction<Route>) => {
            state.routes.push(action.payload);
        }
    }
});

export const {
    setCurrentRoute,
    clearCurrentRoute,
    setRoutes,
    addRoute,
    setCurrentRouteName,
    setIsRouteHidden,
    setIsRoutePublished
} = routesSlice.actions;

export default routesSlice.reducer;
