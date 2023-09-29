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

export const getCategory = createAsyncThunk('category/get', async () => {
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