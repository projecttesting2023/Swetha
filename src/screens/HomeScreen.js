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
import axios from "axios";
import BannerSlider from '../components/BannerSlider';
import { windowWidth } from '../utils/Dimensions';

import { AuthContext } from '../context/AuthContext';
import { WHATSAPP_LINK,API_URL } from '@env'

import { useDispatch, useSelector } from 'react-redux';

import { categoryImg, milk2Img, milkImg, whatsappImg } from '../utils/Images';
import Loader from '../utils/Loader';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CustomHeader from '../components/CustomHeader';
import Carousel from 'react-native-banner-carousel';
import data from '../model/data'
import { getCategory } from '../store/categorySlice';
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getBanner } from '../store/bannerSlice';

const BannerWidth = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(BannerWidth * 0.7)
const { height, width } = Dimensions.get('screen')


export default function HomeScreen({ navigation }) {

  const dispatch = useDispatch();
  const { data: category, categorystatus } = useSelector(state => state.category)
  const { data: banner, bannerstatus } = useSelector(state => state.banner)
  const { userInfo } = useContext(AuthContext)
  const [selectedTab, setSelectedTab] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [bannerData, setBannerData] = useState([])
  const [recomended, setRecomended] = useState([])

  useEffect(() => {
    getCategory()
    getBanner()
  }, [])

  const getCategory = () => {
    AsyncStorage.getItem('userToken', (err, usertoken) => {
      console.log(usertoken, 'user token')
      axios.get(`${API_URL}/public/api/user/categories`, {
        headers: {
          "Authorization": 'Bearer ' + usertoken,
          "Content-Type": 'application/json'
        },
      })
        .then(res => {
          console.log(res.data.categorie, 'all category')
          let obj = res.data.categorie;
          //console.log(obj[Object.keys(obj)[0]])
          let first_element = obj[Object.keys(obj)[0]];
          //console.log(first_element.id)
          getProduct(first_element.id)
          setCategoryData(res.data.categorie)
          setIsLoading(false);
        })
        .catch(e => {
          console.log(`Category error ${e}`)
        });

    });
  }

  const getBanner = () => {
    AsyncStorage.getItem('userToken', (err, usertoken) => {
      axios.get(`${API_URL}/public/api/user/banner`, {
        headers: {
          "Authorization": 'Bearer ' + usertoken,
          "Content-Type": 'application/json'
        },
      })
        .then(res => {
          //console.log(res.data.banner, 'all banner')
          setBannerData(res.data.banner)
          setIsLoading(false);
        })
        .catch(e => {
          console.log(`Banner error ${e}`)
        });

    });
  }

  const getProduct = (id) => {
    const option = {
      "catagori_id": id
    }
    AsyncStorage.getItem('userToken', (err, usertoken) => {
      axios.post(`${API_URL}/public/api/user/catagorybyproduct`,
        option,
        {
          headers: {
            "Authorization": 'Bearer ' + usertoken,
            "Content-Type": 'application/json'
          },
        })
        .then(res => {
          console.log(res.data.product, 'category wise product')
          setRecomended(res.data.product)
          setIsLoading(false);
        })
        .catch(e => {
          console.log(`Banner error ${e}`)
        });

    });
  }

  // useEffect(() => {
  //   console.log(categorystatus, 'categorystatus')
  //   if (categorystatus == 'success') {
  //     setCategoryData(category)
  //     setIsLoading(false)
  //   } else if (categorystatus == 'loading') {
  //     setIsLoading(true)
  //   }

  // }, [categorystatus])

  // useEffect(() => {
  //   console.log(bannerstatus, 'bannerstatus')
  //   console.log(banner, 'bbbbbb')
  //   if (bannerstatus == 'success') {
  //     setBannerData(banner)
  //     setIsLoading(false)
  //   } else if (bannerstatus == 'loading') {
  //     setIsLoading(true)
  //   }

  // }, [bannerstatus])

  // if (isLoading) {
  //   return (
  //     <Loader />
  //   )
  // }

  const CarouselCardItem = (item, index) => {
    // console.log(item, 'banner itemmm')
    return (
      <View style={styles.bannaerContainer}>
        <Image
          source={{ uri: `${API_URL}/public/${item?.img}` }}
          style={styles.bannerBg}
        />
        <View style={styles.textWrap}>
          {item?.title && <Text style={styles.bannerText}>{item?.title}</Text>}
          {item?.description && <Text style={styles.bannerSubText} numberOfLines={4}>{item?.description}</Text>}
        </View>
      </View>
    )
  }

  const categorywiseProduct = (index, id) => {
    console.log(index, id)
    setSelectedTab(index)
    getProduct(id)
  }

  const renderCategory = (item, index) => {
    return (
      <TouchableWithoutFeedback onPress={() => categorywiseProduct(item.index, item.item.id)}>
        <View style={styles.singleCategoryView}>
          <View style={[styles.categoryImageView, { backgroundColor: selectedTab == item.index ? '#00B2EB' : '#F1F1F1', }]}>
            <Image source={{ uri: `${API_URL}/public/${item?.item.img}` }} style={styles.image} />
          </View>
          <Text style={styles.imageText}>{item.item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const renderRecomended = (item, index) => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('ProductDetailsScreen', { product_id: item.item.id })}>
        <View style={styles.singleRecomendedView}>
          <View style={[styles.recomendedImageView]}>
            <Image source={{ uri: `${API_URL}/public/${item?.item.thumbnail_img}` }} style={styles.recomendedimage} />
            <Text style={styles.recomendedText} numberOfLines={1}>{item.item.name}</Text>
            <Text style={styles.recomendedText2}>{item.item.volume}</Text>
            <Text style={styles.recomendedText3}>₹{item.item.ammount}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <SafeAreaView style={styles.Container}>
      <CustomHeader commingFrom={'Home'} onPress={() => navigation.navigate('Notification')} onPressProfile={() => navigation.navigate('Profile')} />
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: responsiveHeight(2) }}>
          <Carousel
            autoplay
            autoplayTimeout={5000}
            loop
            index={0}
            pageSize={BannerWidth}
            showsPageIndicator={true}
            activePageIndicatorStyle={{ backgroundColor: '#00B2EB' }}
          >
            {bannerData.map((datab, index) =>
              CarouselCardItem(datab, index)

            )}
          </Carousel>
        </View>
        <Text style={styles.categoryHeader}>Popular Categories</Text>
        <View style={styles.categoryContainer}>

          <FlatList
            data={categoryData}
            renderItem={renderCategory}
            keyExtractor={(item, index) => index}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            initialNumToRender={5}
            numColumns={3}
          />

        </View>

        <View style={{ marginTop: responsiveHeight(2), flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.categoryHeader}>Recomended</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Product')}>
            <Text style={styles.seealltext}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recomendedContainer}>
          <FlatList
            data={recomended}
            renderItem={renderRecomended}
            keyExtractor={(item, index) => index}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            initialNumToRender={5}
            numColumns={2}
          />
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
      <TouchableOpacity onPress={() => Linking.openURL(WHATSAPP_LINK)}>
        <View style={styles.floatingView}>
          <Image source={whatsappImg} style={styles.floatingImg} />
        </View>
      </TouchableOpacity>
      <AnimatedLoader
        visible={isLoading}
        overlayColor="rgba(255, 255, 255, 0.75)"
        animationStyle={styles.lottie}
        source={require("../../src/assets/loader/loader.json")}
        speed={1}
      />
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
    alignItems: 'center',
    marginRight: responsiveWidth(2.3),
    marginBottom: responsiveHeight(1)
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
    backgroundColor: '#FFF',
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
    color: '#000',
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

  },
  lottie: {
    width: responsiveWidth(40),
    height: responsiveHeight(60)
  },

});