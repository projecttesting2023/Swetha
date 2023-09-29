import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: [],
    status: 'idle'
};

export const getProfileDetails = createAsyncThunk('profileDetails/get', async () => {
    const res = await axios.get('https://randomuser.me/api/');
    const result = await res.data;
    return result;

})

const profileDetailsSlice = createSlice({
    name: 'profileDetails',
    initialState,
    reducers: {
        // fetchProducts(state, action) {
        //     state.data = action.payload
        // }   
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfileDetails.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getProfileDetails.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'success'
            })
            .addCase(getProfileDetails.rejected, (state, action) => {
                state.status = 'error'
            })
    }
})

export const { fetchProfileDetails } = profileDetailsSlice.actions;
export default profileDetailsSlice.reducer;



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