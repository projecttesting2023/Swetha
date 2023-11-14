import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, ImageBackground, Image, FlatList, TouchableWithoutFeedback, KeyboardAwareScrollView, Modal } from 'react-native'
import CustomHeader from '../components/CustomHeader'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import CustomButton from '../components/CustomButton'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import { getOffer } from '../store/offerSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../utils/Loader';
import { discountImg, milkImg, } from '../utils/Images';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from '@env'

const OfferScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { data: offer, status } = useSelector(state => state.offer)
    const [selected, setSelected] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [offerData, setOfferData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const fetchOffers = () => {
        //dispatch(getOffer())

        AsyncStorage.getItem('userToken', (err, usertoken) => {
            axios.get(`${API_URL}/public/api/user/offerproducts`,
                {
                    headers: {
                        "Authorization": 'Bearer ' + usertoken,
                        "Content-Type": 'application/json'
                    },
                })
                .then(res => {
                    console.log(res.data.offerproducts.data, 'category wise product')
                    setOfferData(res.data.offerproducts.data)
                    setIsLoading(false);
                })
                .catch(e => {
                    console.log(`Banner error ${e}`)
                });

        });
    }

    useEffect(() => {
        fetchOffers();
    }, [])

    // useEffect(() => {
    //     console.log(status, 'offer status')
    //     if (status == 'success') {
    //         setOfferData(offer)
    //         setIsLoading(false)
    //     } else if (status == 'loading') {
    //         setIsLoading(true)
    //     }
    // }, [status])

    const renderProducts = ({ item }) => {
        const save_amount = (item.ammount - item.discount_ammount);
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('OfferDetailsScreen', { product_id: item.id })}>
                <View style={styles.productSection}>
                    <View style={styles.productCard}>
                        <View style={styles.offerView}>
                            <Image source={discountImg} style={styles.discountimg} />
                            <Text style={styles.discountText}>₹{save_amount}  DISCOUNT Bye Now @{item.discount_ammount} Only!</Text>
                        </View>
                        <Image source={{ uri: `${API_URL}/public/${item?.thumbnail_img}` }} style={styles.productimage} />
                        <View style={{ alignSelf: 'flex-start', marginLeft: 10 }}>
                            <Text style={styles.productText} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.productText2}>{item.volume}</Text>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={styles.productText3}>₹{item.ammount}</Text>
                                <Text style={styles.productText4}>₹{item.discount_ammount}</Text>
                            </View>
                        </View>
                        <View style={styles.productButtonView}>
                            {/* <TouchableWithoutFeedback onPress={() => buyOnceModalOpen(item.id)}>
                                <View style={styles.singleButtonView1}>
                                    <Text style={styles.singleButtonText1}>Buy Once</Text>
                                </View>
                            </TouchableWithoutFeedback> */}
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('OfferDetailsScreen', { product_id: item.id })}>
                                <View style={styles.singleButtonView2}>
                                    <Text style={styles.singleButtonText2}>Grab Now</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View style={styles.overflowTag}>
                        <Text style={styles.overflowText}>SWETHA</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <SafeAreaView style={styles.Container}>
            <CustomHeader commingFrom={'Offer'} onPress={() => navigation.goBack()} title={'Offers'} />
            <ScrollView style={styles.wrapper}>
                <View style={{ marginBottom: responsiveHeight(5) }}>
                    <FlatList
                        data={offerData}
                        renderItem={renderProducts}
                        keyExtractor={(item, index) => index}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        removeClippedSubviews={true}
                        initialNumToRender={5}
                        numColumns={1}
                    />
                </View>
            </ScrollView>
            {/* <View style={styles.buttonwrapper}>
                <CustomButton label={"Open Calender"} buttonIcon={false} onPress={() => setModalVisible(true)} />
            </View> */}

        </SafeAreaView>
    )
}

export default OfferScreen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    wrapper: {
        padding: responsiveWidth(5),
        marginBottom: responsiveHeight(1)
    },
    buttonwrapper: {
        alignSelf: 'center',
        marginVertical: 10,
        position: 'absolute',
        bottom: 0
    },
    modalbuttonwrapper: {
        alignSelf: 'center',
        marginVertical: 10
    },
    modalBody: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 20
    },
    productimage: {
        height: responsiveHeight(20),
        width: responsiveWidth(70),
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    productdescView: {
        flexDirection: 'column',
        marginLeft: 10
    },
    productTitle: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
        fontSize: responsiveFontSize(2),
        color: '#000'
    },
    productdesc: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
        fontSize: responsiveFontSize(1.5),
        color: '#797979'
    },
    productPrice: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
        fontSize: responsiveFontSize(2),
        color: '#147999'
    },
    daliveryDate: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
        fontSize: responsiveFontSize(1.5),
        color: '#797979'
    },
    productSection: {
        marginTop: responsiveHeight(2)
    },
    productCard: {
        height: responsiveHeight(44),
        width: responsiveWidth(90),
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 10,
        //alignItems: 'center'
    },
    offerView: {
        backgroundColor: '#FEF6EB',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        height: responsiveHeight(4.5),
        margin: 10,
        paddingHorizontal: 10
    },
    discountimg: {
        height: responsiveHeight(5),
        width: responsiveWidth(5),
        resizeMode: 'contain',
        marginRight: 10
    },
    discountText: {
        color: '#444',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2)
    },
    productText: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '700',
        fontSize: responsiveFontSize(2),
        color: '#444',
        marginBottom: 5,
    },
    productText2: {
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(1.5),
        color: '#797979',
        marginBottom: 5
    },
    productText3: {
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2),
        color: '#444',
        marginBottom: 5,
        marginRight: 10
    },
    productButtonView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        marginTop: 10
    },
    singleButtonView1: {
        height: responsiveHeight(4),
        width: responsiveWidth(25),
        backgroundColor: '#F2F2F2',
        borderColor: '#E4E4E4',
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    singleButtonText1: {
        color: '#444',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(1.8)
    },
    singleButtonView2: {
        height: responsiveHeight(4),
        width: responsiveWidth(25),
        backgroundColor: '#147999',
        borderColor: '#147999',
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    singleButtonText2: {
        color: '#FFF',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(1.8)
    },
    overflowTag: {
        position: 'absolute',
        right: 10,
        top: responsiveHeight(8),
        height: responsiveHeight(3),
        width: responsiveWidth(18),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        borderColor: '#147999',
        borderWidth: 1,
        borderRadius: 15
    },
    overflowText: {
        color: '#595959',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(1.5)
    },
    productText4: {
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2.2),
        color: '#F25C5C',
        marginBottom: 7,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        marginRight: 10
    },
});
