import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiPost } from "../services/client";

const initialState = {
    isloading: '',
    iserror: ''
}

export const loginApi = createAsyncThunk('Auth/loginApi', async (data) => {
    const response = await apiPost('/auth/login', data)
    return response.data;
});

export const verifyotpApi = createAsyncThunk('Auth/verifyotpApi', async (data) => {
    const response = await apiPost('/auth/verify-otp', data)
    return response.data;
});

export const ResendOtpApi = createAsyncThunk('Auth/ResendOtpApi', async (data) => {
    const response = await apiPost('/auth/resend-otp', data)
    return response.data;
});


const Auth = createSlice({
    name: 'Auth',
    initialState,
    reducers: {},
    extraReducers: (Builder) => {
        Builder.addCase(loginApi.pending, (state, action) => {
            state.isloading = true
        })
        Builder.addCase(loginApi.fulfilled, (state, action) => {
            state.isloading = false;
        });
        Builder.addCase(verifyotpApi.pending, (state, action) => {
            state.isloading = true
        })
        Builder.addCase(verifyotpApi.fulfilled, (state, action) => {
            state.isloading = false;
            // state.user = action.payload;
        });
        Builder.addCase(ResendOtpApi.pending, (state, action) => {
            state.isloading = true
        })
        Builder.addCase(ResendOtpApi.fulfilled, (state, action) => {
            state.isloading = false;
        });
    }
})

export default Auth.reducer;