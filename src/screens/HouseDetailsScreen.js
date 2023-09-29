import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity,TouchableWithoutFeedback, StyleSheet, TextInput, ScrollView } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Logo from '../assets/images/misc/logo.svg';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Validations } from "../utils/Validation";

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
];

const HouseDetailsScreen = ({ navigation }) => {
    const [houseNo, setHouseNo] = React.useState('');
    const [houseName, setHouseName] = React.useState('');
    const [streetName, setStreetName] = React.useState('');
    const [landmark, setLandmark] = React.useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(null);

    const handleSubmit = () =>{
        console.log(Validations.verifyRequired(houseNo,'Please enter House no'))
        navigation.navigate('ProfileInformation')
    }

    return (
        <LinearGradient colors={['#E0F8FF', 'rgba(255, 255, 255, 0.05)', 'rgba(217, 217, 217, 0.00)']} style={styles.Container}>
            <SafeAreaView>
            <View style={{ paddingHorizontal: 20, paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableWithoutFeedback onPress={()=> navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={25} color="#000" />
                </TouchableWithoutFeedback>
                <Text style={styles.header}>Independent house</Text>
            </View>
            <ScrollView style={{ paddingHorizontal: 20,marginBottom:responsiveHeight(3) }}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.TextInputHeader}>House No.</Text>
                    <InputField
                        label={'Enter House No'}
                        keyboardType="default"
                        value={houseNo}
                        onChangeText={(text) => setHouseNo(text)}
                    />
                    <Text style={styles.TextInputHeader}>House Name (Optional)</Text>
                    <InputField
                        label={'Enter house name'}
                        keyboardType="default"
                        value={houseName}
                        onChangeText={(text) => setHouseName(text)}
                    />
                    <Text style={styles.TextInputHeader}>Floor Number</Text>
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
                        }}
                    />
                    <Text style={styles.TextInputHeader}>Street/Colony</Text>
                    <InputField
                        label={'Enter street/colony name'}
                        keyboardType="default"
                        value={streetName}
                        onChangeText={(text) => setStreetName(text)}
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
        color:'#797979'
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
