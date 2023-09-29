import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function InputField({
  label,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChangeText,
  helperText
}) {
  //console.log(inputType,'dddd')
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={label}
        keyboardType={keyboardType}
        editable={inputType == 'nonedit' ? false : true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  input: {
    height: responsiveHeight(7),
    width: responsiveWidth(89),
    color: '#797979',
    borderColor: '#147999',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 20,
    backgroundColor: '#FFF',
    fontSize: responsiveFontSize(2)
  }
});
