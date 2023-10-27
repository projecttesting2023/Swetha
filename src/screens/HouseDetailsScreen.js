import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, TextInput, ScrollView } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Logo from '../assets/images/misc/logo.svg';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import { Formik } from 'formik'
//import { Validations } from "../utils/Validation";

const data = [
    { label: 'Floor 1', value: 'Floor 1' },
    { label: 'Floor 2', value: 'Floor 2' },
    { label: 'Floor 3', value: 'Floor 3' },
    { label: 'Floor 4', value: 'Floor 4' },
];

const schema = yup.object().shape({
    houseNo: yup
        .string()
        .required('House No is required'),
    streetName: yup
        .string()
        .required('Street Name is required'),

});

const HouseDetailsScreen = ({ navigation,route  }) => {
    const [houseNo, setHouseNo] = React.useState('');
    const [houseName, setHouseName] = React.useState('');
    const [streetName, setStreetName] = React.useState('');
    const [landmark, setLandmark] = React.useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(null);
    const [floorerrors, setError] = useState(false)
    const [errorText, setErrorText] = useState('Please select Floor No')

    const handleSubmit = (values) => {
        //console.log(Validations.verifyRequired(houseNo, 'Please enter House no'))
        //navigation.navigate('ProfileInformation')
        //console.log(values)
        if(values.houseNo && values.streetName){
            if(!value){
                setError(true)
            }else{
                let address = `${values.houseNo},${value},${values.streetName}`
                const data = {
                    usertoken: route?.params?.usertoken,
                    phoneno:route?.params?.phoneno,
                    houseno:values.houseNo,
                    housename:houseName,
                    floorno: value,
                    streetname: values.streetName,
                    landmark: landmark,
                    address: address,

                }
                navigation.navigate('ProfileInformation',data)
            }
        }
    }

    return (
        <LinearGradient colors={['#E0F8FF', 'rgba(255, 255, 255, 0.05)', 'rgba(217, 217, 217, 0.00)']} style={styles.Container}>
            <SafeAreaView>
                <View style={{ paddingHorizontal: 20, paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={25} color="#000" />
                    </TouchableWithoutFeedback>
                    <Text style={styles.header}>Independent house</Text>
                </View>
                <ScrollView style={{ paddingHorizontal: 20, marginBottom: responsiveHeight(3) }}>
                    <Formik
                        validationSchema={schema}
                        initialValues={{ houseNo: '', streetName: '' }}
                        onSubmit={values => handleSubmit(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                            <>
                                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                                    <Text style={styles.TextInputHeader}>House No.</Text>
                                    {errors.houseNo &&
                                        <Text style={{ fontSize: responsiveFontSize(1.5), color: 'red', marginBottom: 10 }}>{errors.houseNo}</Text>
                                    }
                                    <InputField
                                        label={'Enter House No'}
                                        keyboardType="default"
                                        //value={houseNo}
                                        //onChangeText={(text) => setHouseNo(text)}
                                        value={values.houseNo}
                                        onChangeText={handleChange('houseNo')}
                                        onBlur={handleBlur('houseNo')}
                                    />
                                    <Text style={styles.TextInputHeader}>House Name (Optional)</Text>
                                    <InputField
                                        label={'Enter house name'}
                                        keyboardType="default"
                                        value={houseName}
                                        onChangeText={(text) => setHouseName(text)}
                                    />
                                    <Text style={styles.TextInputHeader}>Floor Number</Text>
                                    {floorerrors &&
                                        <Text style={{ fontSize: responsiveFontSize(1.5), color: 'red', marginBottom: 10 }}>{errorText}</Text>
                                    }
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
                                        placeholder={!isFocus ? 'Select your floor' : '...'}
                                        searchPlaceholder="Search..."
                                        value={value}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={item => {
                                            setValue(item.value);
                                            setIsFocus(false);
                                            setError(false)
                                        }}
                                    />
                                    <Text style={styles.TextInputHeader}>Street/Colony</Text>
                                    {errors.streetName &&
                                        <Text style={{ fontSize: responsiveFontSize(1.5), color: 'red', marginBottom: 10 }}>{errors.streetName}</Text>
                                    }
                                    <InputField
                                        label={'Enter street/colony name'}
                                        keyboardType="default"
                                        value={values.streetName}
                                        onChangeText={handleChange('streetName')}
                                        onBlur={handleBlur('streetName')}
                                    />
                                    <Text style={styles.TextInputHeader}>Landmark (Optional)</Text>
                                    <InputField
                                        label={'Add landmark'}
                                        keyboardType="default"
                                        value={landmark}
                                        onChangeText={(text) => setLandmark(text)}
                                    />
                                </KeyboardAwareScrollView>
                                <View style={styles.buttonwrapper}>
                                    <CustomButton label={"NEXT"}
                                        onPress={() => { handleSubmit() }}
                                    />
                                </View>
                            </>
                        )}
                    </Formik>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default HouseDetailsScreen;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        paddingBottom: responsiveHeight(2)
    },
    header: {
        color: '#444',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(3),
        fontWeight: '500',
        marginLeft: 10
    },
    TextInputHeader: {
        color: '#444',
        fontFamily: "Poppins-Regular",
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        marginBottom: responsiveHeight(2)
    },
    dropdown: {
        height: responsiveHeight(7),
        width: responsiveWidth(89),
        borderColor: '#147999',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: responsiveHeight(3),
        backgroundColor: '#FFF'
    },
    placeholderStyle: {
        fontSize: responsiveFontSize(2),
        color: '#797979'
    },
    selectedTextStyle: {
        fontSize: responsiveFontSize(2),
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    buttonwrapper: {
        alignSelf: 'center'
    },

});
