import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MapPosition } from '../../services/map/types';

interface NewPointState {
    mapPosition: MapPosition | undefined;
}

const initialState: NewPointState = {
    mapPosition: undefined
};

export const newPointSlice = createSlice({
    name: 'newPoint',
    initialState,
    reducers: {
        setMapPosition: (state, action: PayloadAction<MapPosition>) => {
            state.mapPosition = action.payload;
        },
        clearMapPosition: (state) => {
            state.mapPosition = undefined;
        }
    }
});

export const { setMapPosition, clearMapPosition } = newPointSlice.actions;

export default newPointSlice.reducer;
