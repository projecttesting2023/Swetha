import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import store from './src/store/store';
import { View, Text, LogBox } from 'react-native';
import Toast from 'react-native-toast-message';

function App() {
  useEffect(() => {
    LogBox.ignoreLogs([
      'Animated: `useNativeDriver`',
      'componentWillMount has been renamed',
      'componentWillReceiveProps',
      'Each child in a list should have a unique "key" prop',
      'VirtualizedLists should never be nested'
    ]);
  }, [])
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppNav />
      </AuthProvider>
      <Toast />
    </Provider>
  );
}

export default App;