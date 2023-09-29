import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: [],
    status: 'idle'
};
const pastOrderHistorySlice = createSlice({
    name: 'pastOrderHistory',
    initialState,
    reducers: {
        // fetchProducts(state, action) {
        //     state.data = action.payload
        // }   
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPastOrderHistory.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getPastOrderHistory.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'success'
            })
            .addCase(getPastOrderHistory.rejected, (state, action) => {
                state.status = 'error'
            })
    }
})

export const { fetchPastOrderHistory } = pastOrderHistorySlice.actions;
export default pastOrderHistorySlice.reducer;

export const getPastOrderHistory = createAsyncThunk('pastOrderHistory/get', async () => {
    const res = await axios.get('https://fakestoreapi.com/products');
    const result = await res.data;
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