import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';
import * as socket from '../../services/socket';
import { Point } from '@shoval/common';
import { RootState } from '../store';
import { addPoint, removeLatestPoint, setPoints } from '../slices/pointsSlice';

export const thunkCreatePoint = createAsyncThunk<void, Point, { state: RootState }>(
    'points/creatPoint',
    async (point, thunkAPI) => {
        thunkAPI.dispatch(addPoint(point));
        try {
            const results = await Promise.allSettled([api.upsertPoint(point), socket.upsertPoint(point)]);

            if (results.some(result => result.status === "rejected")) {
                console.error('Failed creating point');
                thunkAPI.dispatch(removeLatestPoint());
                return;
            }
        } catch (err: any) {
            console.error('Failed creating point');
            thunkAPI.dispatch(removeLatestPoint());
            return;
        }
    }
);

export const thunkFetchPoints = createAsyncThunk<void, string, { state: RootState }>(
    'points/fetchPoints',
    async (routeId, thunkAPI) => {
        try {
            const points = await api.getPoints(routeId);
            thunkAPI.dispatch(setPoints(points));
        } catch (err: any) {
            console.error('Failed fetching points');
        }
    }
);
