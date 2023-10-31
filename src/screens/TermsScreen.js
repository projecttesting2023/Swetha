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
    useWindowDimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import RenderHTML from "react-native-render-html";
import { API_URL } from '@env'
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
import AsyncStorage from "@react-native-async-storage/async-storage";
const BannerWidth = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(BannerWidth * 0.7)
const { height, width } = Dimensions.get('screen')

export default function TermsScreen({ navigation }) {

    const dispatch = useDispatch();
    const { data: products, status } = useSelector(state => state.products)
    const { userInfo } = useContext(AuthContext)

    const [selectedTab, setSelectedTab] = useState(1);
    const [isLoading, setIsLoading] = useState(true)
    const [termsCondition,setTermsCondition] = useState(`
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
  `)

    const { width } = useWindowDimensions();

    const fetchTerms = () => {
        AsyncStorage.getItem('userToken', (err, usertoken) => {
            axios.get(`${API_URL}/public/api/user/termsandconditions`,
                {
                    headers: {
                        "Authorization": 'Bearer ' + usertoken,
                        "Content-Type": 'application/json'
                    },
                })
                .then(res => {
                    // console.log(res.data.Termsandconditions[0], 'terms and condition')
                    setTermsCondition(res.data.Termsandconditions[0].description)
                    setIsLoading(false);
                })
                .catch(e => {
                    console.log(`terms and condition error ${e}`)
                });

        });
    }

    useEffect(() => {
        fetchTerms();
    }, [])

    if (isLoading) {
        return (
            <Loader />
        )
    }



    return (
        <SafeAreaView style={styles.Container}>
            <CustomHeader commingFrom={'Terms'} title={'Terms & Conditions'} onPress={() => navigation.goBack()} onPressProfile={() => navigation.navigate('Profile')} />
            <ScrollView style={styles.wrapper}>
            <RenderHTML contentWidth={width} source={{ html:termsCondition }} /> 
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
    

});