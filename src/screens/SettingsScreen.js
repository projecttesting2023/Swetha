import React from 'react'
import { View, Text, Button, Platform } from 'react-native'
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from '@env'
import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
  let razorpayKeyId = RAZORPAY_KEY_ID;
  let razorpayKeySecret = RAZORPAY_KEY_SECRET;

  const amount = 100;
  const currency = 'INR';
  const handlePayment = () => {
    var options = {
      description: 'This is the description we need',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: razorpayKeyId,
      amount: amount * 100,
      name: 'Customer 1',
      order_id: '',
      prefill: {
        email: 'xyz@example.com',
        contact: '9191919191',
        name: 'Person Name'
      },
      theme: { color: '#1697C0' }
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
    });
  }

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
      position: 'top',
      topOffset: Platform.OS == 'ios' ? 55 : 20
    });
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
      <Button
        title="Press me"
        onPress={() => handlePayment()}
      />
      <Button
        title='Show toast'
        onPress={showToast}
      />
    </SafeAreaView>
  )
}

export default SettingsScreen