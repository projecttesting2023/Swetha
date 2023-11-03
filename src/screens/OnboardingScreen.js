import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Logo from '../assets/images/misc/logo.svg';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';

const OnboardingScreen = ({ navigation }) => {
  return (
    // <SafeAreaView
    //   style={{
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#fff',
    //   }}>
    <LinearGradient colors={['#E0F8FF', 'rgba(255, 255, 255, 0.05)', 'rgba(217, 217, 217, 0.00)']} style={styles.Container}>
      <View style={styles.logoView}>
        <Logo
          width={200}
          height={200}
        //style={{transform: [{rotate: '-15deg'}]}}
        />
      </View>
      <Text style={styles.HeaderText}>Wake up to health!</Text>
      <TouchableOpacity style={styles.buttonView} onPress={()=>navigation.navigate('Login')}>
        <View>
          <Text style={styles.buttonText}>Sign In</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonView} onPress={()=>navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      {/* <Text style={styles.skipText}>I just want to browse</Text> */}
    </LinearGradient>

    // </SafeAreaView>
  );
};

export default OnboardingScreen;

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
    fontSize: responsiveFontSize(3),
    fontWeight: '700',
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#2E2E2E',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontWeight: '500'
  },
  skipText: {
    color: '#444444',
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
    marginBottom: responsiveHeight(3),
    textDecorationLine: 'underline'
  }

});
