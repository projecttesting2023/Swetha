import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: [],
    categorystatus: 'idle'
};
const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        // fetchProducts(state, action) {
        //     state.data = action.payload
        // }   
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategory.pending, (state, action) => {
                state.categorystatus = 'loading'
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.data = action.payload;
                state.categorystatus = 'success'
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.categorystatus = 'error'
            })
    }
})

export const { fetchCategory } = categorySlice.actions;
export default categorySlice.reducer;

export const getCategory = createAsyncThunk('category/get', async (usertoken) => {
    console.log(usertoken,'user token from category slice')
    const res = await axios.get('http://162.215.253.89/PCP2023/public/api/user/categories',{
                headers: {
                    "Authorization": 'Bearer ' + usertoken,
                    "Content-Type": 'application/json'
                },
            });
    const result = await res.data.categorie;
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