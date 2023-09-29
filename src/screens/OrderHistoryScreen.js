import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, StatusBar, Image, TouchableOpacity, Animated, KeyboardAwareScrollView, useWindowDimensions } from 'react-native'
import CustomHeader from '../components/CustomHeader'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { milkImg, } from '../utils/Images'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import { getPastOrderHistory } from '../store/orderHistory/pastOrderHistorySlice';
import Loader from '../utils/Loader';
import { getUpcomingOrderHistory } from '../store/orderHistory/upcomingOrderHistorySlice';
import { useFocusEffect } from '@react-navigation/native';

const PastOrder = ({ navigation }) => {
    const dispatch = useDispatch();
    const { data: pastOrder, status } = useSelector(state => state.pastOrderHistory)
    const [pastOrderHistory, setPastOrderHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const fetchPastOrder = () => {
        dispatch(getPastOrderHistory())
    }

    useEffect(() => {
        fetchPastOrder();
    }, [])

    useEffect(() => {
        console.log(status,'past order status')
        if (status == 'success') {
            setPastOrderHistory(pastOrder)
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

    return (
        <View style={{ marginBottom: responsiveHeight(2) }}>
            <FlatList
                data={pastOrderHistory}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.pastOrderContainer} >
                            <View style={styles.pastOrderView}>
                                <Image source={milkImg} style={styles.productimage} />
                                <View style={styles.productdesc}>
                                    <Text style={styles.productName}>Salted Cow Butter</Text>
                                    <Text style={styles.productQuantity}>
                                        100 GMS BOX
                                        <Text style={styles.productQuantityno}>   X 2</Text>
                                    </Text>
                                    <Text style={styles.amount}>₹200.00</Text>
                                    <View style={styles.buttonContainer}>
                                        <View style={styles.buttonView}>
                                            <Text style={{ color: '#595959' }}>Delivered</Text>
                                        </View>
                                        {/* <View style={styles.buttonView2}>
                                        <Text style={{ color: '#FFF' }}>Repeat</Text>
                                    </View> */}
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                }}
                keyExtractor={(item, index) => index}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                initialNumToRender={5}
                numColumns={1}
            />
        </View>
    )
};

const UpcomingOrder = ({ navigation }) => {
    const dispatch = useDispatch();
    const { data: upcomingOrder, status } = useSelector(state => state.upcomingOrderHistory)
    const [upcomingOrderHistory, setUpcomingOrderHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const fetchUpcomingOrder = () => {
        dispatch(getUpcomingOrderHistory())
    }

    useEffect(() => {
        fetchUpcomingOrder();
    }, [dispatch])

    useEffect(() => {
        // console.log(status, 'upcoming status')
        if (status == 'success') {
            setUpcomingOrderHistory(upcomingOrder)
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
    return (
        <View style={{ marginBottom: responsiveHeight(2) }}>
            <FlatList
                data={upcomingOrderHistory}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.pastOrderContainer} >
                            <View style={styles.pastOrderView}>
                                <Image source={milkImg} style={styles.productimage} />
                                <View style={styles.productdesc}>
                                    <Text style={styles.productName}>Salted Cow Butter</Text>
                                    <Text style={styles.productQuantity}>
                                        100 GMS BOX
                                        <Text style={styles.productQuantityno}>   X 2</Text>
                                    </Text>
                                    <Text style={styles.amount}>₹200.00</Text>
                                    <View style={styles.buttonContainer}>
                                        <View style={styles.buttonView}>
                                            <Text style={{ color: '#595959' }}>Delivered by 29-12-2023</Text>
                                        </View>
                                        {/* <View style={styles.buttonView2}>
                                    <Text style={{ color: '#FFF' }}>Repeat</Text>
                                </View> */}
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                }}
                keyExtractor={(item, index) => index}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                initialNumToRender={5}
                numColumns={1}
            />
        </View>
    )
};

const renderScene = SceneMap({
    first: PastOrder,
    second: UpcomingOrder,
});




const OrderHistoryScreen = ({ navigation }) => {

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Past Orders' },
        { key: 'second', title: 'Upcoming Orders' },
    ]);

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#147999', marginHorizontal: 40, width: 105 }}
            style={{ backgroundColor: '#E6F6FB', marginHorizontal: 10, marginVertical: 10, borderRadius: 10 }}
            labelStyle={{ textTransform: 'capitalize' }}
            activeColor='#147999'
            inactiveColor='#444'
        />
    );

    return (
        <SafeAreaView style={styles.Container}>
            <CustomHeader commingFrom={'Profile'} onPress={() => navigation.goBack()} title={'Order History'} />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </SafeAreaView>
    )
}

export default OrderHistoryScreen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    wrapper: {
        padding: responsiveWidth(5),
        marginBottom: responsiveHeight(1)
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: responsiveHeight(1),
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    pastOrderContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        marginTop: 10
    },
    pastOrderView: {
        height: responsiveHeight(17),
        width: responsiveWidth(90),
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.10)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        borderColor: '#147999',
        borderWidth: 1
    },
    productimage: {
        height: responsiveHeight(10),
        width: responsiveWidth(30),
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    productdesc: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: responsiveWidth(59),
        paddingHorizontal: 10
    },
    productName: {
        color: '#444',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
        marginBottom: 5
    },
    productQuantity: {
        color: '#797979',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(1.8),
        fontWeight: '600',
        marginBottom: 5
    },
    productQuantityno: {
        color: '#147999',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(1.8),
        fontWeight: '600',
    },
    amount: {
        color: '#147999',
        fontFamily: 'Poppins-Regular',
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
        marginBottom: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonView: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: '#147999',
        borderWidth: 1,
        borderRadius: 20
    },
    buttonView2: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#147999',
        borderColor: '#147999',
        borderWidth: 1,
        borderRadius: 20
    }

});
