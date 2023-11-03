import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, StatusBar, Image, FlatList, TouchableOpacity, Animated, KeyboardAwareScrollView, useWindowDimensions } from 'react-native'
import CustomHeader from '../components/CustomHeader'
import Feather from 'react-native-vector-icons/Feather';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { TextInput, LongPressGestureHandler, State } from 'react-native-gesture-handler'
import { deleteImg, editImg, milkImg, phoneImg, searchImg, userPhoto } from '../utils/Images'
import { API_URL } from '@env'
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from '../utils/Loader';
import moment from "moment"


const WalletHistoryScreen = ({ navigation }) => {

    const [walletHistory, setWalletHistory] = React.useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchWalletHistory();
    }, [])

    const fetchWalletHistory = () => {
        AsyncStorage.getItem('userToken', (err, usertoken) => {

            axios.get(`${API_URL}/public/api/user/paydetails`, {
                headers: {
                    "Authorization": 'Bearer ' + usertoken,
                    "Content-Type": 'application/json'
                },
            })
                .then(res => {
                    console.log(res.data.paydetails, 'user details')
                    setWalletHistory(res.data.paydetails)
                    setIsLoading(false);
                })
                .catch(e => {
                    console.log(`Login error ${e}`)
                });
        });
    }

    if (isLoading) {
        return (
            <Loader />
        )
    }

    const renderHistory = (item, index) => {
        //console.log(item)
        return (
            <>
                {item.item.status == 1 ?
                    <View style={styles.singleValue}>
                        <Feather name="arrow-up-right" size={22} color="#4cbb17" />
                        <View style={{ flexDirection: 'column', marginLeft: 20, width: responsiveWidth(50) }}>
                            <Text style={{ color: '#444', fontFamily: 'Poppins-Regular', fontSize: responsiveFontSize(2), fontWeight: '700' }}>Credit</Text>
                            <Text style={{ color: '#444', fontFamily: 'Poppins-Regular', fontSize: responsiveFontSize(1.7), }}>{item.item.trasanction_id}</Text>
                            <Text style={{ color: '#444', fontFamily: 'Poppins-Regular', fontSize: responsiveFontSize(2), }}>{moment(item.item.created_at).format("DD-MM-YYYY")}</Text>
                        </View>
                        <View style={{ width: responsiveWidth(20), marginLeft: 10 }}>
                            <Text style={{ color: '#444', fontFamily: 'Poppins-Regular', fontSize: responsiveFontSize(2), fontWeight: '700', textAlign: 'right' }}>+{item.item.amount}</Text>
                        </View>
                    </View>
                    :
                    <View style={styles.singleValue}>
                        <Feather name="arrow-down-left" size={22} color="#F25C5C" />
                        <View style={{ flexDirection: 'column', marginLeft: 20, width: responsiveWidth(50) }}>
                            <Text style={{ color: '#444', fontFamily: 'Poppins-Regular', fontSize: responsiveFontSize(2), fontWeight: '700' }}>Debit</Text>
                            <Text style={{ color: '#444', fontFamily: 'Poppins-Regular', fontSize: responsiveFontSize(1.7), }}>{item.item.trasanction_id}</Text>
                            <Text style={{ color: '#444', fontFamily: 'Poppins-Regular', fontSize: responsiveFontSize(2), }}>{moment(item.item.created_at).format("DD-MM-YYYY")}</Text>
                        </View>
                        <View style={{ width: responsiveWidth(20), marginLeft: 10 }}>
                            <Text style={{ color: '#444', fontFamily: 'Poppins-Regular', fontSize: responsiveFontSize(2), fontWeight: '700', textAlign: 'right' }}>-{item.item.amount}</Text>
                        </View>
                    </View>
                }
            </>
        )
    }

    return (
        <SafeAreaView style={styles.Container}>
            <CustomHeader commingFrom={'WalletHistory'} onPress={() => navigation.goBack()} title={'Wallet History'} />
            <ScrollView style={styles.wrapper}>

                <FlatList
                    data={walletHistory}
                    renderItem={renderHistory}
                    keyExtractor={(item, index) => index}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    initialNumToRender={5}
                    numColumns={1}
                />

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
        height: responsiveHeight(10),
        padding: 5,
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }

});
