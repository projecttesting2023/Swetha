import React, { useContext, useState, useMemo, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, TextInput, ScrollView } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Logo from '../assets/images/misc/logo.svg';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RadioGroup from 'react-native-radio-buttons-group';
import RNDateTimePicker from '@react-native-community/datetimepicker'
import CustomHeader from '../components/CustomHeader';
import moment from "moment"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from '../utils/Loader';


const DeliveryAddressScreen = ({ navigation }) => {

    const [address, setAddress] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const fetchProfileDetails = () => {
        AsyncStorage.getItem('userInfo', (err, userInfo) => {
            let data = JSON.parse(userInfo)
            setAddress(data.address)
            setIsLoading(false)
        });
    }
    useEffect(() => {
        fetchProfileDetails()
    }, [])


    if (isLoading) {
        return (
            <Loader />
        )
    }
    return (
        <SafeAreaView style={styles.Container}>
            <CustomHeader commingFrom={'Delivery Address'} onPress={() => navigation.goBack()} title={'Delivery Address'} />
            <ScrollView style={{ paddingHorizontal: 20, marginBottom: responsiveHeight(3), marginTop: responsiveHeight(3) }}>
                <View style={{ padding: 10, borderRadius: 10, borderColor: '#147999', borderWidth: 1 }}>
                    <Text style={{ color: '#444', fontFamily: "Poppins-Regular", fontSize: responsiveFontSize(2), fontWeight: '800', marginBottom: 5 }}>Saved Address</Text>
                    <Text style={{ color: '#444', fontFamily: 'Poppins-Regular', fontSize: responsiveFontSize(1.8) }}>{address}</Text>
                </View>
            </ScrollView>
            <Text style={styles.bottomText}>To Change Your Address</Text>
            <View style={styles.buttonwrapper1}>
                <CustomButton label={"Message Us"}
                    onPress={() => { null }}
                />
            </View>
            <View style={styles.buttonwrapper2}>
                <CustomButton label={"Call Us"}
                    onPress={() => { null }}
                />
            </View>
        </SafeAreaView>
    );
};

export default DeliveryAddressScreen;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    buttonwrapper1: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 70,
    },
    buttonwrapper2: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 10,
    },
    rechargeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: responsiveHeight(7),
        width: responsiveWidth(89),
        borderColor: '#147999',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10
    },
    bottomText: {
        color: '#000',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2),
        textAlign: 'center',
        position: 'absolute',
        bottom: 130,
        right: 50,
        left: 50
    }

});
