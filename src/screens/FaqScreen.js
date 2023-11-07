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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

import CustomSwitch from '../components/CustomSwitch';
import ListItem from '../components/ListItem';
import { AuthContext } from '../context/AuthContext';
import { getProducts } from '../store/productSlice'

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { accordianminusImg, accordianplusImg, allUserImg, categoryImg, chatImg, chatImgRed, discountImg, documentImg, milk2Img, milkImg, offerImg, offerpageImg, requestImg, userPhoto } from '../utils/Images';
import Loader from '../utils/Loader';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CustomHeader from '../components/CustomHeader';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import data from '../model/data'
import CustomButton from '../components/CustomButton';

const BannerWidth = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(BannerWidth * 0.7)
const { height, width } = Dimensions.get('screen')

export default function FaqScreen({ navigation }) {

    const dispatch = useDispatch();
    const { data: products, status } = useSelector(state => state.products)
    const { userInfo } = useContext(AuthContext)

    const [activeSections, setActiveSections] = useState([]);
    const [collapsed, setCollapsed] = useState(true);

    const toggleExpanded = () => {
        setCollapsed(!collapsed)
    };

    const setSections = sections => {
        setActiveSections(sections.includes(undefined) ? [] : sections)
    };

    const renderHeader = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={[styles.header, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={styles.headerText}>{section.title}</Text>
                    {isActive ?
                        <Image source={accordianminusImg} style={styles.iconimg} />
                        :
                        <Image source={accordianplusImg} style={styles.iconimg} />
                    }
                </View>
            </Animatable.View>
        );
    };

    const renderContent = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={[styles.content, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >

                <View style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#E6F6FB' }}>
                    <Animatable.Text animation={isActive ? 'zoomIn' : undefined}>
                        {section.body}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make.
                    </Animatable.Text>
                    <Animatable.Image
                        animation={isActive ? 'zoomIn' : undefined}
                        style={{height:responsiveHeight(10),width:responsiveWidth(85),resizeMode:'cover',marginTop:20}}
                        source={{uri:section.imgUrl}}
                    />
                </View>

            </Animatable.View>
        );
    }

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
            <CustomHeader commingFrom={'FAQs'} title={'FAQs'} onPress={() => navigation.goBack()} onPressProfile={() => navigation.navigate('Profile')} />
            <ScrollView style={styles.wrapper}>
                <Collapsible collapsed={collapsed} align="center">
                    <View style={styles.content}>
                        <Text>
                            Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
                            ribs
                        </Text>
                    </View>
                </Collapsible>
                <Accordion
                    activeSections={activeSections}
                    sections={data}
                    touchableComponent={TouchableOpacity}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    duration={400}
                    onChange={setSections}
                />
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
    iconimg: {
        height: responsiveHeight(5),
        width: responsiveWidth(5),
        resizeMode: 'contain',
    },


});