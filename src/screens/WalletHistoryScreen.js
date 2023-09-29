import React, { useState, useMemo } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, StatusBar, Image, TouchableOpacity, Animated, KeyboardAwareScrollView, useWindowDimensions } from 'react-native'
import CustomHeader from '../components/CustomHeader'
import Feather from 'react-native-vector-icons/Feather';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { TextInput, LongPressGestureHandler, State } from 'react-native-gesture-handler'
import { deleteImg, editImg, milkImg, phoneImg, searchImg, userPhoto } from '../utils/Images'



const WalletHistoryScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.Container}>
            <CustomHeader commingFrom={'WalletHistory'} onPress={() => navigation.goBack()} title={'Wallet History'} />
            <ScrollView style={styles.wrapper}>
                <View style={styles.singleValue}>
                    <Feather name="arrow-up-right" size={22} color="#4cbb17" />
                    <View style={{flexDirection:'column',marginLeft:20,width:responsiveWidth(50)}}>
                        <Text style={{color: '#444',fontFamily: 'Poppins-Regular',fontSize: responsiveFontSize(2),fontWeight:'700'}}>Credit</Text>
                        <Text style={{color: '#444',fontFamily: 'Poppins-Regular',fontSize: responsiveFontSize(2),}}>2099-09-19</Text>
                    </View>
                    <View style={{width:responsiveWidth(20),marginLeft:10}}>
                        <Text style={{color: '#444',fontFamily: 'Poppins-Regular',fontSize: responsiveFontSize(2),fontWeight:'700',textAlign:'right'}}>+200</Text>
                    </View>
                </View>
                <View style={styles.singleValue}>
                    <Feather name="arrow-down-left" size={22} color="#F25C5C" />
                    <View style={{flexDirection:'column',marginLeft:20,width:responsiveWidth(50)}}>
                        <Text style={{color: '#444',fontFamily: 'Poppins-Regular',fontSize: responsiveFontSize(2),fontWeight:'700'}}>Debit</Text>
                        <Text style={{color: '#444',fontFamily: 'Poppins-Regular',fontSize: responsiveFontSize(2),}}>2099-09-19</Text>
                    </View>
                    <View style={{width:responsiveWidth(20),marginLeft:10}}>
                        <Text style={{color: '#444',fontFamily: 'Poppins-Regular',fontSize: responsiveFontSize(2),fontWeight:'700',textAlign:'right'}}>-200</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default WalletHistoryScreen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    wrapper: {
        padding: responsiveWidth(5),

    },
    singleValue: {
        width: responsiveWidth(89),
        height: responsiveHeight(7),
        padding: 5,
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        flexDirection:'row',
        alignItems:'center'
    }

});
