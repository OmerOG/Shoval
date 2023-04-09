import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Point } from '../../types';
import { getPointMapPosition } from '../../services/util';
import { RootState } from '../store';

interface PointsState {
    points: Point[];
}

const initialState: PointsState = {
    points: []
};

export const pointsSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setPoints: (state, action: PayloadAction<Point[]>) => {
            state.points = action.payload;
        },
        addPoint: (state, action: PayloadAction<Point>) => {
            state.points.push(action.payload);
        }
    }
});

export const { setPoints, addPoint } = pointsSlice.actions;

export const selectPointsMapPositions = createSelector(
    (state: RootState) => state.points.points,
    (points) => points.map(getPointMapPosition)
);

export default pointsSlice.reducer;
