import React, { useContext, useState, useMemo } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, TextInput, ScrollView } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Logo from '../assets/images/misc/logo.svg';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RadioGroup from 'react-native-radio-buttons-group';

import city from '../model/city'

const ProfileInformationScreen = ({ navigation }) => {
    const [fullname, setFullname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(null);
    const [pincode, setPincode] = React.useState('');
    const [area, setArea] = React.useState('');
    const [selectedId, setSelectedId] = useState('1');

    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Independent',
            value: 'option1',
            borderColor: '#147999',
            color: '#147999'
        },
        {
            id: '2',
            label: 'Community/Apartment',
            value: 'option2',
            borderColor: '#147999',
            color: '#147999'
        }
    ]), []);

    return (
        <LinearGradient colors={['#E0F8FF', 'rgba(255, 255, 255, 0.05)', 'rgba(217, 217, 217, 0.00)']} style={styles.Container}>
            <SafeAreaView>
                <View style={{ paddingHorizontal: 20, paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={25} color="#000" />
                    </TouchableWithoutFeedback>
                    <Text style={styles.header}>Complete Profile</Text>
                </View>
                <ScrollView style={{ paddingHorizontal: 20, marginBottom: responsiveHeight(3) }}>
                    <View style={{paddingBottom:responsiveHeight(5)}}>
                        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.TextInputHeader}>Full Name</Text>
                            <InputField
                                label={'Enter your full name'}
                                keyboardType="default"
                                value={fullname}
                                onChangeText={(text) => setFullname(text)}
                            />
                            <Text style={styles.TextInputHeader}>E-Mail (Optional)</Text>
                            <InputField
                                label={'Enter your email address'}
                                keyboardType="default"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                            <Text style={styles.TextInputHeader}>City</Text>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                data={city}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? '  Select your city' : '...'}
                                searchPlaceholder="Search..."
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(item.value);
                                    setIsFocus(false);
                                }}
                            />
                            <Text style={styles.TextInputHeader}>Pincode</Text>
                            <InputField
                                label={'Enter your pincode'}
                                keyboardType="numeric"
                                value={pincode}
                                onChangeText={(text) => setPincode(text)}
                            />
                            <Text style={styles.TextInputHeader}>Area (Optional)</Text>
                            <InputField
                                label={'Enter your area'}
                                keyboardType="default"
                                value={area}
                                onChangeText={(text) => setArea(text)}
                            />
                            <Text style={styles.TextInputHeader}>Residency Type</Text>
                            <View style={{ marginBottom: responsiveHeight(2) }}>
                                <RadioGroup
                                    radioButtons={radioButtons}
                                    onPress={setSelectedId}
                                    selectedId={selectedId}
                                    layout='row'
                                    borderColor='red'
                                />
                            </View>
                        </KeyboardAwareScrollView>
                        <View style={styles.buttonwrapper}>
                            <CustomButton label={"NEXT"}
                                onPress={() => { navigation.navigate('VerifyDetails') }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default ProfileInformationScreen;

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
