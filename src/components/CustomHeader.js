import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { logo, menu, userPhoto } from '../utils/Images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Logo from '../assets/images/misc/logo.svg';
import { useNavigation } from '@react-navigation/native';


export default function CustomHeader({
    onPress,
    commingFrom,
    title,
    onPressProfile,
    onHistoryPress
}) {
    const { userInfo } = useContext(AuthContext)
    const navigation = useNavigation();
    return (
        <>
            {commingFrom == 'Home' ?
                <>
                    <View style={styles.headerView}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.firstSection}>
                                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                                    <Image
                                        source={menu}
                                        style={styles.headerImage}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Logo
                                    width={100}
                                    height={30}
                                //style={{transform: [{rotate: '-15deg'}]}}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={onPress} style={styles.rightIcon}>
                                <Ionicons name="notifications-outline" size={28} color="#000" />
                                <View style={styles.notificationdotView}>
                                    <Text style={styles.notificationdot}>{'\u2B24'}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('My Deliveries')}>
                                <MaterialIcons name="truck-delivery-outline" size={28} color="#000" />
                                {/* <View style={styles.notificationdotView}>
                                    <Text style={styles.notificationdot}>{'\u2B24'}</Text>
                                </View> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.headerBottomMargin} />
                </>
                : commingFrom == 'wallet' ?
                    <>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 20 }}>
                            <View style={styles.innerPageheaderView}>

                                <TouchableOpacity onPress={onPress}>
                                    <Ionicons name="arrow-back" size={25} color="#000" />
                                </TouchableOpacity>
                                <Text style={styles.innerPageheaderTitle}>{title}</Text>
                            </View>
                            <TouchableOpacity onPress={onHistoryPress}>
                                <MaterialIcons name="history" size={25} color="#1697C0" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerBottomMargin} />
                    </>
                    :
                    <>
                        <View style={styles.innerPageheaderView}>
                            <TouchableOpacity onPress={onPress}>
                                <Ionicons name="arrow-back" size={25} color="#000" />
                            </TouchableOpacity>
                            <Text style={styles.innerPageheaderTitle}>{title}</Text>
                        </View>
                        <View style={styles.headerBottomMargin} />
                    </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    innerPageheaderView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    chatPageheaderView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#4B47FF'
    },
    innerPageheaderTitle: {
        color: '#2F2F2F',
        fontSize: responsiveFontSize(2.2),
        fontFamily: 'Poppins-Regular',
        fontWeight: '500',
        marginLeft: 10
    },
    chatPageheaderTitle: {
        color: '#FFF',
        fontSize: responsiveFontSize(2.2),
        fontFamily: 'Poppins-Regular',
        marginLeft: 10
    },
    firstSection: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    logoImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    firstText: {
        fontSize: responsiveFontSize(2),
        fontFamily: 'Poppins-Regular',
        marginLeft: 10,
        color: '#2F2F2F'
    },
    secondText: {
        fontSize: responsiveFontSize(1.5),
        fontFamily: 'Poppins-Regular',
        marginLeft: 10,
        color: '#808080'
    },
    notificationdotView: {
        position: 'absolute',
        top: 0,
        right: 1
    },
    notificationdot: {
        color: '#EB0000',
        fontSize: responsiveFontSize(1)
    },
    headerBottomMargin: {
        borderBottomColor: '#808080',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    imageStyle: {
        height: 40,
        width: 40,
        borderRadius: 40 / 2,
        marginLeft: 5
    },
    rightIcon: {
        marginRight: 10
    }
})