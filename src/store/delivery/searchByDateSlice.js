import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: [],
    status: 'idle'
};
const searchByDateSlice = createSlice({
    name: 'searchByDate',
    initialState,
    reducers: {
        // fetchProducts(state, action) {
        //     state.data = action.payload
        // }   
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSearchDeliveries.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getSearchDeliveries.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'idle'
            })
            .addCase(getSearchDeliveries.rejected, (state, action) => {
                state.status = 'error'
            })
    }
})

export const { fetchSearchDeliveries } = searchByDateSlice.actions;
export default searchByDateSlice.reducer;

export const getSearchDeliveries = createAsyncThunk('searchByDate/get', async (id) => {
    const res = await axios.get(`https://fakestoreapi.com/carts/${id}`);
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