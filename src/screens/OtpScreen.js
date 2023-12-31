import React, { useState, useContext, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Platform,
    Alert,
    Keyboard
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { AuthContext } from '../context/AuthContext';
import Logo from '../assets/images/misc/logo.svg';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { getOtpVerify } from '../store/auth/otpVerifySlice';
import Loader from '../utils/Loader';
import axios from 'axios';
import { API_URL } from '@env'
import DeviceInfo from 'react-native-device-info';

const OtpScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { data: otpVerify, status: otpstatus } = useSelector(state => state.otpVerify)
    const [otp, setOtp] = useState('');
    const [errors, setError] = useState(true)
    const [errorText, setErrorText] = useState('Please enter OTP')
    const [isLoading, setIsLoading] = useState(false)
    const { login, userToken } = useContext(AuthContext);

    const inputRef = useRef();

    // useEffect(()=>{
    //     Keyboard.open()
    // },[])

    const onChangeCode = (code) => {
        setOtp(code)
        setError(false)
    }
    const goToNextPage = (code) => {
        // navigation.navigate('HouseDetails',{phoneno:route?.params?.phoneno})
        setOtp(code)
        const option = {
            "phone": route?.params?.phoneno,
            "otp": code
        }
        // if (errors == false) {
        //     dispatch(getOtpVerify(option))
        // }
        axios.post(`${API_URL}/public/api/userlogin`, option)
            .then(res => {
                console.log(res.data)
                if (res.data.st == '400') {
                    setIsLoading(false)
                    Alert.alert('Oops..', res.data.massage, [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                } else if (res.data.st == '200') {
                    console.log(res.data, 'data from otp Verify api')
                    setIsLoading(false)
                    if (route?.params?.page == 'login') {
                        login(res.data.token)
                    } else {
                        navigation.navigate('HouseDetails', { phoneno: route?.params?.phoneno, usertoken: res.data.token })
                    }
                }
            })
            .catch(e => {
                console.log(`user register error ${e}`)
            });
    }

    const resendOtp = () => {
        DeviceInfo.getUniqueId().then((deviceUniqueId) => {
            const option = {
                "phone": route?.params?.phoneno,
                "refcode": '',
                "flage": 'resendotp',
                "deviceid": deviceUniqueId
            }
            axios.post(`${API_URL}/public/api/userregister`, option)
                .then(res => {
                    console.log(res.data)
                    if (res.data.st == '400') {
                        setIsLoading(false)
                        Alert.alert('Oops..', res.data.massage, [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                    } else if (res.data.st == '200') {
                        console.log(res.data, 'data from phone Verify api')
                        setIsLoading(false)
                        Alert.alert('Okay', res.data.massage, [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                    }
                })
                .catch(e => {
                    console.log(`user register error ${e}`)
                });
        });

    }

    // useEffect(() => {
    //     console.log(otpstatus, 'otpVerifystatus')
    //     if (otpstatus == 'success') {
    //         console.log(otpVerify, 'data from otp Verify api')
    //         setIsLoading(false)
    //         if (route?.params?.page == 'login') {
    //             login(otpVerify.token)
    //         } else {
    //             navigation.navigate('HouseDetails', { phoneno: route?.params?.phoneno, usertoken: otpVerify.token })
    //         }

    //     } else if (otpstatus == 'loading') {
    //         setIsLoading(true)
    //     } else if (otpstatus == 'error') {
    //         setIsLoading(false)
    //         alert('Invalid OTP')
    //     }

    // }, [otpstatus])

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <LinearGradient colors={['#E0F8FF', 'rgba(255, 255, 255, 0.05)', 'rgba(217, 217, 217, 0.00)']} style={styles.container}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={25} color="#000" />
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.wrapper}>
                <View style={styles.logoView}>
                    <Logo
                        width={200}
                        height={200}
                    //style={{transform: [{rotate: '-15deg'}]}}
                    />
                </View>
                <Text style={styles.HeaderText}>Verify Account</Text>
                <Text style={styles.HeaderText2}>Enter the 4 digit pin send to
                    +91 {route.params.phoneno}</Text>
                <View style={styles.textinputview}>
                    <OTPInputView
                        ref={inputRef}
                        style={styles.otpTextView}
                        pinCount={4}
                        code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        onCodeChanged={code => { onChangeCode(code) }}
                        autoFocusOnLoad={Platform.OS == 'ios' ? true : false}
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={(code) => goToNextPage(code)}
                        keyboardType={'numeric'}
                        keyboardAppearance={'default'}
                    />
                    {errors &&
                        <Text style={{ fontSize: responsiveFontSize(1.5), color: 'red', marginBottom: 20, marginTop: -25, alignSelf: 'center' }}>{errorText}</Text>
                    }
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#808080', fontFamily: 'Poppins-Regular', fontSize: responsiveFontSize(2) }}>Didn’t received OTP?</Text>
                    <TouchableOpacity onPress={() => { resendOtp() }}>
                        <Text style={{ color: '#92D6EC', fontFamily: 'Poppins-SemiBold', fontSize: responsiveFontSize(2) }}>Resend OTP</Text>
                    </TouchableOpacity>
                </View>

            </View>
            {/* <View style={styles.buttonwrapper}>
                <CustomButton label={"Continue"}
                //onPress={() => { login(email, pass) }} 
                />
            </View> */}
        </LinearGradient>
    );
};

export default OtpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
    },
    wrapper: {
        paddingHorizontal: 25,
        height: responsiveHeight(80)
    },
    logoView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontFamily: 'Manrope-Bold',
        fontSize: responsiveFontSize(3),
        color: '#2F2F2F',
        marginBottom: responsiveHeight(3),
    },
    HeaderText: {
        color: '#444',
        fontFamily: "Poppins-Regular",
        fontSize: responsiveFontSize(2.5),
        fontWeight: '500',
        marginBottom: responsiveHeight(3),
        alignSelf: 'center'
    },
    HeaderText2: {
        color: '#444',
        fontFamily: "Poppins-Regular",
        fontSize: responsiveFontSize(2),
        fontWeight: '400',
        marginBottom: responsiveHeight(3),
        alignSelf: 'center'
    },
    subheader: {
        fontFamily: 'Manrope-Regular',
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        color: '#808080',
        marginBottom: responsiveHeight(0),
    },
    subheadernum: {
        fontFamily: 'Manrope-SemiBold',
        fontSize: responsiveFontSize(1.8),
        fontWeight: '400',
        color: '#2F2F2F',
        marginBottom: responsiveHeight(0),
    },
    textinputview: {
        marginBottom: responsiveHeight(0),
    },
    buttonwrapper: {
        paddingHorizontal: 25,
    },
    otpTextView: {
        width: '100%',
        height: 180,
        borderRadius: 10,
    },
    underlineStyleBase: {
        width: responsiveWidth(15),
        height: responsiveHeight(8),
        borderRadius: 8,
        color: '#2F2F2F',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2),
        backgroundColor: '#E6F6FB',
        borderWidth: 2,
        elevation: 5
    },

    underlineStyleHighLighted: {
        borderColor: "#92D6EC",
        borderRadius: 8,
        borderWidth: 2
    },
});



