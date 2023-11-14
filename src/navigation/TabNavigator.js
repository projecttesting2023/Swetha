import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProductScreen from '../screens/ProductScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import WalletScreen from '../screens/WalletScreen';
import PersonalDetailsScreen from '../screens/PersonalDetailsScreen';
import DeliveryAddressScreen from '../screens/DeliveryAddressScreen';
import DeliveryInstruction from '../screens/DeliveryInstruction';
import WalletHistoryScreen from '../screens/WalletHistoryScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OfferDetailsScreen from '../screens/OfferDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WalletHistory"
        component={WalletHistoryScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="OfferDetailsScreen"
        component={OfferDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ProductStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
     
    </Stack.Navigator>
  )

};

const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalDetails"
        component={PersonalDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeliveryAddress"
        component={DeliveryAddressScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="DeliveryInstruction"
        component={DeliveryInstruction}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  )

};


const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  const cartProducts = useSelector(state => state.cart)
  console.log(cartProducts)
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarActiveTintColor: '#1DB6E8',
        tabBarStyle: { height: 300 },
        tabBarLabelStyle: { marginBottom: 10 }
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeStack}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#141414',
            height: Platform.OS === 'ios' ? responsiveHeight(12) : responsiveHeight(10),
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Product"
        component={ProductStack}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#141414',
            height: Platform.OS === 'ios' ? responsiveHeight(12) : responsiveHeight(10),
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#141414',
            height: Platform.OS === 'ios' ? responsiveHeight(12) : responsiveHeight(10),
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#141414',
            height: Platform.OS === 'ios' ? responsiveHeight(12) : responsiveHeight(10),
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = route => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  // console.log(routeName);

  if (routeName == 'GameDetails') {
    return 'none';
  }
  return 'flex';
};

export default TabNavigator;
