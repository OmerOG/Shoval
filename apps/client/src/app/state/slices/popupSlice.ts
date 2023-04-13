import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
    isOpen: boolean;
}

const initialState: PopupState = {
    isOpen: false,    
};

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        }
    }
});

export const { setIsOpen } = popupSlice.actions;

export default popupSlice.reducer;
