import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Point } from '@shoval/common';

interface PointsState {
    points: Point[];
    isCreatingPoint: boolean;
}

const initialState: PointsState = {
    points: [],
    isCreatingPoint: false
};

export const pointsSlice = createSlice({
    name: 'points',
    initialState,
    reducers: {
        setPoints: (state, action: PayloadAction<Point[]>) => {
            state.points = action.payload;
        },
        clearPoints: (state) => {
            state.points = [];
        },
        addPoint: (state, action: PayloadAction<Point>) => {
            state.points.push(action.payload);
        },
        updatePoint: (state, action: PayloadAction<Point>) => {
            const updatedPoint = action.payload;
            const index = state.points.findIndex((point) => point.id === updatedPoint.id);
            state.points[index] = updatedPoint;
        },
        removeLatestPoint: (state) => {
            state.points.pop();
        },
        setIsCreatingPoint: (state, action: PayloadAction<boolean>) => {
            state.isCreatingPoint = action.payload;
        }
    }
});

export const { setPoints, clearPoints, addPoint, updatePoint, removeLatestPoint } = pointsSlice.actions;

export default pointsSlice.reducer;
