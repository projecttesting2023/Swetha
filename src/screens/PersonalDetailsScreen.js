import React, { useContext, useState, useMemo,useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, TextInput, ScrollView } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Logo from '../assets/images/misc/logo.svg';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RadioGroup from 'react-native-radio-buttons-group';
import RNDateTimePicker from '@react-native-community/datetimepicker'
import CustomHeader from '../components/CustomHeader';
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux';
import { getProfileDetails } from '../store/profile/profileDetailsSlice';
import Loader from '../utils/Loader';
import { submitProfileDetails } from '../store/profile/profieDetailsSubmitSlice';



const PersonalDetailsScreen = ({ navigation,route }) => {
    const dispatch = useDispatch();
    const { data: profileDetails, status } = useSelector(state => state.profileDetails)

    const [mobileNo, setMobileNo] = React.useState('8900987876');
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [selectedId, setSelectedId] = useState('1');
    const [date, setDate] = useState('')
    const [open, setOpen] = useState(false)
    const MIN_DATE = new Date(1930, 0, 1)
    const MAX_DATE = new Date()
    const [selectedDate, setSelectedDate] = useState(MAX_DATE)
    const [profileData, setProfileData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Female',
            value: 'female',
            borderColor: '#147999',
            color: '#147999'
        },
        {
            id: '2',
            label: 'Male',
            value: 'male',
            borderColor: '#147999',
            color: '#147999'
        }
    ]), []);

    const fetchProfileDetails = () => {
        dispatch(getProfileDetails())
        
    }

    useEffect(() => {
        fetchProfileDetails();
    }, [])

    useEffect(() => {
         console.log(status, 'Profile details')
        if (status == 'success') {
            setProfileData(profileDetails)
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

    submitForm = () => {
        console.log(selectedDate)
        // dispatch(submitProfileDetails({
        //     name: name,
        //     email: email,
        //     dob:selectedDate
        // }))
    }

    return (
        <SafeAreaView style={styles.Container}>
            <CustomHeader commingFrom={'Personal Details'} onPress={() => navigation.goBack()} title={'Personal Details'} />
            <ScrollView style={{ paddingHorizontal: 20, marginBottom: responsiveHeight(3), marginTop: responsiveHeight(3) }}>
                <View style={{ paddingBottom: responsiveHeight(5) }}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.TextInputHeader}>Mobile Number</Text>
                        <InputField
                            label={'Mobile Number'}
                            keyboardType="default"
                            value={mobileNo}
                            inputType={'nonedit'}
                            onChangeText={(text) => setMobileNo(text)}
                        />
                        <Text style={styles.TextInputHeader}>Full Name</Text>
                        <InputField
                            label={'Enter your full name'}
                            keyboardType="default"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                        <Text style={styles.TextInputHeader}>E-Mail (Optional)</Text>
                        <InputField
                            label={'Enter your email address'}
                            keyboardType="default"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <Text style={styles.TextInputHeader}>Date of birth</Text>
                        <View style={styles.rechargeContainer}>
                            <View>
                                <Text style={styles.text1}>{date}</Text>
                            </View>
                            {open == true?
                            <RNDateTimePicker
                                    mode="date"
                                    display='spinner'
                                    value={selectedDate}
                                    textColor={'#000'}
                                    minimumDate={MIN_DATE}
                                   // maximumDate={MAX_DATE}
                                    themeVariant="light"
                                    onChange={(event, selectedDate) => {
                                        //console.log(moment(selectedDate).format("DD-MM-YYYY"))
                                        setOpen(false)
                                        setSelectedDate(moment(selectedDate).format("DD-MM-YYYY"))
                                        setDate(moment(selectedDate).format("DD-MM-YYYY"))
                                        
                                    }}
                                />:null}
                            <TouchableOpacity onPress={() => setOpen(true)}>
                                <MaterialIcons name="calendar-month" size={22} color="#147999" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.TextInputHeader}>Gender</Text>
                        <View style={{ marginBottom: responsiveHeight(2) }}>
                            <RadioGroup
                                radioButtons={radioButtons}
                                onPress={setSelectedId}
                                selectedId={selectedId}
                                layout='row'
                                borderColor='red'
                            />
                        </View>
                    </KeyboardAwareScrollView>

                </View>
            </ScrollView>
            <View style={styles.buttonwrapper}>
                <CustomButton label={"Save"}
                    onPress={() => { submitForm() }}
                />
            </View>
        </SafeAreaView>
    );
};

export default PersonalDetailsScreen;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        color: '#444',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(3),
        fontWeight: '500',
        marginLeft: 10
    },
    TextInputHeader: {
        color: '#444',
        fontFamily: "Poppins-Regular",
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        marginBottom: responsiveHeight(2)
    },
    dropdown: {
        height: responsiveHeight(7),
        width: responsiveWidth(89),
        borderColor: '#147999',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: responsiveHeight(3),
        backgroundColor: '#FFF'
    },
    placeholderStyle: {
        fontSize: responsiveFontSize(2),
        color: '#797979'
    },
    selectedTextStyle: {
        fontSize: responsiveFontSize(2),
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    buttonwrapper: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 10,
    },
    rechargeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: responsiveHeight(7),
        width: responsiveWidth(89),
        borderColor: '#147999',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10
    },

});
