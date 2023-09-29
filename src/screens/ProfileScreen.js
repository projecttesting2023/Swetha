import React, { useState, useMemo } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity, KeyboardAwareScrollView } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import CustomHeader from '../components/CustomHeader'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { TextInput, LongPressGestureHandler, State } from 'react-native-gesture-handler'
import { deleteImg, editImg, phoneImg, searchImg, userPhoto } from '../utils/Images'
import CustomButton from '../components/CustomButton'
import InputField from '../components/InputField';
import { Dropdown } from 'react-native-element-dropdown';
import RadioGroup from 'react-native-radio-buttons-group';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
];


const ProfileScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.Container}>
      <CustomHeader commingFrom={'Profile'} onPress={() => navigation.goBack()} title={'Profile'} />
      <ScrollView style={styles.wrapper}>
        <View style={{ marginBottom: responsiveHeight(3) }}>
          <View style={styles.rechargeContainer}>
            <View>
              <Text style={styles.text1}>Wallet Balance</Text>
              <Text style={styles.value1}>₹0.00</Text>
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
              <MaterialIcons name="greater-than" size={22} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.rechargeContainer}>
            <View>
              <Text style={styles.text1}>Delivery Address</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('DeliveryAddress')}>
              <MaterialIcons name="greater-than" size={22} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.rechargeContainer}>
            <View>
              <Text style={styles.text1}>Delivery Instruction</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('DeliveryInstruction')}>
              <MaterialIcons name="greater-than" size={22} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.rechargeContainer}>
            <View>
              <Text style={styles.text1}>Order History</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Order History')}>
              <MaterialIcons name="greater-than" size={22} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.rechargeContainer}>
            <View>
              <Text style={styles.text1}>Help & Support</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Help & Support')}>
              <MaterialIcons name="greater-than" size={22} color="#000" />
            </TouchableOpacity>
          </View>
        </View>


      </ScrollView>
      <View style={styles.buttonwrapper}>
        <CustomButton label={"Logout"} buttonIcon={false} onPress={null} />
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
