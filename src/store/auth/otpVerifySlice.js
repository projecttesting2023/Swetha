import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: [],
    status: 'idle'
};

export const getOtpVerify = createAsyncThunk('otpVerify/post', async (options) => {
    const res = await axios.post('http://162.215.253.89/PCP2023/public/api/userlogin',options);
    const result = await res.data;
    return result;

})

const otpVerifySlice = createSlice({
    name: 'otpVerify',
    initialState,
    reducers: {
        // fetchProducts(state, action) {
        //     state.data = action.payload
        // }   
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOtpVerify.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getOtpVerify.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'success'
            })
            .addCase(getOtpVerify.rejected, (state, action) => {
                state.data = action.payload;
                state.status = 'error'
            })
    }
})

export const { fetchOtpVerify } = otpVerifySlice.actions;
export default otpVerifySlice.reducer;



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