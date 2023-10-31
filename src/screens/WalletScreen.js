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
import Toast from 'react-native-toast-message';
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from '@env'
import RazorpayCheckout from 'react-native-razorpay';
import CustomSwitch from '../components/CustomSwitch';
import ListItem from '../components/ListItem';
import { AuthContext } from '../context/AuthContext';
import { getProducts } from '../store/productSlice'
import { API_URL } from '@env'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { allUserImg, categoryImg, chatImg, chatImgRed, discountImg, documentImg, milk2Img, milkImg, offerImg, requestImg, userPhoto } from '../utils/Images';
import Loader from '../utils/Loader';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CustomHeader from '../components/CustomHeader';
import data from '../model/data'
import CustomButton from '../components/CustomButton';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BannerWidth = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(BannerWidth * 0.7)
const { height, width } = Dimensions.get('screen')

export default function WalletScreen({ navigation }) {

    const dispatch = useDispatch();
    const { data: products, status } = useSelector(state => state.products)
    const { userInfo } = useContext(AuthContext)
    let razorpayKeyId = RAZORPAY_KEY_ID;
    let razorpayKeySecret = RAZORPAY_KEY_SECRET;

    const [amount, setAmount] = React.useState('');
    const [promocode, setPromocode] = React.useState('');
    const [walletAmount, setWalletAmount] = React.useState('0.00')
    const [isLoading, setIsLoading] = useState(true)

    const fetchProfileDetails = () => {
        AsyncStorage.getItem('userToken', (err, usertoken) => {
           
            axios.get(`${API_URL}/public/api/user/getUser`, {
                headers: {
                    "Authorization": 'Bearer ' + usertoken,
                    "Content-Type": 'application/json'
                },
            })
                .then(res => {
                    console.log(res.data.user,'user details')
                    let userInfo = res.data.user; 
                    setWalletAmount(userInfo.walate)
                    setIsLoading(false);
                })
                .catch(e => {
                    console.log(`Login error ${e}`)
                }); 
        });
       
    }

    useEffect(() => {
        fetchProfileDetails();
    }, [])

    if (status == 'loading') {
        return (
            <Loader />
        )
    }

    const currency = 'INR';
    const handlePayment = () => {
        if (amount == '') {
            Toast.show({
                type: 'error',
                text1: 'Hello',
                text2: 'Please Enter the Amount',
                position: 'top',
                topOffset: Platform.OS == 'ios' ? 55 : 20
            });
        } else {
            var options = {
                description: 'This is the description we need',
                image: 'https://i.imgur.com/3g7nmJC.jpg',
                currency: 'INR',
                key: razorpayKeyId,
                amount: amount * 100,
                name: 'Customer 1',
                order_id: '',
                prefill: {
                    email: 'xyz@example.com',
                    contact: '9191919191',
                    name: 'Person Name'
                },
                theme: { color: '#1697C0' }
            }
            RazorpayCheckout.open(options).then((data) => {
                // handle success
                alert(`Success: ${data.razorpay_payment_id}`);
            }).catch((error) => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
            });
        }

    }

    const checkPromocode = () => {
        if (promocode != '') {
            const option = {
                "offerscode": promocode,
                "amount": amount
            }
            AsyncStorage.getItem('userToken', (err, usertoken) => {
                axios.post(`${API_URL}/public/api/user/checkpromocode`,
                    option,
                    {
                        headers: {
                            "Authorization": 'Bearer ' + usertoken,
                            "Content-Type": 'application/json'
                        },
                    })
                    .then(res => {
                        console.log(res.data, 'promo codeeeee')
                        if (res.data.st == "200") {
                            Toast.show({
                                type: 'success',
                                text2: "Promo code is valid",
                                position: 'top',
                                topOffset: Platform.OS == 'ios' ? 55 : 20
                            });
                            
                        } else {
                            Toast.show({
                                type: 'error',
                                text2: "Promo code is invalid",
                                position: 'top',
                                topOffset: Platform.OS == 'ios' ? 55 : 20
                            });
                        }

                        // setIsLoading(false);
                    })
                    .catch(e => {
                        console.log(`Promo code error ${e}`)
                    });

            });
        } else {
            Toast.show({
                type: 'info',
                text2: "Please enter Promo code",
                position: 'top',
                topOffset: Platform.OS == 'ios' ? 55 : 20
            });
        }
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
                            <Text style={styles.balanceTextValue}>₹{walletAmount}</Text>
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
                                placeholderTextColor="#808080"
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
                                placeholderTextColor="#808080"
                            //letterSpacing={2}
                            />
                        </View>
                        <View style={styles.buttonwrapper}>
                            <CustomButton label={"Apply"}
                                comingFrom={'wallet'}
                                onPress={() => checkPromocode()}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonwrapper2}>
                <CustomButton label={"Choose Payment Mode"}
                    comingFrom={'wallet'}
                    onPress={() => handlePayment()}
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
        fontSize: responsiveFontSize(2.5),
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
        color: '#808080'
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
        position: 'absolute',
        alignSelf: 'center',
        bottom: 10

    },


});