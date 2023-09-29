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
    Dimensions
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
import { allUserImg, categoryImg, chatImg, chatImgRed, discountImg, documentImg, milk2Img, milkImg, offerImg, offerpageImg, requestImg, userPhoto } from '../utils/Images';
import Loader from '../utils/Loader';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CustomHeader from '../components/CustomHeader';
import data from '../model/data'
import CustomButton from '../components/CustomButton';

const BannerWidth = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(BannerWidth * 0.7)
const { height, width } = Dimensions.get('screen')

export default function HelpScreen({ navigation }) {

    const dispatch = useDispatch();
    const { data: products, status } = useSelector(state => state.products)
    const { userInfo } = useContext(AuthContext)

    const [selectedTab, setSelectedTab] = useState(1);

    const fetchProducts = () => {
        dispatch(getProducts())

    }

    useEffect(() => {
        //fetchProducts();
    }, [])

    if (status == 'loading') {
        return (
            <Loader />
        )
    }



    return (
        <SafeAreaView style={styles.Container}>
            <CustomHeader commingFrom={'Help'} title={'Help & Support'} onPress={() => navigation.goBack()} onPressProfile={() => navigation.navigate('Profile')} />
            <ScrollView style={styles.wrapper}>
                <Text style={{ color: '#444', fontFamily: 'Poppins-Regular', fontSize: responsiveFontSize(3), fontWeight: '500', marginBottom: responsiveHeight(2) }}>We are happy to serve you?</Text>
                <View style={styles.bannerView}>
                    <Text style={styles.bannerText1}>Call us</Text>
                    <Text style={styles.bannerText2}>800 800 5221</Text>
                    <Text style={styles.bannerText1}>(Or)</Text>
                    <Text style={styles.bannerText1}>Please drop a message on WhatsApp at</Text>
                    <Text style={styles.bannerText2}>800 800 5221</Text>
                    <View style={styles.line} />
                    <Text style={styles.bannerText1}>Swetha Dairy Farm</Text>
                    <Text style={styles.bannerText1}>We care!</Text>
                </View>
                
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: responsiveHeight(1)
    },
    wrapper: {
        padding: 20,
        //paddingBottom: responsiveHeight(2)
    },
    bannerView: {
        height: responsiveHeight(40),
        width: responsiveWidth(90),
        backgroundColor: '#E6F6FB',
        padding: 20
    },
    bannerText1: {
        color: '#444',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        marginBottom: responsiveHeight(1)
    },
    bannerText2: {
        color: '#0B6D8D',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(3),
        fontWeight: '400',
        marginBottom: responsiveHeight(1)
    },
    buttonView: {
        backgroundColor: '#000',
        borderRadius: 62,
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(40),
        height: responsiveHeight(6),
        alignSelf: 'center',
        marginTop: responsiveHeight(2)
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
        color: '#FFF',
    },
    productimage: {
        height: responsiveHeight(18),
        width: responsiveWidth(70),
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: responsiveHeight(1)
    },
    buttonwrapper: {
        marginTop: 20
    },
    line: {
        borderBottomColor: '#92D6EC',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: responsiveWidth(80),
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2)
    },

});