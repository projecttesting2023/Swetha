import React, { useContext, useState, useMemo } from 'react';
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

const DeliveryInstruction = ({ navigation }) => {

    const [selectedId, setSelectedId] = useState('1');
    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Ring Bell',
            labelStyle:{
                color:'#808080'
            },
            value: 'ring_bell',
            borderColor: '#147999',
            color: '#147999',
            containerStyle:{width:responsiveWidth(89),borderColor:'#147999',borderWidth:1,borderRadius:8,height:responsiveHeight(7),paddingHorizontal:10}
        },
        {
            id: '2',
            label: 'Deliver at door step',
            labelStyle:{
                color:'#808080'
            },
            value: 'deliver_at_door_step',
            borderColor: '#147999',
            color: '#147999',
            containerStyle:{width:responsiveWidth(89),borderColor:'#147999',borderWidth:1,borderRadius:8,height:responsiveHeight(7),paddingHorizontal:10}
        },
        {
            id: '3',
            label: 'Deliver at security',
            labelStyle:{
                color:'#808080'
            },
            value: 'deliver_at_security',
            borderColor: '#147999',
            color: '#147999',
            containerStyle:{width:responsiveWidth(89),borderColor:'#147999',borderWidth:1,borderRadius:8,height:responsiveHeight(7),paddingHorizontal:10}
        },
        {
            id: '4',
            label: 'Drop the packets in bag/basket',
            labelStyle:{
                color:'#808080'
            },
            value: 'drop_the_packets_in_bag',
            borderColor: '#147999',
            color: '#147999',
            containerStyle:{width:responsiveWidth(89),borderColor:'#147999',borderWidth:1,borderRadius:8,height:responsiveHeight(7),paddingHorizontal:10}
        }
    ]), []);

    return (
        <SafeAreaView style={styles.Container}>
            <CustomHeader commingFrom={'Delivery Instruction'} onPress={() => navigation.goBack()} title={'Delivery Instruction'} />
            <ScrollView style={{ paddingHorizontal: 20, marginBottom: responsiveHeight(3), marginTop: responsiveHeight(3) }}>
                <RadioGroup
                    radioButtons={radioButtons}
                    onPress={setSelectedId}
                    selectedId={selectedId}
                    layout='coloum'
                />
            </ScrollView>

            <View style={styles.buttonwrapper2}>
                <CustomButton label={"Save"}
                    onPress={() => { null }}
                />
            </View>
        </SafeAreaView>
    );
};

export default DeliveryInstruction;

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
