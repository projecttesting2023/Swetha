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
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import SplashScreen from 'react-native-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 5000);
  }, [])

  const getFCMToken = async () => {
    try {
      // if (Platform.OS == 'android') {
      await messaging().registerDeviceForRemoteMessages();
      // }
      const token = await messaging().getToken();
      AsyncStorage.setItem('fcmToken', token)
      console.log(token, 'fcm token');
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
    // if (Platform.OS == 'ios') {
    //   PushNotificationIOS.register();
    // }
    getFCMToken()

    if (Platform.OS == 'android') {
      /* this is app foreground notification */
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });
      return unsubscribe;
    }
    // else {
    //   PushNotificationIOS.addEventListener('notification', (notification) => {
    //     // Handle the notification
    //     Alert.alert('A new FCM message arrived!', JSON.stringify(notification));
    //   });
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