import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity, KeyboardAwareScrollView, Modal, FlatList } from 'react-native'
import CustomHeader from '../components/CustomHeader'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import CustomButton from '../components/CustomButton'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import { getHoliday } from '../store/holidaySlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../utils/Loader';


const HolidaysScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { data: holiday, status } = useSelector(state => state.holiday)

    const [selected, setSelected] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [holidayData, setHolidayData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const fetchHoliday = () => {
        dispatch(getHoliday())
        
    }

    useEffect(() => {
        fetchHoliday();
    }, [])

    useEffect(() => {
         console.log(status, 'holiday status')
        if (status == 'success') {
            setHolidayData(holiday)
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

    const renderHoliday = ({ item, index }) => {
        return (
            <View style={styles.daylist}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '600', fontSize: responsiveFontSize(2), color: '#000' }}>Sep 30 2023</Text>
                <MaterialIcons name="delete-outline" size={25} color="#FF0000" />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.Container}>
            <CustomHeader commingFrom={'Holidays'} onPress={() => navigation.goBack()} title={'Holidays'} />
            <View style={styles.wrapper}>
                <FlatList
                    data={holidayData}
                    renderItem={renderHoliday}
                    keyExtractor={(item, index) => index}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    initialNumToRender={5}
                    numColumns={1}
                />
            </View>
            <View style={styles.buttonwrapper}>
                <CustomButton label={"Add Holidays"} buttonIcon={false} onPress={() => setModalVisible(true)} />
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
                        <CustomButton label={"Add"} buttonIcon={false} onPress={null} />
                    </View>
                </View>
            </Modal>
            {/*------------------ alternate day modal end-------------*/}



        </SafeAreaView>
    )
}

export default HolidaysScreen

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
        bottom: 15
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
    daylist: {
        height: responsiveHeight(8),
        width: responsiveWidth(90),
        marginVertical: 10,
        flexDirection: 'row',
        borderRadius: 10,
        borderColor: '#1697C0',
        borderWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    }

});
