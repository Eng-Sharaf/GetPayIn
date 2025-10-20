import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { store } from './src/store';
import { queryClient, persister } from './src/utils/queryClient';
import { RootNavigator } from './src/navigation/RootNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </PersistQueryClientProvider>
    </Provider>
  );
};

export default App;