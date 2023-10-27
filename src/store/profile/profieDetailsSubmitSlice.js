import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: [],
    status: 'idle'
};

export const submitProfileDetails = createAsyncThunk('profileDetailsSubmit/put', async (options) => {
    const data = {
        "hoseno": options.hoseno,
        "hoseno_name": options.hoseno_name,
        "floorno": options.floorno,
        "street": options.street,
        "landmark": options.landmark,
        "city": options.city,
        "pin": options.pin,
        "area": options.area,
        "residency_type": options.residency_type,
        "name": options.name,
        "email": options.email,
        "address": options.address
    }
    try {
        const res = await axios.put(
            'http://162.215.253.89/PCP2023/public/api/user/updateUser',
            data,
            {
                headers: {
                    "Authorization": 'Bearer ' + options.usertoken,
                    "Content-Type": 'application/json'
                },
            }
        );
        const result = await res.data;
        return result;
    } catch (error) {
        throw error;
    }
})

const profileDetailsSubmitSlice = createSlice({
    name: 'profileDetailsSubmit',
    initialState,
    reducers: {
        // fetchProducts(state, action) {
        //     state.data = action.payload
        // }   
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitProfileDetails.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(submitProfileDetails.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'success'
            })
            .addCase(submitProfileDetails.rejected, (state, action) => {
                state.status = 'error'
            })
    }
})

export const { ProfileDetails } = profileDetailsSubmitSlice.actions;
export default profileDetailsSubmitSlice.reducer;
