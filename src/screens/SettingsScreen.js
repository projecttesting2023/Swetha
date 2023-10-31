import React, { useState } from 'react'
import { View, Text, Button, Platform, Alert } from 'react-native'
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from '@env'
import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import Orientation from 'react-native-orientation-locker';
import DatePicker from 'react-native-modern-datepicker';
import { RNHTMLtoPDF } from 'react-native-html-to-pdf';
import moment from 'moment';

const SettingsScreen = () => {
  let razorpayKeyId = RAZORPAY_KEY_ID;
  let razorpayKeySecret = RAZORPAY_KEY_SECRET;

  const [fullScreen, setFullScreen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [html, setHtml] = useState(`
  <html>
      <head>
          <title>Some HTML in here</title>
      </head>
      <body>
          <h1>Look ma! HTML!</h1>
      </body>
  </html>
  `);

  const FullScreen = () => {
    if (fullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setFullScreen(!fullScreen)
  }

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

  const convertHtmlToPdf = async () => {
    RNHTMLtoPDF.initialize();

    const options = {
      html,
      fileName: `invoice_1.pdf`,
      directory: 'Invoices',
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert('Success', `PDF saved to ${file.filePath}`);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const dayAfterCurrentDate = () => {
    const currentDate = moment();

    // Get the next day
    const nextDay = currentDate.add(2, 'days');
    
    // Format the next day as a string (if needed)
    const formattedNextDay = nextDay.format('YYYY-MM-DD');
    
    console.log(formattedNextDay);
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
      <Button
        title='Orientation'
        onPress={FullScreen}
      />
      <Button
        title='Generate PDF'
        onPress={convertHtmlToPdf}
      />
      <Button
        title='Day After Current Date'
        onPress={dayAfterCurrentDate}
      />
      <Text>{selectedDate}</Text>
      <DatePicker
        onSelectedChange={date => setSelectedDate(date)}
      />
    </SafeAreaView>
  )
}

export default SettingsScreen