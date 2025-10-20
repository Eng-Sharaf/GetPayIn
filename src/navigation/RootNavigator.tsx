import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { RootState } from '../store';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import { RootStackParamList } from './types';
import { authApi } from '../api/auth';
import { setCredentials, logout } from '../store/authSlice';
import { setShowBiometricPrompt } from '../store/appSlice';
import { LockOverlay } from '../components/LockOverlay';
import { useInactivityLock } from '../hooks/useInactivityLock';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const { resetTimer } = useInactivityLock();

  const validateTokenMutation = useMutation({
    mutationFn: authApi.getMe,
    onSuccess: (user) => {
      dispatch(setCredentials({ token: token!, user }));
      dispatch(setShowBiometricPrompt(true));
    },
    onError: () => {
      dispatch(logout());
    },
  });

  useEffect(() => {
    if (token && !isAuthenticated) {
      validateTokenMutation.mutate();
    }
  }, []);

  return (
    <NavigationContainer
      onStateChange={() => {
        if (isAuthenticated) {
          resetTimer();
        }
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="App" component={AppNavigator} />
        )}
      </Stack.Navigator>
      <LockOverlay />
    </NavigationContainer>
  );
};