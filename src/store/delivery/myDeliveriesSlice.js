import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: [],
    status: 'idle'
};
const myDeliveriesSlice = createSlice({
    name: 'myDeliveries',
    initialState,
    reducers: {
        // fetchProducts(state, action) {
        //     state.data = action.payload
        // }   
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyDeliveries.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getMyDeliveries.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'success'
            })
            .addCase(getMyDeliveries.rejected, (state, action) => {
                state.status = 'error'
            })
    }
})

export const { fetchMyDeliveries } = myDeliveriesSlice.actions;
export default myDeliveriesSlice.reducer;

export const getMyDeliveries = createAsyncThunk('myDeliveries/get', async (usertoken) => {
    const res = await axios.get('http://162.215.253.89/PCP2023/public/api/user/orderview', {
        headers: {
            "Authorization": 'Bearer ' + usertoken,
            "Content-Type": 'application/json'
        },
    });
    const result = await res.data.NonCompleted_orders;
    return result;

})

// export function getProducts() {
//     return async function getProductsThunk(dispatch, getState) {
//         await axios.get('https://fakestoreapi.com/products')
//             .then(res => {
//                 dispatch(fetchProducts(res.data))
//             })
//             .catch(e => {
//                 console.log(`Login error ${e}`)
//             });
//     }
// }