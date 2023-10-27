import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: [],
    status: 'idle',
};

export const getPhoneVerify = createAsyncThunk('phoneVerify/post', async (options) => {
    const res = await axios.post('http://162.215.253.89/PCP2023/public/api/userregister',options);
    const result = await res.data;
    return result;

}) 

const phoneVerifySlice = createSlice({
    name: 'phoneVerify',
    initialState,
    reducers: {
        reset: () => initialState 
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPhoneVerify.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getPhoneVerify.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'success'
            })
            .addCase(getPhoneVerify.rejected, (state, action) => {
                state.data = action.payload;
                state.status = 'error'
            })
    }
})

export const { fetchPhoneVerify } = phoneVerifySlice.actions;
export default phoneVerifySlice.reducer;



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