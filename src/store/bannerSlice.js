import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: [],
    bannerstatus: 'idle'
};
const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {
        // fetchProducts(state, action) {
        //     state.data = action.payload
        // }   
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBanner.pending, (state, action) => {
                state.bannerstatus = 'loading'
            })
            .addCase(getBanner.fulfilled, (state, action) => {
                state.data = action.payload;
                state.bannerstatus = 'success'
            })
            .addCase(getBanner.rejected, (state, action) => {
                state.bannerstatus = 'error'
            })
    }
})

export const { fetchBanner } = bannerSlice.actions;
export default bannerSlice.reducer;

export const getBanner = createAsyncThunk('category/get', async (usertoken) => {
    console.log(usertoken,'user token from banner slice')
    const res = await axios.get('http://162.215.253.89/PCP2023/public/api/user/banner',{
                headers: {
                    "Authorization": 'Bearer ' + usertoken,
                    "Content-Type": 'application/json'
                },
            });
    const result = await res.data.banner;
    console.log(result,'vvvvv')
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