import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { chatImg } from '../utils/Images';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default function CustomButton({ label, onPress, buttonIcon, comingFrom }) {
  //console.log(comingFrom,'coming from')
  return (
    <TouchableOpacity
      onPress={onPress}
      style={comingFrom == 'wallet' ? styles.buttonView2 : styles.buttonView}>
      {buttonIcon ? <EvilIcons name="calendar" size={28} color="#fff" /> : null}
      <Text
        style={styles.buttonText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: '#1697C0',
    borderRadius: 62,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(89),
    height: responsiveHeight(6),
  },
  buttonView2: {
    backgroundColor: '#1697C0',
    borderRadius: 62,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(85),
    height: responsiveHeight(6),
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
  },
  iconImage: {
    width: 23,
    height: 23,
    marginRight: 5
  }
})
