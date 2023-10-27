import React, { useContext, useState, useMemo, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, TextInput, ScrollView } from 'react-native';
import axios from "axios";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from 'react-redux';
import { getProfileDetails } from '../store/profile/profileDetailsSlice';
import Loader from '../utils/Loader';
import { submitProfileDetails } from '../store/profile/profieDetailsSubmitSlice';
import { AuthContext } from '../context/AuthContext';
import Toast from 'react-native-toast-message';

const PersonalDetailsScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { data: profileDetails, fetchstatus } = useSelector(state => state.profileDetails)
    const { data: submitprofileDetails, status } = useSelector(state => state.profileDetailsSubmit)
    const { userInfo } = useContext(AuthContext);

    const [mobileNo, setMobileNo] = React.useState('');
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
            labelStyle:{
                color:'#808080'
            },
            value: 'female',
            borderColor: '#147999',
            color: '#147999'
        },
        {
            id: '2',
            label: 'Male',
            labelStyle:{
                color:'#808080'
            },
            value: 'male',
            borderColor: '#147999',
            color: '#147999'
        }
    ]), []);

    const fetchProfileDetails = () => {
        AsyncStorage.getItem('userToken', (err, usertoken) => {
            axios.get(`http://162.215.253.89/PCP2023/public/api/user/getUser`, {
                headers: {
                    "Authorization": 'Bearer ' + usertoken,
                    "Content-Type": 'application/json'
                },
            })
                .then(res => {
                    console.log(res.data.user, 'user details')
                    let userInfo = res.data.user;
                    setProfileData(userInfo)
                    setMobileNo(userInfo.phn)
                    setName(userInfo.name)
                    setEmail(userInfo.email)
                    setDate(userInfo.dob)
                    if(userInfo.gen == 'male'){
                        setSelectedId('2')
                    }else{
                        setSelectedId('1')
                    }
                    setIsLoading(false);
                })
                .catch(e => {
                    console.log(`Profile error ${e}`)
                });
        });
    }

    useEffect(() => {
        fetchProfileDetails()
    }, [])

    // useEffect(() => {
    //     console.log(fetchstatus, 'Profile details')
    //     if (fetchstatus == 'success') {
    //         console.log(profileDetails,'profile data')
    //         setProfileData(profileDetails)
    //         setIsLoading(false)
    //     } else if (fetchstatus == 'loading') {
    //         setIsLoading(true)
    //     }
    // }, [fetchstatus])

    // useEffect(() => {
    //     console.log(status, 'Verifystatus')
    //     if (status == 'success') {
    //         //console.log(profileDetails, 'data from register api')
    //         setIsLoading(false)
    //         fetchProfileDetails();
    //     } else if (status == 'loading') {
    //         setIsLoading(true)
    //     } else if (status == 'error') {
    //         setIsLoading(false)
    //         alert('Something went wrong')
    //     }

    // }, [status])

    if (isLoading) {
        return (
            <Loader />
        )
    }

    submitForm = () => {
        AsyncStorage.getItem('userToken', (err, usertoken) => {
            console.log(date)
            console.log(name)
            console.log(email)
            console.log(selectedId)
            var gender = ''
            if (selectedId == 1) {
                var gender = 'female'
            } else {
                var gender = 'male'
            }
            const option = {
                "dob": date,
                "gen": gender,
                "name": name,
                "email": email,
            }
            axios.put(`http://162.215.253.89/PCP2023/public/api/user/updateUser`,
                option,
                {
                    headers: {
                        "Authorization": 'Bearer ' + usertoken,
                        "Content-Type": 'application/json'
                    },
                })
                .then(res => {
                    console.log(res.data)
                    Toast.show({
                        type: 'success',
                        text1: 'Hello',
                        text2: res.data.message,
                        position: 'top',
                        topOffset: Platform.OS == 'ios' ? 55 : 20
                    });
                    fetchProfileDetails();
                    setIsLoading(false);
                })
                .catch(e => {
                    console.log(`Profile error ${e}`)
                });
        });
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
                        {/* <Text style={styles.TextInputHeader}>Date of birth</Text>
                        <View style={styles.rechargeContainer}>
                            <View>
                                <Text style={styles.text1}>{date}</Text>
                            </View>
                            {open == true ?
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
                                        //setDate(moment(selectedDate).format("DD-MM-YYYY"))

                                    }}
                                /> : null}
                            <TouchableOpacity onPress={() => setOpen(true)}>
                                <MaterialIcons name="calendar-month" size={22} color="#147999" />
                            </TouchableOpacity>
                        </View> */}
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
