import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isLocked: boolean;
  showBiometricPrompt: boolean;
}

const initialState: AppState = {
  isLocked: false,
  showBiometricPrompt: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLocked: (state, action: PayloadAction<boolean>) => {
      state.isLocked = action.payload;
    },
    setShowBiometricPrompt: (state, action: PayloadAction<boolean>) => {
      state.showBiometricPrompt = action.payload;
    },
  },
});

export const { setLocked, setShowBiometricPrompt } = appSlice.actions;
export default appSlice.reducer;