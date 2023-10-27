import React, { useContext,useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Switch
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../context/AuthContext';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const CustomDrawer = props => {
  const { userInfo, logout } = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#FFF' }}>
        <View style={{ padding: 20, alignItems: 'flex-start' }}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{ height: 40, width: 90,resizeMode:'contain'  }}
          />
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              fontFamily: 'Poppins-Regular',
              marginBottom: 5,
              marginTop:5
            }}>
            Namaste! {userInfo.name}
          </Text>
        </View>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        {/* <View style={{ backgroundColor: '#ebeff0', height: responsiveHeight(6), width: responsiveWidth(61), borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', marginLeft: 5, fontWeight: 'bold' }}>Pause all deliveries</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#00B2EB' }}
            thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View> */}
        <TouchableOpacity onPress={() => { logout() }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Poppins-Regular',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
