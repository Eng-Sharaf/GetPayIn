import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { AllProductsScreen } from '../screens/AllProductsScreen';
import { CategoryScreen } from '../screens/CategoryScreen';
import { logout } from '../store/authSlice';
import { AppTabParamList } from './types';

const Tab = createBottomTabNavigator<AppTabParamList>();

const SignOutScreen = () => null;

export const AppNavigator = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => dispatch(logout()),
      },
    ]);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerShadowVisible: true,
      }}
    >
      <Tab.Screen
        name="AllProducts"
        component={AllProductsScreen}
        options={{
          title: 'All Products',
          tabBarLabel: 'Products',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>📦</Text>,
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          title: 'Smartphones',
          tabBarLabel: 'Category',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>📱</Text>,
        }}
      />
      <Tab.Screen
        name="SignOut"
        component={SignOutScreen}
        options={{
          title: 'Sign Out',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>🚪</Text>,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleSignOut();
          },
        }}
      />
    </Tab.Navigator>
  );
};