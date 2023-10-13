import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import store from './src/store/store';
import { View, Text, LogBox, Alert, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import OfflineNotice from './src/utils/OfflineNotice'
// import PushController from './src/utils/PushController';
import messaging from '@react-native-firebase/messaging';


function App() {
  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log(token);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    LogBox.ignoreLogs([
      'Animated: `useNativeDriver`',
      'componentWillMount has been renamed',
      'componentWillReceiveProps',
      'Each child in a list should have a unique "key" prop',
      'VirtualizedLists should never be nested'
    ]);
    getFCMToken()

    // if (Platform.OS == 'android') {
      /* this is app foreground notification */
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
       });
      return unsubscribe;
    // }


  }, [])
  return (
    <Provider store={store}>
      <OfflineNotice />
      <AuthProvider>
        <AppNav />
      </AuthProvider>
      <Toast />
    </Provider>
  );
}

export default App;