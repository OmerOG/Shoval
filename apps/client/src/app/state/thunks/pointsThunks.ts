import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';
import * as socket from '../../services/socket';
import { Point } from '../../types';
import { RootState } from '../store';
import { addPoint, setPoints } from '../slices/pointsSlice';

export const thunkCreatePoint = createAsyncThunk<void, Point, { state: RootState }>(
    'points/creatPoint',
    async (point, thunkAPI) => {
        try {
            await Promise.allSettled([api.upsertPoint(point), socket.upsertPoint(point)]);
        } catch (err: any) {
            console.error('Failed creating point');
            return;
        }
        thunkAPI.dispatch(addPoint(point));
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
