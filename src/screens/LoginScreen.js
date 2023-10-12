import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Logo from '../assets/images/misc/logo.svg';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import * as yup from 'yup';
import { Formik } from 'formik'

const schema = yup.object().shape({
  number: yup
    .string()
    .required('Phone No is required')
    .min(10, 'Phone No must contain at least 10 characters')
    //.test('len', 'Must be exactly 10 characters', val => val.length === 10)
    .max(10, 'Phone No must contain at least 10 characters'),

});



const LoginScreen = ({ navigation }) => {
  const [number, onChangeNumber] = React.useState('');

  const handleSubmit = (values) => {
    //navigation.navigate('Otp')
    console.log(values)
    if (values.number) {
      navigation.navigate('Otp', { phoneno: values.number })
    }
  }
  
  return (
    <LinearGradient colors={['#E0F8FF', 'rgba(255, 255, 255, 0.05)', 'rgba(217, 217, 217, 0.00)']} style={styles.Container}>
      <View style={styles.logoView}>
        <Logo
          width={200}
          height={200}
        //style={{transform: [{rotate: '-15deg'}]}}
        />
      </View>
      <Formik
        validationSchema={schema}
        initialValues={{ number: '', referral: '' }}
        onSubmit={values => handleSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <Text style={styles.HeaderText}>Enter Mobile Number</Text>
            <View style={styles.buttonView}>
              <Text style={styles.buttonText}>+91</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('number')}
                onBlur={handleBlur('number')}
                placeholder="Enter 10 digit mobile no."
                keyboardType="numeric"
              //letterSpacing={2}
              />
            </View>
            {errors.number &&
              <Text style={{ fontSize: responsiveFontSize(1.5), color: 'red', marginBottom: 10 }}>{errors.number}</Text>
            }
            <Text style={styles.skipText}>We will send a 4 digit pin</Text>

            <View style={styles.buttonwrapper}>
              <CustomButton label={"NEXT"}
                onPress={() => { handleSubmit() }}
              />
            </View>
          </>
        )}
      </Formik>
    </LinearGradient>
  );
};

export default LoginScreen;

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
  privacyText: {
    color: '#065670',
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    marginTop: responsiveHeight(3),

  },
  buttonwrapper: {
    paddingHorizontal: 25,
  },
  input: {
    fontSize: responsiveFontSize(2)
  }

});
