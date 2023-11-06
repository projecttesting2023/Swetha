import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HouseDetailsScreen from '../screens/HouseDetailsScreen';
import ProfileInformationScreen from '../screens/ProfileInformationScreen';
import VerifyDetailsScreen from '../screens/VerifyDetailsScreen'
// import ProductDetailsScreen from '../screens/ProductDetailsScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="HouseDetails" component={HouseDetailsScreen} />
      <Stack.Screen name="ProfileInformation" component={ProfileInformationScreen} />
      <Stack.Screen name="VerifyDetails" component={VerifyDetailsScreen} />
      {/* <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
