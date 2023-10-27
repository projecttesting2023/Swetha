import {configureStore} from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import productSlice from './productSlice';
import categorySlice from './categorySlice';
import holidaySlice from './holidaySlice';
import pastOrderHistorySlice from './orderHistory/pastOrderHistorySlice';
import upcomingOrderHistorySlice from './orderHistory/upcomingOrderHistorySlice';
import myDeliveriesSlice from './delivery/myDeliveriesSlice';
import searchByDateSlice from './delivery/searchByDateSlice';
import offerSlice from './offerSlice';
import profileDetailsSlice from './profile/profileDetailsSlice';
import phoneVerifySlice from './auth/phoneVerifySlice';
import otpVerifySlice from './auth/otpVerifySlice';
import profieDetailsSubmitSlice from './profile/profieDetailsSubmitSlice';
import bannerSlice from './bannerSlice';

const store = configureStore({
    reducer:{
        cart: cartSlice,
        products: productSlice,
        category: categorySlice,
        banner: bannerSlice,
        holiday: holidaySlice,
        pastOrderHistory: pastOrderHistorySlice,
        upcomingOrderHistory: upcomingOrderHistorySlice,
        myDeliveries: myDeliveriesSlice,
        searchByDate: searchByDateSlice,
        offer: offerSlice,
        profileDetails: profileDetailsSlice,
        profileDetailsSubmit: profieDetailsSubmitSlice,
        phoneVerify: phoneVerifySlice,
        otpVerify: otpVerifySlice

    }
})

export default store;