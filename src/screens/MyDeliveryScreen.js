import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, ImageBackground, Image, TouchableOpacity, KeyboardAwareScrollView, Modal } from 'react-native'
import CustomHeader from '../components/CustomHeader'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { milkImg } from '../utils/Images'
import CustomButton from '../components/CustomButton'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { getMyDeliveries } from '../store/delivery/myDeliveriesSlice';
import {getSearchDeliveries} from '../store/delivery/searchByDateSlice';
import Loader from '../utils/Loader';


const MyDeliveryScreen = ({ navigation }) => { 
    const dispatch = useDispatch();
    const { data: myDeliveries, status } = useSelector(state => state.myDeliveries)
    const { data: searchDelivery, searchstatus } = useSelector(state => state.searchByDate)

    const [selected, setSelected] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [myDeliveriesData, setMyDeliveriesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const fetchMyDelivery = () => {
        dispatch(getMyDeliveries())
    }
    useEffect(() => {
        fetchMyDelivery();
    }, []) 

    useEffect(() => {
        //console.log(status, 'my delivery status')
       if (status == 'success') {
        setMyDeliveriesData(myDeliveries)
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

    const renderMyDeliveries = ({ item, index }) => {

        return (
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
        )
    }
   
    const searchByDate = async() => {
        console.log(selected);
        await dispatch(getSearchDeliveries(5))
        console.log(searchDelivery,'searchDeliverysearchDelivery')
        setMyDeliveriesData([searchDelivery])
    }

    return (
        <SafeAreaView style={styles.Container}>
            <CustomHeader commingFrom={'Delivery'} onPress={() => navigation.goBack()} title={'My Deliveries'} />
            <View style={styles.wrapper}>
                <FlatList
                    data={myDeliveriesData}
                    renderItem={renderMyDeliveries}
                    keyExtractor={(item, index) => index}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    initialNumToRender={5}
                    numColumns={1}
                />
            </View>
            <View style={styles.buttonwrapper}>
                <CustomButton label={"Open Calender"} buttonIcon={true} onPress={() => setModalVisible(true)} />
            </View>

            {/*------------------ alternate day modal start-------------*/}
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
                        height: '75%',
                        marginTop: 'auto',
                        backgroundColor: '#fff',
                        borderColor: '#1697C0',
                        borderWidth: 1,
                        elevation: 20,
                    }}>
                    <View style={styles.modalBody}>

                        <View style={{ marginTop: responsiveHeight(3) }}>
                            <Calendar
                                onDayPress={day => {
                                    setSelected(day.dateString);
                                }}
                                markedDates={{
                                    [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                                }}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#E3EBF2',
                                    borderRadius: 15,
                                    height: responsiveHeight(50),
                                    marginTop: 20,
                                    marginBottom: 10
                                }}
                            />

                        </View>


                    </View>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <Entypo name="circle-with-cross" size={28} color="#1697C0" />
                    </TouchableOpacity>
                    <View style={styles.modalbuttonwrapper}>
                        <CustomButton label={"Search"} buttonIcon={false} onPress={() => searchByDate()} />
                    </View>
                </View>
            </Modal>
            {/*------------------ alternate day modal end-------------*/}



        </SafeAreaView>
    )
}

export default MyDeliveryScreen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    wrapper: {
        padding: responsiveWidth(5),
        marginBottom: responsiveHeight(15)
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
