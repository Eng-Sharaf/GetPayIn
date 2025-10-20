import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const StorageKeys = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  QUERY_CACHE: 'query_cache',
  SUPERADMIN: 'superadmin_username',
} as const;

export const storageUtils = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  
  getItem: (key: string): string | undefined => {
    return storage.getString(key);
  },
  
  setObject: <T,>(key: string, value: T) => {
    storage.set(key, JSON.stringify(value));
  },
  
  getObject: <T,>(key: string): T | null => {
    const item = storage.getString(key);
    return item ? JSON.parse(item) : null;
  },
  
  removeItem: (key: string) => {
    storage.delete(key);
  },
  
  clear: () => {
    storage.clearAll();
  },
};