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
  Linking
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BannerSlider from '../components/BannerSlider';
import { windowWidth } from '../utils/Dimensions';

import { freeGames, paidGames, sliderData } from '../model/data';
import CustomSwitch from '../components/CustomSwitch';
import ListItem from '../components/ListItem';
import { AuthContext } from '../context/AuthContext';
import { getProducts } from '../store/productSlice'

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { allUserImg, categoryImg, chatImg, chatImgRed, documentImg, milk2Img, milkImg, offerImg, requestImg, userPhoto, whatsappImg } from '../utils/Images';
import Loader from '../utils/Loader';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CustomHeader from '../components/CustomHeader';
import Carousel from 'react-native-banner-carousel';
import data from '../model/data'

const BannerWidth = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(BannerWidth * 0.7)
const { height, width } = Dimensions.get('screen')


export default function HomeScreen({ navigation }) {

  const dispatch = useDispatch();
  const { data: products, status } = useSelector(state => state.products)
  const { userInfo } = useContext(AuthContext)

  const [selectedTab, setSelectedTab] = useState(1);

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

  const CarouselCardItem = (item, index) => {
    //console.log(item.imgUrl,'item from banner data')
    return (
      <View style={styles.bannaerContainer}>
        <Image
          source={{ uri: item?.imgUrl }}
          style={styles.bannerBg}
        />
        <View style={styles.textWrap}>
          {item?.title && <Text style={styles.bannerText}>{item?.title}</Text>}
          {item?.body && <Text style={styles.bannerSubText} numberOfLines={4}>{item?.body}</Text>}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.Container}>
      <CustomHeader commingFrom={'Home'} onPress={() => navigation.navigate('Notification')} onPressProfile={() => navigation.navigate('Profile')} />
      <ScrollView style={styles.wrapper}>
        <View style={{ marginBottom: responsiveHeight(2) }}>
          {/* <Carousel
            autoplay
            autoplayTimeout={5000}
            loop
            index={0}
            pageSize={BannerWidth}
            activePageIndicatorStyle={{ backgroundColor: '#00B2EB' }}
          >
            {data.map((data, index) =>
              CarouselCardItem(data, index)
            )}
          </Carousel> */}
        </View>
        <Text style={styles.categoryHeader}>Popular Categories</Text>
        <View style={styles.categoryContainer}>

          <TouchableWithoutFeedback onPress={() => setSelectedTab(1)}>
            <View style={styles.singleCategoryView}>
              <View style={[styles.categoryImageView, { backgroundColor: selectedTab == 1 ? '#00B2EB' : '#F1F1F1', }]}>
                <Image source={categoryImg} style={styles.image} />
              </View>
              <Text style={styles.imageText}>Milk</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => setSelectedTab(2)}>
            <View style={styles.singleCategoryView}>
              <View style={[styles.categoryImageView, { backgroundColor: selectedTab == 2 ? '#00B2EB' : '#F1F1F1', }]}>
                <Image source={categoryImg} style={styles.image} />
              </View>
              <Text style={styles.imageText}>Curd & Paneer</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => setSelectedTab(3)}>
            <View style={styles.singleCategoryView}>
              <View style={[styles.categoryImageView, { backgroundColor: selectedTab == 3 ? '#00B2EB' : '#F1F1F1', }]}>
                <Image source={categoryImg} style={styles.image} />
              </View>
              <Text style={styles.imageText}>Butter</Text>
            </View>
          </TouchableWithoutFeedback>

        </View>
        <View style={styles.categoryContainer}>

          <TouchableWithoutFeedback onPress={() => setSelectedTab(4)}>
            <View style={styles.singleCategoryView}>
              <View style={[styles.categoryImageView, { backgroundColor: selectedTab == 4 ? '#00B2EB' : '#F1F1F1', }]}>
                <Image source={categoryImg} style={styles.image} />
              </View>
              <Text style={styles.imageText}>Ghee</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => setSelectedTab(5)}>
            <View style={styles.singleCategoryView}>
              <View style={[styles.categoryImageView, { backgroundColor: selectedTab == 5 ? '#00B2EB' : '#F1F1F1', }]}>
                <Image source={categoryImg} style={styles.image} />
              </View>
              <Text style={styles.imageText}>Dairy Desserts</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => setSelectedTab(6)}>
            <View style={styles.singleCategoryView}>
              <View style={[styles.categoryImageView, { backgroundColor: selectedTab == 6 ? '#00B2EB' : '#F1F1F1', }]}>
                <Image source={offerImg} style={styles.offerimage} />
              </View>
              <Text style={styles.imageText}>Offers</Text>
            </View>
          </TouchableWithoutFeedback>

        </View>
        <View style={{ marginTop: responsiveHeight(2), flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.categoryHeader}>Recomended</Text>
          <Text style={styles.seealltext}>See All</Text>
        </View>
        <View style={styles.recomendedContainer}>
          <ScrollView horizontal={true}>
            <View style={styles.singleRecomendedView}>
              <View style={[styles.recomendedImageView]}>
                <Image source={milkImg} style={styles.recomendedimage} />
                <Text style={styles.recomendedText} numberOfLines={1}>A2 Buffalo Milk Pouch</Text>
                <Text style={styles.recomendedText2}>500 ML POUCH</Text>
                <Text style={styles.recomendedText3}>₹44.00</Text>
              </View>
            </View>
            <View style={styles.singleRecomendedView}>
              <View style={[styles.recomendedImageView]}>
                <Image source={milk2Img} style={styles.recomendedimage} />
                <Text style={styles.recomendedText} numberOfLines={1}>A2 Buffalo Milk Double Toned</Text>
                <Text style={styles.recomendedText2}>500 ML POUCH</Text>
                <Text style={styles.recomendedText3}>₹36.00</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={{ marginTop: responsiveHeight(2) }}>
          <Text style={styles.categoryHeader}>Quick Actions</Text>
        </View>
        <View style={styles.categoryContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Wallet')}>
            <View style={[styles.quickActionButton, { backgroundColor: '#95B70C' }]}>
              <MaterialCommunityIcons name="wallet-outline" size={28} color="#FFF" />
              <Text style={styles.quickActionText}>Recharge your wallet</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={[styles.quickActionButton, { backgroundColor: '#15B3E4' }]}>
            <MaterialCommunityIcons name="calendar-sync" size={28} color="#FFF" />
            <Text style={styles.quickActionText}>Edit your subscription</Text>
          </View>
        </View>
        <View style={styles.categoryContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Order Statement')}>
            <View style={[styles.quickActionButton, { backgroundColor: '#79C59E' }]}>
              <MaterialCommunityIcons name="file-document-outline" size={28} color="#FFF" />
              <Text style={styles.quickActionText}>View order statement</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Holidays')}>
            <View style={[styles.quickActionButton, { backgroundColor: '#2D81E3' }]}>
              <MaterialCommunityIcons name="calendar-range-outline" size={28} color="#FFF" />
              <Text style={styles.quickActionText}>Add your holiday</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ marginTop: responsiveHeight(2), paddingBottom: responsiveFontSize(3), alignSelf: 'center' }}>
          <Text style={styles.bottomText}>Click to watch <Text style={{ color: '#2D81E3' }}>YouTube</Text> Tutorial</Text>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => Linking.openURL('whatsapp://send?phone=8961819682')}>
        <View style={styles.floatingView}>
          <Image source={whatsappImg} style={styles.floatingImg} />
        </View>
      </TouchableOpacity>
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
  categoryHeader: {
    color: '#2E2E2E',
    fontFamily: 'Poppins-SemiBold',
    fontSize: responsiveFontSize(2),
    fontWeight: '600'
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(2),
  },
  singleCategoryView: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  categoryImageView: {
    height: responsiveHeight(15),
    width: responsiveWidth(28),
    borderRadius: 15,
    marginBottom: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: responsiveHeight(10),
    width: responsiveWidth(21),
    resizeMode: 'contain'
  },
  offerimage: {
    height: responsiveHeight(9),
    width: responsiveWidth(15),
    resizeMode: 'contain'
  },
  imageText: {
    color: '#444',
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(1.5)
  },
  bottomText: {
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(2),
    color: '#444',
    marginBottom: 5
  },
  recomendedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(2),
  },
  singleRecomendedView: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: responsiveWidth(6)
  },
  recomendedImageView: {
    height: responsiveHeight(30),
    width: responsiveWidth(42),
    borderRadius: 15,
    marginBottom: 5,
    flexDirection: 'column',
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F1'
  },
  recomendedimage: {
    height: responsiveHeight(20),
    width: responsiveWidth(30),
    resizeMode: 'contain'
  },
  recomendedText: {
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(1.8),
    color: '#444',
    paddingHorizontal: 5,
    marginBottom: 5
  },
  recomendedText2: {
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(1.5),
    color: '#797979',
    marginBottom: 5
  },
  recomendedText3: {
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(1.8),
    color: '#444',
    marginBottom: 5
  },
  seealltext: {
    color: '#15B3E4',
    fontFamily: 'Poppins-SemiBold',
    fontSize: responsiveFontSize(2),
    fontWeight: '600'
  },
  floatingView: {
    backgroundColor: 'red',
    height: 50,
    width: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 10,
    right: 20
  },
  floatingImg: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  // banner section

  bannerheader: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  bannerbody: {
    color: "#222",
    fontSize: 18,
  },
  bannerBg: {
    flex: 1,
    position: 'absolute',
    right: 0,
    // bottom: 20,
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10
  },
  textWrap: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bannerText: {
    fontSize: responsiveFontSize(2),
    color: '#000',
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
    position: 'relative',
    zIndex: 1,
    width: width * 0.5,
    marginBottom: 15,
    paddingLeft: 20,
  },

  bannerSubText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '300',
    fontFamily: 'Poppins-Regular',
    position: 'relative',
    zIndex: 1,
    width: width * 0.5,
    marginBottom: 15,
    paddingLeft: 20,
  },
  bannaerContainer: {
    width: responsiveWidth(89),
    height: responsiveHeight(20),
    backgroundColor: '#fff',
    borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // //shadowRadius: 4.65,
    // elevation: 7,
  },
  quickActionButton: {
    height: responsiveHeight(10),
    width: responsiveWidth(43),
    borderRadius: 10,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  quickActionText: {
    paddingHorizontal: 10,
    textAlign: 'left',
    color: '#FFF',
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',

  }

});