import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppMode = 'view' | 'create';

interface AppState {
    mode: AppMode;
}

const initialState: AppState = {
    mode: 'create'
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<AppMode>) => {
            state.mode = action.payload;
        }
    }
});

export const { setMode } = appSlice.actions;

export default appSlice.reducer;
