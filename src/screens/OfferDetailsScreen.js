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
    Modal,
    Platform
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { AuthContext } from '../context/AuthContext';
import { getProducts } from '../store/productSlice'
import moment from "moment"
import axios from 'axios';
import { API_URL } from '@env'
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import Loader from '../utils/Loader';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CustomHeader from '../components/CustomHeader';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { BlurView } from '@react-native-community/blur';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';
const BannerWidth = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(BannerWidth * 0.7)
const { height, width } = Dimensions.get('screen')
import { useFocusEffect } from '@react-navigation/native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

export default function OfferDetailsScreen({ navigation, route }) {

    const dispatch = useDispatch();

    const { userInfo } = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false);


    const [startingDayQty, setStartingDayQty] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [productsData, setProductsData] = useState([])
    const [offerStartDate, setOfferStartDate] = useState('')
    const [offerEndDate, setOfferEndDate] = useState('')
    const [currentProductId, setCurrentProductId] = useState(0)

    const [startDay, setStartDay] = useState(null);
    const [endDay, setEndDay] = useState(null);
    const [markedDates, setMarkedDates] = useState({});
    const [activeDates, setActiveDates] = useState([]);


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
                    setOfferStartDate(res.data.product[0].offer_startdate)
                    setOfferEndDate(res.data.product[0].offer_enddate)
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



    const startingDayqtyIncrement = () => {
        setStartingDayQty(startingDayQty + 1)
    }

    const startingDayqtyDecrement = () => {
        if (startingDayQty > 1) {
            setStartingDayQty(startingDayQty - 1)
        }
    }
    const handleDayPress = (day) => {
        if (startDay && !endDay) {
            const date2 = {}
            for (const d = moment(startDay); d.isSameOrBefore(day.dateString); d.add(1, 'days')) {
                //console.log(d,'vvvvvvvvvv')
                date2[d.format('YYYY-MM-DD')] = {
                    marked: true,
                    color: 'black',
                    textColor: 'white'
                };

                if (d.format('YYYY-MM-DD') === startDay) {
                    date2[d.format('YYYY-MM-DD')].startingDay = true;
                }
                if (d.format('YYYY-MM-DD') === day.dateString) {
                    date2[d.format('YYYY-MM-DD')].endingDay = true;
                }
            }

            setMarkedDates(date2);
            setEndDay(day.dateString);
        }
        else {
            setStartDay(day.dateString)
            setEndDay(null)
            setMarkedDates({
                [day.dateString]: {
                    marked: true,
                    color: 'black',
                    textColor: 'white',
                    startingDay: true,
                    endingDay: true
                }
            })
        }

    }

    function getDatesBetween(startDate, endDate) {
        let dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    }

    const placedOrder = async () => {
        setIsLoading(true)
        if (startDay || endDay) {
            console.log(startDay)
            console.log(endDay)
            if (endDay) {
                const startDate = new Date(startDay);
                const endDate = new Date(endDay);
                const datesBetween = getDatesBetween(startDate, endDate);
                console.log(datesBetween);
                let obj = []
                for (let i = 0; i < datesBetween.length; i++) {
                    obj.push({
                        "product_id": currentProductId,
                        "quantity": startingDayQty,
                        "date": moment(datesBetween[i]).format("DD-MM-YYYY"),
                        "product_subscription": 0,
                        "product_days": "0"
                    })
                }
                console.log(obj, 'object')
                const option = {
                    "orders": obj
                }

                console.log(option, 'order plaayloaad')
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
                                setIsLoading(false)
                                Toast.show({
                                    type: 'success',
                                    text2: res.data.orders.message,
                                    position: 'top',
                                    topOffset: Platform.OS == 'ios' ? 55 : 20
                                });
                            } else if (res.data.st == '400') {
                                setIsLoading(false)
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

            } else {
                console.log('single date')
                const option = {
                    "orders": [
                        {
                            "product_id": currentProductId,
                            "quantity": startingDayQty,
                            "date": moment(startDay).format("DD-MM-YYYY"),
                            "product_subscription": 0,
                            "product_days": "0"
                        }
                    ]
                }
                console.log(option, 'order plaayloaad')
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
                                setIsLoading(false)
                                Toast.show({
                                    type: 'success',
                                    text2: res.data.orders.message,
                                    position: 'top',
                                    topOffset: Platform.OS == 'ios' ? 55 : 20
                                });
                            } else if (res.data.st == '400') {
                                setIsLoading(false)
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
        } else {
            setIsLoading(false)
            Toast.show({
                type: 'info',
                text2: "You have to choose one date",
                position: 'top',
                topOffset: Platform.OS == 'ios' ? 55 : 20
            });
        }

    }

    return (
        <SafeAreaView style={styles.Container}>
            <CustomHeader commingFrom={'product'} title={'Combo Details'} onPress={() => navigation.goBack()} onPressProfile={() => navigation.navigate('Profile')} />
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
                    <View style={styles.line} />
                    <Text style={styles.descriptionText}>Description</Text>
                    <Text style={styles.productText2}>{productsData[0].product_description.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
                    <Text style={styles.descriptionText}>Choose delivery date</Text>
                    <Calendar
                        onDayPress={(day) => {
                            handleDayPress(day)
                        }}
                        markingType={'period'}
                        markedDates={markedDates}
                        minDate={offerStartDate}
                        maxDate={offerEndDate}
                        theme={{
                            selectedDayBackgroundColor: '#646464',
                            selectedDayTextColor: 'white',
                            monthTextColor: '#1697C0',
                            dayTextColor: 'black',
                            textMonthFontSize: 18,
                            textDayHeaderFontSize: 16,
                            arrowColor: '#1697C0',
                            dotColor: 'black'
                        }}
                        style={{
                            borderWidth: 1,
                            borderColor: '#E3EBF2',
                            borderRadius: 15,
                            height: Platform.OS == 'android' ? responsiveHeight(50) : responsiveHeight(45),
                            marginTop: 20,
                            marginBottom: 10
                        }}
                        disabledDates={['2023-11-16', '2023-11-17']}
                    />
                    <View style={{ paddingVertical: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                            <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '700', fontSize: responsiveFontSize(2.5), color: '#444', }}>Offer Quantity</Text>
                            <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '700', fontSize: responsiveFontSize(2.5), color: '#444', }}>{startingDayQty}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                            <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '700', fontSize: responsiveFontSize(2.5), color: '#444', }}>Total Amount</Text>
                            <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '700', fontSize: responsiveFontSize(2.5), color: '#444', }}>{productsData[0].discount_ammount * startingDayQty}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonwrapper2}>
                        <CustomButton label={"Place Order"}
                            comingFrom={''}
                            onPress={() => placedOrder()}
                        />
                    </View>
                </View>
                <View style={styles.overflowTag}>
                    <Text style={styles.overflowText}>SWETHA</Text>
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