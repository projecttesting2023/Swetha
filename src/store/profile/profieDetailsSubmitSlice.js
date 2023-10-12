import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: [],
    status: 'idle'
};

export const submitProfileDetails = createAsyncThunk('profileDetails/post', async (options) => {

    try {
        const res = await axios.post(
            'https://randomuser.me/api/',
            options
        );
        const result = await res.data;
        return result;
    } catch (error) {
        throw error;
    }
})

const profileDetailsSubmitSlice = createSlice({
    name: 'profileDetails',
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
