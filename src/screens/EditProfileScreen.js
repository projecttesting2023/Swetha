import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DocumentPicker from 'react-native-document-picker';
import { TextInput, LongPressGestureHandler, State } from 'react-native-gesture-handler'
import { deleteImg, editImg, phoneImg, plus, searchImg, userPhoto } from '../utils/Images'
import CustomHeader from '../components/CustomHeader'
import CustomButton from '../components/CustomButton'
import InputField from '../components/InputField';

import { useHeaderHeight } from "@react-navigation/elements";


const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
];

const EditProfileScreen = ({ navigation }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [firstname, setFirstname] = useState('Sourav');
  const [lastname, setLastname] = useState('Ghosh');
  const [phone, setPhone] = useState('7569987344');
  const [singleFile, setSingleFile] = useState(null);
  const [imageFile, setImageFile] = useState('');

  const headerHeight = useHeaderHeight();

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log(res[0].uri)
      // Setting the state to show single file attributes
      setSingleFile(res);
      setImageFile(res.uri)
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  return (
    <SafeAreaView style={styles.Container}>
      <CustomHeader commingFrom={'editProfile'} onPress={() => navigation.goBack()} title={'Edit Profile'} />
      <KeyboardAwareScrollView>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.imageView}>
            {imageFile == ''?
              <Image
                source={userPhoto}
                style={styles.imageStyle}
              /> :
              <Image
                source={{uri:imageFile}}
                style={styles.imageStyle}
              />
            }
            <TouchableOpacity style={styles.plusIcon} //onPress={() => selectFile()}
            >
              <Image source={plus} style={{ height: 23, width: 23 }} />
            </TouchableOpacity>
          </View>
          <View style={styles.textinputview}>
            <View style={styles.inputView}>
              <InputField
                label={'First name'}
                keyboardType=" "
                value={firstname}
                //helperText={'Please enter firstname'}
                inputType={'name'}
                onChangeText={(text) => setFirstname(text)}
              />
            </View>
            <View style={styles.inputView}>
              <InputField
                label={'Last name'}
                keyboardType=" "
                value={lastname}
                //helperText={'Please enter lastname'}
                inputType={'name'}
                onChangeText={(text) => setLastname(text)}
              />
            </View>
          </View>
          <View style={styles.dropdownView}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
          <View style={styles.mobileinputview}>
            <InputField
              value={'   +91'}
              inputType={'code'}
            />
            <InputField
              label={'Mobile Number'}
              keyboardType="numeric"
              value={phone}
              //helperText={'please enter 10 digit no'}
              onChangeText={(text) => setPhone(text)}
              onFocus={() => refs['scroll'].scrollTo({ y: 60 })}
            />
          </View>

        </ScrollView>
        <View style={styles.buttonwrapper}>
          <CustomButton label={"Save Changes"} buttonIcon={true} onPress={null} />
        </View>
      </KeyboardAwareScrollView>

    </SafeAreaView>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    padding: 20,
    marginBottom: responsiveHeight(1)
  },
  textinputview: {
    marginTop: responsiveHeight(5),
    alignItems: 'center'
  },
  mobileinputview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //marginBottom: responsiveHeight(5),
    paddingHorizontal: 20
  },
  imageView: {
    marginTop: responsiveHeight(4),
    paddingHorizontal: 20,
  },
  imageStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10
  },
  plusIcon: {
    position: 'absolute',
    bottom: 10,
    left: 75
  },
  inputView: {
    paddingVertical: 5
  },
  dropdown: {
    height: responsiveHeight(8),
    borderColor: 'gray',
    borderWidth: 0.7,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginTop: 5
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdownView: {
    marginBottom: 35,
    paddingHorizontal: 20,
  },
  buttonwrapper: {
    padding: 20,
    // position: 'absolute',
    // bottom: 0,
    width: responsiveWidth(100)
  },
});