import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    FlatList,
    StyleSheet,
    Dimensions,
    TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';


import CustomSwitch from '../components/CustomSwitch';
import ListItem from '../components/ListItem';
import { AuthContext } from '../context/AuthContext';
import { getProducts } from '../store/productSlice'

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { allUserImg, categoryImg, chatImg, chatImgRed, discountImg, documentImg, milk2Img, milkImg, offerImg, requestImg, userPhoto } from '../utils/Images';
import Loader from '../utils/Loader';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CustomHeader from '../components/CustomHeader';
import data from '../model/data'
import CustomButton from '../components/CustomButton';

const BannerWidth = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(BannerWidth * 0.7)
const { height, width } = Dimensions.get('screen')

export default function WalletScreen({ navigation }) {

    const dispatch = useDispatch();
    const { data: products, status } = useSelector(state => state.products)
    const { userInfo } = useContext(AuthContext)

    const [amount, setAmount] = React.useState('');
    const [promocode, setPromocode] = React.useState('');

    const fetchProducts = () => {
        dispatch(getProducts())

    }

    useEffect(() => {
        fetchProducts();
    }, [])

    if (status == 'loading') {
        return (
            <Loader />
        )
    }



    return (
        <SafeAreaView style={styles.Container}>
            <CustomHeader commingFrom={'wallet'} title={'Wallet'} onHistoryPress={() => navigation.navigate('WalletHistory')} onPress={() => navigation.goBack()} />
            <ScrollView style={styles.wrapper}>
                <View style={{ marginBottom: responsiveHeight(2.5) }}>
                    <View style={styles.balanceView}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.balanceTextHeader}>Wallet Balance</Text>
                            {/* <Text style={styles.balanceTextHeader2}>Tomorrow’s basket value</Text> */}
                        </View>
                        <View style={{ flexDirection: 'column', backgroundColor: '#1697C0', height: responsiveHeight(9), width: responsiveWidth(30), borderRadius: 10, justifyContent: 'center' }}>
                            <Text style={styles.balanceTextValue}>₹0.00</Text>
                            {/* <Text style={styles.balanceTextValue2}>₹0.00</Text> */}
                        </View>
                    </View>
                    <View style={styles.amountView}>
                        <Text style={styles.amountTextHeader}>Enter Amount</Text>
                        <View style={styles.buttonView}>
                            <TextInput
                                style={styles.input}
                                onChangeText={setAmount}
                                value={amount}
                                placeholder="Enter Amount"
                                keyboardType="default"
                            //letterSpacing={2}
                            />
                        </View>
                        <View style={styles.amountButtonView}>
                            <TouchableOpacity onPress={() => setAmount('1000')}>
                                <View style={styles.singleAmountView}>
                                    <Text style={styles.amountButtonText}>₹1000</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setAmount('1500')}>
                                <View style={styles.singleAmountView}>
                                    <Text style={styles.amountButtonText}>₹1500</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setAmount('3000')}>
                                <View style={styles.singleAmountView}>
                                    <Text style={styles.amountButtonText}>₹3000</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.saveamountText}>To save time recharge more amount</Text>
                       
                    </View>
                    <View style={styles.promocodeView}>
                        <Text style={styles.promocodeTextHeader}>Do you have a promocode?</Text>
                        <View style={styles.buttonView}>
                            <TextInput
                                style={styles.input}
                                onChangeText={setPromocode}
                                value={promocode}
                                placeholder="Enter Promocode"
                                keyboardType="default"
                            //letterSpacing={2}
                            />
                        </View>
                        <View style={styles.buttonwrapper}>
                            <CustomButton label={"Apply"}
                                comingFrom={'wallet'}
                                onPress={null}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonwrapper2}>
                <CustomButton label={"Choose Payment Mode"}
                    comingFrom={'wallet'}
                    onPress={null}
                />
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: responsiveHeight(1),
    },
    wrapper: {
        padding: responsiveWidth(5),
        marginBottom: responsiveHeight(1)
    },
    balanceView: {
        height: responsiveHeight(9),
        width: responsiveWidth(90),
        borderColor: '#147999',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    balanceTextHeader: {
        marginLeft: 10,
        marginBottom: 5,
        color: '#444',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2.7),
        fontWeight: '500'
    },
    balanceTextHeader2: {
        marginLeft: 10,
        color: '#797979',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2),
        fontWeight: '500'
    },
    balanceTextValue: {
        marginLeft: 10,
        marginBottom: 5,
        color: '#FFF',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(3),
        fontWeight: '700'
    },
    balanceTextValue2: {
        marginLeft: 10,
        color: '#F8F8F8',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2),
        fontWeight: '500'
    },
    amountView: {
        height: responsiveHeight(28),
        width: responsiveWidth(90),
        borderColor: '#147999',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15
    },
    amountTextHeader: {
        marginBottom: 15,
        color: '#444',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2.7),
        fontWeight: '500'
    },
    amountButtonText: {
        color: '#0B6D8D',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2)
    },
    saveamountText: {
        marginTop: 15,
        marginBottom: 15,
        color: '#797979',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2),
        textAlign: 'center'
    },
    promocodeView: {
        height: responsiveHeight(22),
        width: responsiveWidth(90),
        borderColor: '#147999',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    promocodeTextHeader: {
        marginBottom: 15,
        color: '#444',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2.7),
        fontWeight: '500'
    },
    buttonView: {
        backgroundColor: '#FFF',
        width: '100%',
        height: responsiveHeight(6),
        borderRadius: 62,
        marginBottom: responsiveHeight(2),
        borderWidth: 1,
        borderColor: '#147999',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    input: {
        fontSize: responsiveFontSize(2),
    },
    amountButtonView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    singleAmountView: {
        height: responsiveHeight(6),
        width: responsiveWidth(25),
        backgroundColor: '#E6F6FB',
        borderColor: '#92D6EC',
        borderWidth: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonwrapper: {
       // marginTop: 1
    },
    buttonwrapper2: {
        position:'absolute',
        alignSelf: 'center',
        bottom:10

    },


});