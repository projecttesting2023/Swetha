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
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker'
import CustomSwitch from '../components/CustomSwitch';
import ListItem from '../components/ListItem';
import { AuthContext } from '../context/AuthContext';
import { getProducts } from '../store/productSlice'
import moment from "moment"
import axios from 'axios';
import { API_URL } from '@env'
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { allUserImg, categoryImg, chatImg, chatImgRed, discountImg, documentImg, milk2Img, milkImg, offerImg, requestImg, userPhoto } from '../utils/Images';
import Loader from '../utils/Loader';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CustomHeader from '../components/CustomHeader';
import data from '../model/data'
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { BlurView } from '@react-native-community/blur';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';
const BannerWidth = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(BannerWidth * 0.7)
const { height, width } = Dimensions.get('screen')
import { useFocusEffect } from '@react-navigation/native';

export default function ProductDetailsScreen({ navigation, route }) {

    const dispatch = useDispatch();
    const { data: products, status } = useSelector(state => state.products)
    const { userInfo } = useContext(AuthContext)

    const [selectedTab, setSelectedTab] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [repeatingdate, setrepeatingDate] = useState(new Date())
    const [datePlaceholder, setDatePlaceholder] = useState('Select a date')
    const [repeatingopen, setrepeatingOpen] = useState(false)

    const [altdate, setaltDate] = useState(new Date())
    const [altopen, setaltOpen] = useState(false)
    const [datePlaceholder2, setDatePlaceholder2] = useState('Select a date')

    const [sundayQty, setSundayQty] = useState(1)
    const [mondayQty, setMondayQty] = useState(1)
    const [tuesdayQty, setTuesdayQty] = useState(1)
    const [wednesdayQty, setWednesdayQty] = useState(1)
    const [thursdayQty, setThursdayQty] = useState(1)
    const [fridayQty, setFridayQty] = useState(1)
    const [satardayQty, setSatardayQty] = useState(1)

    const [startingDayQty, setStartingDayQty] = useState(1)
    const [succeedingDayQty, setSucceedingDayQty] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [productsData, setProductsData] = useState([])
    const [currentProductId, setCurrentProductId] = useState(0)

    const currentDate = moment();

    // Get the next day
    const nextDay = currentDate.add(2, 'days');

    // Format the next day as a string (if needed)
    const formattedNextDay = nextDay.format('YYYY-MM-DD');

    const fetchProducts = () => {

        console.log(route?.params?.product_id, 'product idddd')
        const option = {
            "id": route?.params?.product_id
        }
        AsyncStorage.getItem('userToken', (err, usertoken) => {
            axios.post(`${API_URL}/public/api/user/productsearch`,
                option,
                {
                    headers: {
                        "Authorization": 'Bearer ' + usertoken,
                        "Content-Type": 'application/json'
                    },
                })
                .then(res => {
                    console.log(res.data.product, 'product details')
                    setProductsData(res.data.product)
                    setCurrentProductId(res.data.product[0].id)
                    setIsLoading(false);
                })
                .catch(e => {
                    console.log(`Product Details error ${e}`)
                });

        });
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            fetchProducts();
        }, [])
    )

    if (isLoading) {
        return (
            <Loader />
        )
    }

    const qtyIncrement = (qtyDay) => {
        console.log(qtyDay)
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
        console.log(qtyDay)
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



    const startingDayqtyIncrement = () => {
        setStartingDayQty(startingDayQty + 1)
    }

    const startingDayqtyDecrement = () => {
        if (startingDayQty > 0) {
            setStartingDayQty(startingDayQty - 1)
        }
    }

    const succeedingDayqtyIncrement = () => {
        setSucceedingDayQty(succeedingDayQty + 1)
    }

    const succeedingDayqtyDecrement = () => {
        if (succeedingDayQty > 0) {
            setSucceedingDayQty(succeedingDayQty - 1)
        }
    }

    const placedByRepeatingOrder = () => {
        // console.log(currentProductId, 'currentProductId')
        // console.log(sundayQty, 'sundayQty')
        // console.log(mondayQty, 'mondayQty')
        // console.log(tuesdayQty, 'tuesdayQty')
        // console.log(wednesdayQty, 'wednesdayQty')
        // console.log(thursdayQty, 'thursdayQty')
        // console.log(fridayQty, 'fridayQty')
        // console.log(satardayQty, 'satardayQty')
        // console.log(moment(date2).format("DD-MM-YYYY"), 'date')

        var option = []
        if (sundayQty != 0) {
            option.push({
                "product_id": currentProductId,
                "quantity": sundayQty,
                "date": moment(repeatingdate).format("DD-MM-YYYY"),
                "product_subscription": 7,
                "product_days": "sun"
            })
        }
        if (mondayQty != 0) {
            option.push({
                "product_id": currentProductId,
                "quantity": mondayQty,
                "date": moment(repeatingdate).format("DD-MM-YYYY"),
                "product_subscription": 7,
                "product_days": "mon"
            })
        }
        if (tuesdayQty != 0) {
            option.push({
                "product_id": currentProductId,
                "quantity": tuesdayQty,
                "date": moment(repeatingdate).format("DD-MM-YYYY"),
                "product_subscription": 7,
                "product_days": "tue"
            })
        }
        if (wednesdayQty != 0) {
            option.push({
                "product_id": currentProductId,
                "quantity": wednesdayQty,
                "date": moment(repeatingdate).format("DD-MM-YYYY"),
                "product_subscription": 7,
                "product_days": "wed"
            })
        }
        if (thursdayQty != 0) {
            option.push({
                "product_id": currentProductId,
                "quantity": thursdayQty,
                "date": moment(repeatingdate).format("DD-MM-YYYY"),
                "product_subscription": 7,
                "product_days": "thu"
            })
        }
        if (fridayQty != 0) {
            option.push({
                "product_id": currentProductId,
                "quantity": fridayQty,
                "date": moment(repeatingdate).format("DD-MM-YYYY"),
                "product_subscription": 7,
                "product_days": "fri"
            })
        }
        if (satardayQty != 0) {
            option.push({
                "product_id": currentProductId,
                "quantity": satardayQty,
                "date": moment(repeatingdate).format("DD-MM-YYYY"),
                "product_subscription": 7,
                "product_days": "sat"
            })
        }
        let payloadData = {
            "orders": option
        }
        console.log(payloadData, 'mmmmmmmmmmmmmmmmmmmmmm')

        AsyncStorage.getItem('userToken', (err, usertoken) => {
            axios.post(`${API_URL}/public/api/user/placeorder`,
                payloadData,
                {
                    headers: {
                        "Authorization": 'Bearer ' + usertoken,
                        "Content-Type": 'application/json'
                    },
                })
                .then(res => {
                    console.log(res.data, 'place order')
                    if (res.data.st == '200') {
                        setModalVisible(false)
                        Toast.show({
                            type: 'success',
                            text2: res.data.orders.message,
                            position: 'top',
                            topOffset: Platform.OS == 'ios' ? 55 : 20
                        });
                    } else if (res.data.st == '400') {
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

    const placedAlternatedayOrder = () => {
        console.log(startingDayQty, 'startingDayQty')
        console.log(succeedingDayQty, 'succeedingDayQty')
        console.log(moment(altdate).format("DD-MM-YYYY"), 'altdate')
        const option = {
            "orders": [
                {
                    "product_id": currentProductId,
                    "quantity": startingDayQty,
                    "date": moment(altdate).format("DD-MM-YYYY"),
                    "product_subscription": 4,
                    "product_days": "0"
                },
                {
                    "product_id": currentProductId,
                    "quantity": succeedingDayQty,
                    "date": moment(altdate).format("DD-MM-YYYY"),
                    "product_subscription": 4,
                    "product_days": "0"
                },
                {
                    "product_id": currentProductId,
                    "quantity": succeedingDayQty,
                    "date": moment(altdate).format("DD-MM-YYYY"),
                    "product_subscription": 4,
                    "product_days": "0"
                },
                {
                    "product_id": currentProductId,
                    "quantity": succeedingDayQty,
                    "date": moment(altdate).format("DD-MM-YYYY"),
                    "product_subscription": 4,
                    "product_days": "0"
                }
            ]
        }

        AsyncStorage.getItem('userToken', (err, usertoken) => {
            axios.post(`${API_URL}/public/api/user/placeorder`,
                option,
                {
                    headers: {
                        "Authorization": 'Bearer ' + usertoken,
                        "Content-Type": 'application/json'
                    },
                })
                .then(res => {
                    console.log(res.data, 'place order')
                    if (res.data.st == '200') {
                        setModalVisible2(false)
                        Toast.show({
                            type: 'success',
                            text2: res.data.orders.message,
                            position: 'top',
                            topOffset: Platform.OS == 'ios' ? 55 : 20
                        });
                    } else if (res.data.st == '400') {
                        setModalVisible2(false)
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

    let current_date = new Date()
    let day_after_current_date = current_date.getDate() + 1

    return (
        <SafeAreaView style={styles.Container}>
            <CustomHeader commingFrom={'product'} title={'Product Details'} onPress={() => navigation.navigate('ProductScreen')} onPressProfile={() => navigation.navigate('Profile')} />
            <ScrollView style={styles.wrapper}>
                <View style={{ paddingBottom: responsiveHeight(3) }}>
                    <View style={styles.imageView}>
                        <Image source={{ uri: `${API_URL}/public/${productsData[0].thumbnail_img}` }} style={styles.productimage} />
                    </View>
                    <View style={{ alignSelf: 'flex-start', marginTop: responsiveHeight(2) }}>
                        <Text style={styles.productText}>{productsData[0].name}</Text>
                        <Text style={styles.productText2}>{productsData[0].volume}</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={styles.productText3}>₹{productsData[0].discount_ammount}</Text>
                            <Text style={styles.productText4}>₹{productsData[0].ammount}</Text>
                        </View>
                    </View>
                    <View style={styles.line} />
                    {/* <Text style={styles.quantityText}>Quantity</Text>
                    <View style={styles.quantityButton}>
                        <Entypo name="minus" size={28} color="#000" />
                        <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '800' }}>1</Text>
                        <Entypo name="plus" size={28} color="#000" />
                    </View> */}
                    <Text style={styles.descriptionText}>Description</Text>
                    <Text style={styles.productText2}>{productsData[0].product_description.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
                    <View style={styles.buttonwrapper2}>
                        <CustomButton label={"Place Repeating Order"}
                            comingFrom={''}
                            onPress={() => setModalVisible(true)}
                        />
                    </View>
                    <View style={styles.buttonwrapper2}>
                        <CustomButton label={"Place Alternate Day Order"}
                            comingFrom={''}
                            onPress={() => setModalVisible2(true)}
                        />
                    </View>
                </View>
                <View style={styles.overflowTag}>
                    <Text style={styles.overflowText}>SWETHA</Text>
                </View>
            </ScrollView>

            {/*------------------ repeating order modal start-------------*/}
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
                                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '800', color: '#000' }}>{fridayQty}</Text>
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
                                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '800', color: '#000' }}>{satardayQty}</Text>
                                    <TouchableWithoutFeedback onPress={() => qtyIncrement('satardayQty')}>
                                        <Entypo name="plus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                </View>
                                <Text style={styles.dayname}>Sat</Text>
                            </View>
                        </View>
                        <Text style={[styles.modalsectionHeader, { marginTop: 10, marginBottom: 10 }]}>Set Start Date</Text>
                        <TouchableOpacity onPress={() => setrepeatingOpen(true)}>
                            <View style={styles.datebox}>
                                <Entypo name="calendar" size={25} color="#000" />
                                <Text style={styles.dayname}>  {datePlaceholder}</Text>
                            </View>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={repeatingopen}
                            date={repeatingdate}
                            minimumDate={new Date(formattedNextDay)}
                            onConfirm={(date) => {
                                setrepeatingOpen(false)
                                setrepeatingDate(date)
                                console.log(date)
                                setDatePlaceholder(moment(date).format("DD-MM-YYYY"))
                            }}
                            onCancel={() => {
                                setrepeatingOpen(false)
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
                        <CustomButton label={"Set a repeating order"}
                            onPress={() => { placedByRepeatingOrder() }}
                        />
                    </View>
                </View>
            </Modal>
            {/*------------------ repeating order modal end-------------*/}
            {/*------------------ alternate day modal start-------------*/}
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
                        <Text style={styles.modalsectionHeader}>Quantity on the starting day</Text>
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
                        <Text style={styles.modalsectionHeader}>Quantity on the succeeding day</Text>
                        <View style={styles.quantityBody}>
                            <View style={styles.quantitySectionmodal2}>
                                <View style={styles.modal2quantityButton}>
                                    <TouchableWithoutFeedback onPress={() => succeedingDayqtyDecrement()}>
                                        <Entypo name="minus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '800', color: '#000' }}>{succeedingDayQty}</Text>
                                    <TouchableWithoutFeedback onPress={() => succeedingDayqtyIncrement()}>
                                        <Entypo name="plus" size={28} color="#000" />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        <Text style={[styles.modalsectionHeader, { marginTop: 10, marginBottom: 10 }]}>Set Start Date</Text>
                        <TouchableOpacity onPress={() => setaltOpen(true)}>
                            <View style={styles.datebox}>
                                <Entypo name="calendar" size={25} color="#000" />
                                <Text style={styles.dayname}>  {datePlaceholder2}</Text>
                            </View>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={altopen}
                            date={altdate}
                            minimumDate={new Date(formattedNextDay)}
                            onConfirm={(date) => {
                                setaltOpen(false)
                                setaltDate(date)
                                setDatePlaceholder2(moment(date).format("DD-MM-YYYY"))
                            }}
                            onCancel={() => {
                                setaltOpen(false)
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
                        <CustomButton label={"Add Subscription"}
                            onPress={() => { placedAlternatedayOrder() }}
                        />
                    </View>
                </View>
            </Modal>
            {/*------------------ alternate day modal end-------------*/}
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
    },
    imageView: {
        height: responsiveHeight(30),
        width: responsiveWidth(90),
        backgroundColor: '#F4F4F4',
        justifyContent: 'center'
    },
    productimage: {
        height: responsiveHeight(30),
        width: responsiveWidth(70),
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    productText: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '700',
        fontSize: responsiveFontSize(2.5),
        color: '#444',
        marginBottom: 7,
    },
    productText2: {
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2),
        color: '#797979',
        marginBottom: 7
    },
    productText3: {
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2.2),
        color: '#147999',
        marginBottom: 7,
        marginRight: responsiveWidth(10),

    },
    productText4: {
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2.2),
        color: '#F25C5C',
        marginBottom: 7,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    line: {
        borderBottomColor: '#9A9A9A',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: responsiveWidth(30),
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2)
    },
    quantityText: {
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2),
        color: '#444',
        marginBottom: 7
    },
    descriptionText: {
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2.5),
        color: '#444',
        marginBottom: 7
    },
    quantityButton: {
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
    buttonwrapper2: {
        marginTop: 10
    },
    overflowTag: {
        position: 'absolute',
        right: 10,
        top: responsiveHeight(2),
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
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 20
    },
    modalsectionHeader: {
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2.2),
        color: '#147999',
    },
    modalBody: {
        padding: 20
    },
    quantityBody: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    quantitySection: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    quantitySectionmodal2: {
        flexDirection: 'row',
        alignItems: 'center'
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
    dayname: {
        color: '#595959',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold'
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
    buttonwrapper: {
        alignSelf: 'center'
    },
    blurabsolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }

});