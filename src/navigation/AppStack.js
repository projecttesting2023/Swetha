import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SettingsScreen from '../screens/SettingsScreen';
import ReferScreen from '../screens/ReferScreen'; 
import HelpScreen from '../screens/HelpScreen';
import TermsScreen from '../screens/TermsScreen';
import FaqScreen from '../screens/FaqScreen';
import WalletScreen from '../screens/WalletScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import OrderStatementScreen from '../screens/OrderStatementScreen';

import TabNavigator from './TabNavigator';
import HolidaysScreen from '../screens/HolidaysScreen';
import MyDeliveryScreen from '../screens/MyDeliveryScreen';
import OfferScreen from '../screens/OfferScreen';

const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#1697C0',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
        
      }}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
       <Drawer.Screen
        name="Order History"
        component={OrderHistoryScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="list-outline" size={22} color={color} />
          ),
        }}
      />
       <Drawer.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="wallet-outline" size={22} color={color} />
          ),
        }}
      />
       <Drawer.Screen
        name="Holidays"
        component={HolidaysScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="calendar-outline" size={22} color={color} />
          ),
        }}
      />
       <Drawer.Screen
        name="Order Statement"
        component={OrderStatementScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="calendar-clear-outline" size={22} color={color} />
          ),
        }}
      />
       <Drawer.Screen
        name="My Deliveries"
        component={MyDeliveryScreen}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="truck-delivery-outline" size={25} color="#000" />
          ),
        }}
      />
       <Drawer.Screen
        name="Offers"
        component={OfferScreen}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="percent" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Refer & Earn"
        component={ReferScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="arrow-redo-circle-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help & Support"
        component={HelpScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="help-buoy-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Terms & Conditions"
        component={TermsScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="document-text" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="FAQs"
        component={FaqScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="hand-left-outline" size={22} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default AuthStack;
