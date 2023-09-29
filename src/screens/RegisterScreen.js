import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Logo from '../assets/images/misc/logo.svg';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';

const RegisterScreen = ({ navigation }) => {
  const [number, onChangeNumber] = React.useState('');
  const [referral, setReferral] = React.useState('');
  return (
    <LinearGradient colors={['#E0F8FF', 'rgba(255, 255, 255, 0.05)', 'rgba(217, 217, 217, 0.00)']} style={styles.Container}>
      <View style={styles.logoView}>
        <Logo
          width={200}
          height={200}
        //style={{transform: [{rotate: '-15deg'}]}}
        />
      </View>
      <Text style={styles.HeaderText}>Enter Mobile Number</Text>
      <View style={styles.buttonView}>
        <Text style={styles.buttonText}>+91</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Enter 10 digit mobile no."
          keyboardType="numeric"
          //letterSpacing={1}
        />
      </View>
      {/* <Text style={styles.skipText}>We will send a 4 digit pin</Text> */}
      <Text style={styles.HeaderText}>Referral Code (if any)</Text>
      <View style={styles.buttonView}>
        <TextInput
          style={styles.input}
          onChangeText={setReferral}
          value={referral}
          placeholder="Enter referral code"
          keyboardType="default"
          //letterSpacing={1}
        />
      </View>
      <View style={styles.buttonwrapper}>
        <CustomButton label={"NEXT"}
          onPress={() => { navigation.navigate('Otp') }}
        />
      </View>
      <Text style={styles.privacyText}>I AGREE TO THE PRIVCY POLICY</Text>
    </LinearGradient>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  HeaderText: {
    color: '#444',
    fontFamily: "Poppins-Regular",
    fontSize: responsiveFontSize(2.5),
    fontWeight: '500',
    marginBottom: responsiveHeight(3)
  },
  buttonView: {
    backgroundColor: '#FFF',
    width: '90%',
    height: responsiveHeight(7),
    borderRadius: 62,
    marginBottom: responsiveHeight(3),
    borderWidth: 1,
    borderColor: '#147999',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  buttonText: {
    color: '#2E2E2E',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontWeight: '700',
    marginRight: 5
  },
  skipText: {
    color: '#444444',
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
    marginBottom: responsiveHeight(3),
  },
  privacyText:{
    color: '#065670',
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    marginTop: responsiveHeight(3),

  },
  buttonwrapper:{
    paddingHorizontal: 25,
  },
  input:{
    fontSize:responsiveFontSize(2),
    width:responsiveWidth(70)
  }

});
