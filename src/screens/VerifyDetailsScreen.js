import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, TextInput, ScrollView } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Logo from '../assets/images/misc/logo.svg';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import {submitProfileDetails } from '../store/profile/profieDetailsSubmitSlice';
import Loader from '../utils/Loader';


const VerifyDetailsScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { data: profileDetails, status } = useSelector(state => state.profileDetailsSubmit)

    const [fullname, setFullname] = React.useState(route?.params?.fullname);
    const [email, setEmail] = React.useState(route?.params?.email);
    const [mobile, setMobile] = React.useState(route?.params?.phoneno);
    const [address, setAddress] = React.useState(route?.params?.address);
    const [isLoading, setIsLoading] = useState(false)

    const { login, userToken } = useContext(AuthContext);

    const verifyBeforeSubmit = () => {
        const option = {
            "usertoken": route?.params?.usertoken,
            "hoseno": route?.params?.houseno,
            "hoseno_name": route?.params?.housename,
            "floorno": route?.params?.floorno,
            "street": route?.params?.streetname,
            "landmark": route?.params?.landmark,
            "city": route?.params?.city,
            "pin": route?.params?.pincode,
            "area": route?.params?.area,
            "residency_type": route?.params?.residencytype,
            "name": fullname,
            "email": email,
            "phn": mobile,
            "address": address
        }
        console.log(option,'option from verify before submit')
        //login(route?.params?.usertoken)
        dispatch(submitProfileDetails(option))
    }

    useEffect(() => {
        console.log(status, 'Verifystatus')
        if (status == 'success') {
            //console.log(profileDetails, 'data from register api')
            setIsLoading(false)
            login(route?.params?.usertoken)
        } else if (status == 'loading') {
            setIsLoading(true)
        } else if (status == 'error') {
            setIsLoading(false) 
            alert('Something went wrong')
        }

    }, [status])

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <LinearGradient colors={['#E0F8FF', 'rgba(255, 255, 255, 0.05)', 'rgba(217, 217, 217, 0.00)']} style={styles.Container}>
            <SafeAreaView>
                <View style={{ paddingHorizontal: 20, paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={25} color="#000" />
                    </TouchableWithoutFeedback>
                    <Text style={styles.header}>Verify Details</Text>
                </View>
                <ScrollView style={{ paddingHorizontal: 20 }}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.TextInputHeader}>Name</Text>
                        <InputField
                            label={'Enter your full name'}
                            keyboardType="default"
                            value={fullname}
                            onChangeText={(text) => setFullname(text)}
                        />
                        <Text style={styles.TextInputHeader}>E-Mail</Text>
                        <InputField
                            label={'Enter your email'}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <Text style={styles.TextInputHeader}>Mobile</Text>
                        <InputField
                            label={'Mobile number'}
                            keyboardType="numeric"
                            value={mobile}
                            inputType={'nonedit'}
                            onChangeText={(text) => setMobile(text)}
                        />
                        <Text style={styles.TextInputHeader}>Address</Text>
                        <InputField
                            label={'Address'}
                            keyboardType="default"
                            value={address}
                            inputFieldType={'address'}
                            onChangeText={(text) => setAddress(text)}
                        />
                    </KeyboardAwareScrollView>
                    <View style={styles.buttonwrapper}>
                        <CustomButton label={"Confirm"}
                            onPress={() => { verifyBeforeSubmit() }}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default VerifyDetailsScreen;

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
        height: responsiveHeight(8),
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
