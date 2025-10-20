import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storageUtils, StorageKeys } from '../utils/storage';
import { User } from '../types/api';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  superadminUsername: string;
}

const initialState: AuthState = {
  token: storageUtils.getItem(StorageKeys.AUTH_TOKEN) || null,
  user: storageUtils.getObject<User>(StorageKeys.USER_DATA),
  isAuthenticated: !!storageUtils.getItem(StorageKeys.AUTH_TOKEN),
  superadminUsername: storageUtils.getItem(StorageKeys.SUPERADMIN) || 'emilys',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      storageUtils.setItem(StorageKeys.AUTH_TOKEN, action.payload.token);
      storageUtils.setObject(StorageKeys.USER_DATA, action.payload.user);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      storageUtils.removeItem(StorageKeys.AUTH_TOKEN);
      storageUtils.removeItem(StorageKeys.USER_DATA);
    },
    setSuperadmin: (state, action: PayloadAction<string>) => {
      state.superadminUsername = action.payload;
      storageUtils.setItem(StorageKeys.SUPERADMIN, action.payload);
    },
  },
});

export const { setCredentials, logout, setSuperadmin } = authSlice.actions;
export default authSlice.reducer;
