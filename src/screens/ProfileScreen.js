import React, { useState, useMemo, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity, KeyboardAwareScrollView } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import CustomHeader from '../components/CustomHeader'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { TextInput, LongPressGestureHandler, State } from 'react-native-gesture-handler'
import { deleteImg, editImg, phoneImg, searchImg, userPhoto } from '../utils/Images'
import CustomButton from '../components/CustomButton'
import InputField from '../components/InputField';
import { Dropdown } from 'react-native-element-dropdown';
import RadioGroup from 'react-native-radio-buttons-group';
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import { API_URL } from '@env'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { userInfo, logout } = useContext(AuthContext);
  const [walletAmount, setWalletAmount] = React.useState('0.00')

  const fetchProfileDetails = () => {
    AsyncStorage.getItem('userToken', (err, usertoken) => {

      axios.get(`${API_URL}/public/api/user/getUser`, {
        headers: {
          "Authorization": 'Bearer ' + usertoken,
          "Content-Type": 'application/json'
        },
      })
        .then(res => {
          console.log(res.data.user, 'user details')
          let userInfo = res.data.user;
          setWalletAmount(userInfo.walate)
          setIsLoading(false);
        })
        .catch(e => {
          console.log(`Login error ${e}`)
        });
    });
  }

  useEffect(() => {
    fetchProfileDetails()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      fetchProfileDetails()
    }, [])
)
  return (
    <SafeAreaView style={styles.Container}>
      <CustomHeader commingFrom={'Profile'} onPress={() => navigation.goBack()} title={'Profile'} />
      <ScrollView style={styles.wrapper}>
        <View style={{ marginBottom: responsiveHeight(3) }}>
          <View style={styles.rechargeContainer}>
            <View>
              <Text style={styles.text1}>Wallet Balance</Text>
              <Text style={styles.value1}>₹{walletAmount}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
              <Text style={{ color: '#147999', fontFamily: 'Poppins-Regular', fontSize: responsiveFontSize(2) }}>Recharge</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rechargeContainer}>
            <View>
              <Text style={styles.text1}>Personal Details</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')}>
              <AntDesign name="right" size={22} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.rechargeContainer}>
            <View>
              <Text style={styles.text1}>Delivery Address</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('DeliveryAddress')}>
              <AntDesign name="right" size={22} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.rechargeContainer}>
            <View>
              <Text style={styles.text1}>Delivery Instruction</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('DeliveryInstruction')}>
              <AntDesign name="right" size={22} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.rechargeContainer}>
            <View>
              <Text style={styles.text1}>Order History</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Order History')}>
              <AntDesign name="right" size={22} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.rechargeContainer}>
            <View>
              <Text style={styles.text1}>Help & Support</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Help & Support')}>
              <AntDesign name="right" size={22} color="#000" />
            </TouchableOpacity>
          </View>
        </View>


      </ScrollView>
      <View style={styles.buttonwrapper}>
        <CustomButton label={"Logout"} buttonIcon={false} onPress={() => logout()} />
      </View>

    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  wrapper: {
    padding: responsiveWidth(5),
    marginBottom: responsiveHeight(1)
  },
  buttonwrapper: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10
  },
  inputContainer: {
    height: responsiveHeight(8),
    width: responsiveWidth(90),
    borderColor: '#147999',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },
  rechargeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: responsiveHeight(8),
    width: responsiveWidth(90),
    borderColor: '#147999',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },
  text1: {
    color: '#444',
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(2),
  },
  value1: {
    color: '#797979',
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(1.8),
  }

});
