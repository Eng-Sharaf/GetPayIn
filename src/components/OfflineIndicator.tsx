import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useOfflineStatus } from '../hooks/useOfflineStatus';

export const OfflineIndicator = () => {
  const isOffline = useOfflineStatus();

  if (!isOffline) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>⚠️ Offline</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFA500',
    padding: 8,
    alignItems: 'center',
    zIndex: 1000,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});