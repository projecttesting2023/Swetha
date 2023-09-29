import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: [],
    status: 'idle'
};
const offerSlice = createSlice({
    name: 'offer',
    initialState,
    reducers: {
        // fetchProducts(state, action) {
        //     state.data = action.payload
        // }   
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOffer.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getOffer.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'success'
            })
            .addCase(getOffer.rejected, (state, action) => {
                state.status = 'error'
            })
    }
})

export const { fetchOffer } = offerSlice.actions;
export default offerSlice.reducer;

export const getOffer = createAsyncThunk('offer/get', async () => {
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