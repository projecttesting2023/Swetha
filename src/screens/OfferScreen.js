import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity, KeyboardAwareScrollView, Modal } from 'react-native'
import CustomHeader from '../components/CustomHeader'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { milkImg } from '../utils/Images'
import CustomButton from '../components/CustomButton'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import { getOffer } from '../store/offerSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../utils/Loader';


const OfferScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { data: offer, status } = useSelector(state => state.offer)
    const [selected, setSelected] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [offerData, setOfferData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const fetchOffers = () => {
        dispatch(getOffer())
    }

    useEffect(() => {
        fetchOffers();
    }, [])

    useEffect(() => {
        console.log(status, 'offer status')
        if (status == 'success') {
            setOfferData(offer)
            setIsLoading(false)
        } else if (status == 'loading') {
            setIsLoading(true)
        }
    }, [status])

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <SafeAreaView style={styles.Container}>
            <CustomHeader commingFrom={'Offer'} onPress={() => navigation.goBack()} title={'Offers'} />
            <ScrollView style={styles.wrapper}>
                <View style={styles.itemlist}>
                    <Image source={milkImg} style={styles.productimage} />
                    <View style={styles.productdescView}>
                        <Text style={styles.productTitle}>A2 Buffalo Milk Pouch</Text>
                        <Text style={styles.productdesc}>500 ML POUCH </Text>
                        <Text style={styles.productPrice}>₹44.00  X 2</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.daliveryDate}>Delivery by 11 PM</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.itemlist}>
                    <Image source={milkImg} style={styles.productimage} />
                    <View style={styles.productdescView}>
                        <Text style={styles.productTitle}>A2 Buffalo Milk Pouch</Text>
                        <Text style={styles.productdesc}>500 ML POUCH </Text>
                        <Text style={styles.productPrice}>₹44.00  X 2</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.daliveryDate}>Delivery by 11 PM</Text>
                        </View>
                    </View>
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
    itemlist: {
        height: responsiveHeight(15),
        width: responsiveWidth(90),
        marginVertical: 10,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: '#F1F1F1',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    productimage: {
        height: responsiveHeight(20),
        width: responsiveWidth(25),
        resizeMode: 'contain'
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
    }

});
