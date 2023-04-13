import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Route } from '@shoval/common';

interface RoutesState {
    isRoutePublished: boolean;
    isRouteHidden: boolean;
    currentRoute: Route | undefined;
    routes: Route[];
}

const initialState: RoutesState = {
    isRoutePublished: false,
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
            state.isRoutePublished = action.payload;
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
            state.isRoutePublished = false;
        },
        setRoutes: (state, action: PayloadAction<Route[]>) => {
            state.routes = action.payload;
        },
        addRoute: (state, action: PayloadAction<Route>) => {
            state.routes.push(action.payload);
        },
        removeLatestRoute: (state) => {
            state.routes.pop();
        }
    }
});

export const {
    setCurrentRoute,
    clearCurrentRoute,
    setRoutes,
    addRoute,
    removeLatestRoute,
    setCurrentRouteName,
    setIsRouteHidden,
    setIsRoutePublished
} = routesSlice.actions;

export default routesSlice.reducer;
