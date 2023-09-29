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

const store = configureStore({
    reducer:{
        cart: cartSlice,
        products: productSlice,
        category: categorySlice,
        holiday: holidaySlice,
        pastOrderHistory: pastOrderHistorySlice,
        upcomingOrderHistory: upcomingOrderHistorySlice,
        myDeliveries: myDeliveriesSlice,
        searchByDate: searchByDateSlice,
        offer: offerSlice,
        profileDetails: profileDetailsSlice,

    }
})

export default store;