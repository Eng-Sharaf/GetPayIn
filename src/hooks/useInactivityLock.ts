import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLocked } from '../store/appSlice';
import { RootState } from '../store';

const INACTIVITY_TIMEOUT = 10000; // 10 seconds

export const useInactivityLock = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (isAuthenticated) {
      timerRef.current = setTimeout(() => {
        dispatch(setLocked(true));
      }, INACTIVITY_TIMEOUT);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    // Start timer on mount
    resetTimer();

    // Handle app state changes
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (nextAppState === 'background' || nextAppState === 'inactive') {
          dispatch(setLocked(true));
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
        } else if (nextAppState === 'active') {
          resetTimer();
        }
      }
    );

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      subscription.remove();
    };
  }, [isAuthenticated]);

  return { resetTimer };
};