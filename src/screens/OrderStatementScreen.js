import React, { useState, useMemo } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity, KeyboardAwareScrollView } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import CustomHeader from '../components/CustomHeader'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { TextInput, LongPressGestureHandler, State } from 'react-native-gesture-handler'
import { deleteImg, editImg, phoneImg, searchImg, userPhoto } from '../utils/Images'
import CustomButton from '../components/CustomButton'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';


const OrderStatementScreen = ({ navigation }) => {
    const [startDay, setStartDay] = useState(null);
    const [endDay, setEndDay] = useState(null);
    const [markedDates, setMarkedDates] = useState({});

    const handleDayPress = (day) => {
        if (startDay && !endDay) {
            const date = {}
            for (const d = moment(startDay); d.isSameOrBefore(day.dateString); d.add(1, 'days')) {
                //console.log(d,'vvvvvvvvvv')
                date[d.format('YYYY-MM-DD')] = {
                    marked: true,
                    color: 'black',
                    textColor: 'white'
                };

                if (d.format('YYYY-MM-DD') === startDay){
                    date[d.format('YYYY-MM-DD')].startingDay = true;
                } 
                if (d.format('YYYY-MM-DD') === day.dateString){
                    date[d.format('YYYY-MM-DD')].endingDay = true;
                } 
            }

            setMarkedDates(date);
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

    const callfunc = () => {
        console.log(startDay,'startDay')
            console.log(endDay, 'endDay')
    }

    return (
        <SafeAreaView style={styles.Container}>
            <CustomHeader commingFrom={'Profile'} onPress={() => navigation.goBack()} title={'Order Statement'} />
            <ScrollView style={styles.wrapper}>
                <View style={{ marginBottom: responsiveHeight(3) }}>
                    <Text style={{ color: '#444', fontFamily: 'Poppins-Regular', fontSize: responsiveFontSize(2) }}>Please select your statement period</Text>
                    <Calendar
                        onDayPress={(day) => {
                            handleDayPress(day)
                        }}
                        //monthFormat={"yyyy MMM"}
                        //hideDayNames={false}
                        markingType={'period'}
                        markedDates={markedDates}
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
                            height: responsiveHeight(50),
                            marginTop: 20,
                            marginBottom:10
                        }}
                    />
                    <View style={styles.buttonwrapper}>
                        <CustomButton label={"Share"} buttonIcon={false} onPress={()=>callfunc()} />
                    </View>
                    <View style={styles.buttonwrapper}>
                        <CustomButton label={"Download"} buttonIcon={false} onPress={null} />
                    </View>
                    <View style={styles.buttonwrapper}>
                        <CustomButton label={"Email"} buttonIcon={false} onPress={null} />
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default OrderStatementScreen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    wrapper: {
        padding: responsiveWidth(5),
        marginBottom: responsiveHeight(1)
    },
    buttonwrapper: {
        alignSelf: 'center',
        marginVertical: 10
    },

});
