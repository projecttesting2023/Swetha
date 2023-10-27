import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: [],
    status: 'idle'
};
const holidaySlice = createSlice({
    name: 'holiday',
    initialState,
    reducers: {
        // fetchProducts(state, action) {
        //     state.data = action.payload
        // }   
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHoliday.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getHoliday.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'success'
            })
            .addCase(getHoliday.rejected, (state, action) => {
                state.status = 'error'
            })
    }
})

export const { fetchProducts } = holidaySlice.actions;
export default holidaySlice.reducer;

export const getHoliday = createAsyncThunk('holiday/get', async (usertoken) => {
    const res = await axios.get('http://162.215.253.89/PCP2023/public/api/user/holidaydetails',{
        headers: {
            "Authorization": 'Bearer ' + usertoken,
            "Content-Type": 'application/json'
        }});
    const result = await res.data.holidays;
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