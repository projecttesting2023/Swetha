import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Logo from '../assets/images/misc/logo.svg';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import * as yup from 'yup';
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { getPhoneVerify } from '../store/auth/phoneVerifySlice';
import Loader from '../utils/Loader';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import { API_URL } from '@env'

const schema = yup.object().shape({
  number: yup
    .string()
    .required('Phone No is required')
    .min(10, 'Phone No must contain at least 10 characters')
    //.test('len', 'Must be exactly 10 characters', val => val.length === 10)
    .max(10, 'Phone No must contain at least 10 characters'),

});



const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data: phoneVerify, status } = useSelector(state => state.phoneVerify)
  const [number, onChangeNumber] = React.useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [deviceId, setDeviceId] = useState('')

  const handleSubmit = (values) => {
    //console.log(values)
    setIsLoading(true)
    if (values.number) {
      const option = {
        "phone": values.number,
        "refcode": '',
        "flage": 'login',
        "deviceid": deviceId
      }
      //dispatch(getPhoneVerify(option))
      axios.post(`${API_URL}/public/api/userregister`, option)
        .then(res => {
          console.log(res.data)
          if (res.data.st == '400') {
            setIsLoading(false)
            Alert.alert('Oops..', res.data.massage, [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
          } else if (res.data.st == '200') {
            console.log(res.data, 'data from phone Verify api')
            setIsLoading(false)
            navigation.push('Otp', { phoneno: res.data.phone, page: 'login' })
          }
        })
        .catch(e => {
          console.log(`user register error ${e}`)
        });

    }
  }

  const getDeviceInfo = () => {
    DeviceInfo.getUniqueId().then((deviceUniqueId) => {
      console.log(deviceUniqueId)
      setDeviceId(deviceUniqueId)
    });
  }

  useEffect(() => {
    getDeviceInfo()
  }, [])

  // useEffect(() => {
  //   console.log(status, 'phoneVerifystatus')
  //   if (status == 'success') {
  //     console.log(phoneVerify, 'data from phone Verify api')
  //     setIsLoading(false)
  //     navigation.push('Otp', { phoneno: phoneVerify.phone, page: 'login' })
  //   } else if (status == 'loading') {
  //     setIsLoading(true)
  //   } else if (status == 'error') {
  //     setIsLoading(false)
  //     alert('Something went wrong or Please register first' )
  //   }
  // }, [status]) 

  if (isLoading) {
    return (
      <Loader />
    )
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
                placeholderTextColor="#808080"
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
    fontSize: responsiveFontSize(2),
    color: '#808080'
  }

});
