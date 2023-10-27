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
    Modal
} from 'react-native';
import axios from "axios";
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "@react-native-community/blur";
import { AuthContext } from '../context/AuthContext';
import { getProducts } from '../store/productSlice';
import { getCategory } from '../store/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { discountImg, milkImg, } from '../utils/Images';
import Loader from '../utils/Loader';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CustomHeader from '../components/CustomHeader';
import DatePicker from 'react-native-date-picker'
import CustomButton from '../components/CustomButton';
import moment from "moment"
import Toast from 'react-native-toast-message';
const BannerWidth = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(BannerWidth * 0.7)
const { height, width } = Dimensions.get('screen')

export default function ProductScreen({ navigation, route }) {

    const dispatch = useDispatch();
    const { data: products, status } = useSelector(state => state.products)
    const { data: category, categorystatus } = useSelector(state => state.category)
    const { userInfo } = useContext(AuthContext)
    const [selectedTab, setSelectedTab] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [startingDayQty, setStartingDayQty] = useState(1)
    const [date, setDate] = useState(new Date())
    const [datePlaceholder, setDatePlaceholder] = useState('Select a date')
    const [open, setOpen] = useState(false)

    const [date2, setDate2] = useState(new Date())
    const [datePlaceholder2, setDatePlaceholder2] = useState('Select a date')
    const [open2, setOpen2] = useState(false)

    const [productsData, setProductsData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [sundayQty, setSundayQty] = useState(1)
    const [mondayQty, setMondayQty] = useState(1)
    const [tuesdayQty, setTuesdayQty] = useState(1)
    const [wednesdayQty, setWednesdayQty] = useState(1)
    const [thursdayQty, setThursdayQty] = useState(1)
    const [fridayQty, setFridayQty] = useState(1)
    const [satardayQty, setSatardayQty] = useState(1)
    
    const [currentProductId, setCurrentProductId] = useState(0)

    const fetchProducts = () => {
        dispatch(getProducts())
    }
    const fetchCategory = () => {
        // dispatch(getCategory())
        getCategory()
    }

    useEffect(() => {
        fetchCategory();
        // fetchProducts();

    }, [])

    // useEffect(() => {
    //     //console.log(status,'product status')
    //     if (status == 'success') {
    //         setProductsData(products)
    //         setIsLoading(false)
    //     } else if (status == 'loading') {
    //         setIsLoading(true)
    //     }

    // }, [status])

    // useEffect(() => {
    //     //console.log(categorystatus,'category status')
    //     if (categorystatus == 'success') {
    //         setCategoryData(category)
    //         setIsLoading(false)
    //     } else if (categorystatus == 'loading') {
    //         setIsLoading(true)
    //     }

    // }, [categorystatus])

    const getCategory = () => {
        AsyncStorage.getItem('userToken', (err, usertoken) => {
            console.log(usertoken, 'user token')
            axios.get(`http://162.215.253.89/PCP2023/public/api/user/categories`, {
                headers: {
                    "Authorization": 'Bearer ' + usertoken,
                    "Content-Type": 'application/json'
                },
            })
                .then(res => {
                    //console.log(res.data.categorie, 'all category')
                    setCategoryData(res.data.categorie)
                    let obj = res.data.categorie;
                    //console.log(obj[Object.keys(obj)[0]])
                    let first_element = obj[Object.keys(obj)[0]];
                    //console.log(first_element.id)
                    getProduct(first_element.id)
                    setIsLoading(false);
                })
                .catch(e => {
                    console.log(`Category error ${e}`)
                });

        });
    }
    const getProduct = (id) => {
        const option = {
            "catagori_id": id
        }
        AsyncStorage.getItem('userToken', (err, usertoken) => {
            axios.post(`http://162.215.253.89/PCP2023/public/api/user/catagorybyproduct`,
                option,
                {
                    headers: {
                        "Authorization": 'Bearer ' + usertoken,
                        "Content-Type": 'application/json'
                    },
                })
                .then(res => {
                    console.log(res.data.product, 'category wise product')
                    setProductsData(res.data.product)
                    setIsLoading(false);
                })
                .catch(e => {
                    console.log(`Banner error ${e}`)
                });

        });
    }

    if (isLoading) {
        return (
            <Loader />
        )
    }


    const startingDayqtyIncrement = () => {
        setStartingDayQty(startingDayQty + 1)
    }

    const startingDayqtyDecrement = () => {
        if (startingDayQty > 0) {
            setStartingDayQty(startingDayQty - 1)
        }
    }

    const qtyIncrement = (qtyDay) => {
        // console.log(qtyDay)
        if (qtyDay == 'sundayQty') {
            setSundayQty(sundayQty + 1)
        } else if (qtyDay == 'mondayQty') {
            setMondayQty(mondayQty + 1)
        } else if (qtyDay == 'tuesdayQty') {
            setTuesdayQty(tuesdayQty + 1)
        } else if (qtyDay == 'wednesdayQty') {
            setWednesdayQty(wednesdayQty + 1)
        } else if (qtyDay == 'thursdayQty') {
            setThursdayQty(thursdayQty + 1)
        } else if (qtyDay == 'fridayQty') {
            setFridayQty(fridayQty + 1)
        } else if (qtyDay == 'satardayQty') {
            setSatardayQty(satardayQty + 1)
        }
    }

    const qtyDecrement = (qtyDay) => {
        // console.log(qtyDay)
        if (qtyDay == 'sundayQty') {
            if (sundayQty > 0) {
                setSundayQty(sundayQty - 1)
            }
        } else if (qtyDay == 'mondayQty') {
            if (mondayQty > 0) {
                setMondayQty(mondayQty - 1)
            }
        } else if (qtyDay == 'tuesdayQty') {
            if (tuesdayQty > 0) {
                setTuesdayQty(tuesdayQty - 1)
            }
        } else if (qtyDay == 'wednesdayQty') {
            if (wednesdayQty > 0) {
                setWednesdayQty(wednesdayQty - 1)
            }
        } else if (qtyDay == 'thursdayQty') {
            if (thursdayQty > 0) {
                setThursdayQty(thursdayQty - 1)
            }
        } else if (qtyDay == 'fridayQty') {
            if (fridayQty > 0) {
                setFridayQty(fridayQty - 1)
            }
        } else if (qtyDay == 'satardayQty') {
            if (satardayQty > 0) {
                setSatardayQty(satardayQty - 1)
            }

        }
    }

    const buyOnceModalOpen = (productId) => {
        setCurrentProductId(productId)
        setModalVisible(true)
    }
    const subscribeModalOpen = (productId) => {
        console.log(productId)
        setModalVisible2(true)
    }

    const placedByOnceOrder = () =>{
        const option = {
            "orders": [
              {
                "product_id": currentProductId,
                "quantity": startingDayQty,
                "date": moment(date).format("YYYY-MM-DD")
              }
            ]
          }
          console.log(option,'order plaayloaad')
          AsyncStorage.getItem('userToken', (err, usertoken) => {
            axios.post(`http://162.215.253.89/PCP2023/public/api/user/placeorder`,
                option,
                {
                    headers: {
                        "Authorization": 'Bearer ' + usertoken,
                        "Content-Type": 'application/json'
                    },
                })
                .then(res => {
                    console.log(res.data, 'place order')
                    if(res.data.st == '200'){
                        setModalVisible(false)
                        Toast.show({
                            type: 'success',
                            text2: res.data.orders.message,
                            position: 'top',
                            topOffset: Platform.OS == 'ios' ? 55 : 20
                        });
                    }else if(res.data.st == '400'){
                        setModalVisible(false)
                        Toast.show({
                            type: 'error',
                            text2: res.data.orders[0].error,
                            position: 'top',
                            topOffset: Platform.OS == 'ios' ? 55 : 20
                        });
                    }
                   
                })
                .catch(e => {
                    console.log(`place order error ${e}`)
                });

        });
    }

    const renderProducts = ({ item }) => {
        const save_amount = (item.ammount - item.discount_ammount);
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ProductDetailsScreen', { product_id: item.id })}>
                <View style={styles.productSection}>
                    <View style={styles.productCard}>
                        <View style={styles.offerView}>
                            <Image source={discountImg} style={styles.discountimg} />
                            <Text style={styles.discountText}>₹{save_amount}  DISCOUNT Bye Now @{item.discount_ammount} Only!</Text>
                        </View>
                        <Image source={{ uri: `http://162.215.253.89/PCP2023/public/${item?.thumbnail_img}` }} style={styles.productimage} />
                        <View style={{ alignSelf: 'flex-start', marginLeft: 10 }}>
                            <Text style={styles.productText} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.productText2}>{item.volume}</Text>
                            <Text style={styles.productText3}>₹{item.ammount}</Text>
                        </View>
                        <View style={styles.productButtonView}>
                            <TouchableWithoutFeedback onPress={() => buyOnceModalOpen(item.id)}>
                                <View style={styles.singleButtonView1}>
                                    <Text style={styles.singleButtonText1}>Buy Once</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => subscribeModalOpen(item.id)}>
                                <View style={styles.singleButtonView2}>
                                    <Text style={styles.singleButtonText2}>Subscribe</Text>
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
    categorywiseProduct = (index, id) => {
        setSelectedTab(index)
        getProduct(id)
    }

    const renderCategory = ({ item, index }) => {
        //console.log(item,'yyyyy')
        return (
            <TouchableWithoutFeedback onPress={() => categorywiseProduct(index, item.id)}>
                <View style={[styles.catView, { backgroundColor: selectedTab == index ? '#147999' : '#F8F8F8', }]}>
                    <Text style={[styles.catText, { color: selectedTab == index ? '#FFF' : '#444' }]}>{item.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <SafeAreaView style={styles.Container}>
            <CustomHeader commingFrom={'Home'} onPress={() => navigation.navigate('Notification')} onPressProfile={() => navigation.navigate('Profile')} />
            <View style={styles.wrapper}>
                <View style={styles.categoryTab}>
                    <FlatList
                        data={categoryData}
                        renderItem={renderCategory}
                        keyExtractor={(item, index) => index}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        removeClippedSubviews={true}
                        initialNumToRender={5}
                        numColumns={1}
                    />
                </View>
                <FlatList
                    data={productsData}
                    renderItem={renderProducts}
                    keyExtractor={(item, index) => index}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    initialNumToRender={5}
                    numColumns={1}
                />
            </View>
            {/*------------------ Buy Once modal start-------------*/}
            {modalVisible ?
                <BlurView
                    style={styles.blurabsolute}
                    blurType="chromeMaterialDark"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="black"
                /> : null}
            <Modal
                animationType="slide"
                backdropColor={'#9A9A9A'}
                backdropOpacity={10}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {

                }}>
                <View
                    style={{
                        height: '50%',
                        marginTop: 'auto',
                        backgroundColor: '#fff',
                        borderColor: '#1697C0',
                        borderWidth: 1,
                        elevation: 20,
                    }}>
                    <View style={styles.modalBody}>
                        <Text style={styles.modalsectionHeader}>Set Quantity</Text>
                        <View style={styles.quantityBody}>
                            <View style={styles.quantitySectionmodal2}>
                                <View style={styles.modal2quantityButton}>
                                    <TouchableWithoutFeedback onPress={() => startingDayqtyDecrement()}>
                                        <Entypo name="minus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '800', color: '#000' }}>{startingDayQty}</Text>
                                    <TouchableWithoutFeedback onPress={() => startingDayqtyIncrement()}>
                                        <Entypo name="plus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        <Text style={[styles.modalsectionHeader, { marginTop: 10, marginBottom: 10 }]}>Set Delivery Date</Text>
                        <TouchableOpacity onPress={() => setOpen(true)}>
                            <View style={styles.datebox}>
                                <Entypo name="calendar" size={25} color="#000" />
                                <Text style={styles.dayname}>  {datePlaceholder}</Text>
                            </View>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                                setDatePlaceholder(moment(date).format("DD-MM-YYYY"))
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <Entypo name="circle-with-cross" size={28} color="#1697C0" />
                    </TouchableOpacity>
                    <View style={styles.buttonwrapper}>
                        <CustomButton label={"Place Order"}
                            onPress={() => { placedByOnceOrder() }}
                        />
                    </View>
                </View>
            </Modal>
            {/*------------------ Buy Once modal end-------------*/}
            {/*------------------ repeating order modal start-------------*/}
            {modalVisible2 ?
                <BlurView
                    style={styles.blurabsolute}
                    blurType="chromeMaterialDark"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="black"
                /> : null}
            <Modal
                animationType="slide"
                backdropColor={'#9A9A9A'}
                backdropOpacity={10}
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => {

                }}>
                <View
                    style={{
                        height: '50%',
                        marginTop: 'auto',
                        backgroundColor: '#fff',
                        borderColor: '#1697C0',
                        borderWidth: 1,
                        elevation: 20,
                    }}>
                    <View style={styles.modalBody}>
                        <Text style={styles.modalsectionHeader}>Set Quantity</Text>
                        <View style={styles.quantityBody}>
                            <View style={styles.quantitySection}>
                                <View style={styles.modalquantityButton}>
                                    <TouchableWithoutFeedback onPress={() => qtyDecrement('sundayQty')}>
                                        <Entypo name="minus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '800', color: '#000' }}>{sundayQty}</Text>
                                    <TouchableWithoutFeedback onPress={() => qtyIncrement('sundayQty')}>
                                        <Entypo name="plus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                </View>
                                <Text style={styles.dayname}>Sun</Text>
                            </View>
                            <View style={styles.quantitySection}>
                                <View style={styles.modalquantityButton}>
                                    <TouchableWithoutFeedback onPress={() => qtyDecrement('mondayQty')}>
                                        <Entypo name="minus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '800', color: '#000' }}>{mondayQty}</Text>
                                    <TouchableWithoutFeedback onPress={() => qtyIncrement('mondayQty')}>
                                        <Entypo name="plus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                </View>
                                <Text style={styles.dayname}>Mon</Text>
                            </View>
                            <View style={styles.quantitySection}>
                                <View style={styles.modalquantityButton}>
                                    <TouchableWithoutFeedback onPress={() => qtyDecrement('tuesdayQty')}>
                                        <Entypo name="minus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '800', color: '#000' }}>{tuesdayQty}</Text>
                                    <TouchableWithoutFeedback onPress={() => qtyIncrement('tuesdayQty')}>
                                        <Entypo name="plus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                </View>
                                <Text style={styles.dayname}>Tue</Text>
                            </View>
                            <View style={styles.quantitySection}>
                                <View style={styles.modalquantityButton}>
                                    <TouchableWithoutFeedback onPress={() => qtyDecrement('wednesdayQty')}>
                                        <Entypo name="minus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '800', color: '#000' }}>{wednesdayQty}</Text>
                                    <TouchableWithoutFeedback onPress={() => qtyIncrement('wednesdayQty')}>
                                        <Entypo name="plus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                </View>
                                <Text style={styles.dayname}>Wed</Text>
                            </View>
                            <View style={styles.quantitySection}>
                                <View style={styles.modalquantityButton}>
                                    <TouchableWithoutFeedback onPress={() => qtyDecrement('thursdayQty')}>
                                        <Entypo name="minus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '800', color: '#000' }}>{thursdayQty}</Text>
                                    <TouchableWithoutFeedback onPress={() => qtyIncrement('thursdayQty')}>
                                        <Entypo name="plus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                </View>
                                <Text style={styles.dayname}>Thu</Text>
                            </View>
                            <View style={styles.quantitySection}>
                                <View style={styles.modalquantityButton}>
                                    <TouchableWithoutFeedback onPress={() => qtyDecrement('fridayQty')}>
                                        <Entypo name="minus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '800', color: '#000', color: '#000' }}>{fridayQty}</Text>
                                    <TouchableWithoutFeedback onPress={() => qtyIncrement('fridayQty')}>
                                        <Entypo name="plus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                </View>
                                <Text style={styles.dayname}>Fri</Text>
                            </View>
                            <View style={styles.quantitySection}>
                                <View style={styles.modalquantityButton}>
                                    <TouchableWithoutFeedback onPress={() => qtyDecrement('satardayQty')}>
                                        <Entypo name="minus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '800', color: '#000', color: '#000' }}>{satardayQty}</Text>
                                    <TouchableWithoutFeedback onPress={() => qtyIncrement('satardayQty')}>
                                        <Entypo name="plus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                </View>
                                <Text style={styles.dayname}>Sat</Text>
                            </View>
                        </View>
                        <Text style={[styles.modalsectionHeader, { marginTop: 10, marginBottom: 10 }]}>Set Start Date</Text>
                        <TouchableOpacity onPress={() => setOpen2(true)}>
                            <View style={styles.datebox}>
                                <Entypo name="calendar" size={25} color="#000" />
                                <Text style={styles.dayname}>  {datePlaceholder2}</Text>
                            </View>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={open2}
                            date={date2}
                            onConfirm={(date) => {
                                setOpen2(false)
                                setDate2(date)
                                setDatePlaceholder2(moment(date).format("DD-MM-YYYY"))
                            }}
                            onCancel={() => {
                                setOpen2(false)
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                            setModalVisible2(!modalVisible2);
                        }}>
                        <Entypo name="circle-with-cross" size={28} color="#1697C0" />
                    </TouchableOpacity>
                    <View style={styles.buttonwrapper}>
                        <CustomButton label={"Set a repeating order"}
                            onPress={() => { null }}
                        />
                    </View>
                </View>
            </Modal>
            {/*------------------ repeating order modal end-------------*/}
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
        padding: responsiveWidth(5),
        //paddingBottom: responsiveHeight(2)
    },
    categoryTab: {
        flexDirection: 'row',
        height: responsiveHeight(6)
    },
    catView: {
        height: responsiveHeight(5),
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#E4E4E4',
        borderWidth: 1,
        borderRadius: 20,
        marginRight: 15
    },
    catText: {
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2),
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
    productimage: {
        height: responsiveHeight(20),
        width: responsiveWidth(70),
        resizeMode: 'contain',
        alignSelf: 'center'
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
        marginBottom: 5
    },
    productButtonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    modalBody: {
        padding: 20
    },
    modalsectionHeader: {
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2.2),
        color: '#147999',
    },
    quantityBody: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    quantitySectionmodal2: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    modal2quantityButton: {
        height: responsiveHeight(5),
        width: responsiveWidth(30),
        backgroundColor: '#F8F8F8',
        borderColor: '#DCDCDC',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(2)
    },
    datebox: {
        flexDirection: 'row',
        alignItems: 'center',
        height: responsiveHeight(5),
        width: responsiveWidth(89),
        color: '#797979',
        borderColor: '#147999',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 20,
        backgroundColor: '#FFF',
        fontSize: responsiveFontSize(2)
    },
    dayname: {
        color: '#595959',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold'
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 20
    },
    buttonwrapper: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20
    },
    blurabsolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    modalquantityButton: {
        height: responsiveHeight(15),
        width: responsiveWidth(10),
        backgroundColor: '#F8F8F8',
        borderColor: '#DCDCDC',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(2)
    },
});