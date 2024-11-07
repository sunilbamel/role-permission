import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet, apiPost } from "../services/client";

const initialState = {
    isloading: '',
    iserror: ''
}

export const getuserApi = createAsyncThunk('AdminUser/getuserApi', async () => {
    const response = await apiGet('/admin/get-user')
    return response.data;
});

export const getusersApi = createAsyncThunk('AdminUser/getusersApi', async () => {
    const response = await apiGet('/admin/users')
    return response.data;
});

export const createuserApi = createAsyncThunk('AdminUser/createuserApi', async (data) => {
    const response = await apiPost('/admin/create-user', data)
    return response.data;
});

export const updateuserApi = createAsyncThunk('AdminUser/updateuserApi', async (data) => {
    const response = await apiPost('/admin/update-user', data)
    return response.data;
});

export const getroleApi = createAsyncThunk('AdminUser/getroleApi', async () => {
    const response = await apiGet('/admin/role')
    return response.data;
});

export const createroleApi = createAsyncThunk('AdminUser/createroleApi', async (data) => {
    const response = await apiPost('/admin/create-role', data)
    return response.data;
});

export const updateroleApi = createAsyncThunk('AdminUser/updateroleApi', async (data) => {
    const response = await apiPost('/admin/update-role', data)
    return response.data;
});

export const getrolepermissionApi = createAsyncThunk('AdminUser/getrolepermissionApi', async (data) => {
    const response = await apiGet(`/admin/role-permission/?id=${data.id}`)
    return response.data;
});

export const getpermissionApi = createAsyncThunk('AdminUser/getpermissionApi', async () => {
    const response = await apiGet('/admin/permission')
    return response.data;
});

export const createpermissionApi = createAsyncThunk('AdminUser/createpermissionApi', async (data) => {
    const response = await apiPost('/admin/create-permission', data);
    return response.data;
});

export const updatepermissionApi = createAsyncThunk('AdminUser/updatepermissionApi', async (data) => {
    const response = await apiPost('/admin/update-permission', data);
    return response.data;
});

const AdminUser = createSlice({
    name: 'AdminUser',
    initialState,
    reducers: {},
    extraReducers: (Builder) => {
        Builder.addCase(getuserApi.pending, (state, action) => {
            state.isloading = true
        })
        Builder.addCase(getuserApi.fulfilled, (state, action) => {
            state.isloading = false;
            state.user = action.payload.data?.user;
            state.route = action.payload.data?.route
        });
        Builder.addCase(updateuserApi.pending, (state, action) => {
            state.isloading = true
        })
        Builder.addCase(updateuserApi.fulfilled, (state, action) => {
            state.isloading = false;
        });
        Builder.addCase(getroleApi.pending, (state, action) => {
            state.isloading = true
        })
        Builder.addCase(getroleApi.fulfilled, (state, action) => {
            state.isloading = false;
        });
        Builder.addCase(updateroleApi.pending, (state, action) => {
            state.isloading = true
        })
        Builder.addCase(updateroleApi.fulfilled, (state, action) => {
            state.isloading = false;
        });
        Builder.addCase(getrolepermissionApi.pending, (state, action) => {
            state.isloading = true
        })
        Builder.addCase(getrolepermissionApi.fulfilled, (state, action) => {
            state.isloading = false;
        });
        Builder.addCase(getpermissionApi.pending, (state, action) => {
            state.isloading = true
        })
        Builder.addCase(getpermissionApi.fulfilled, (state, action) => {
            state.isloading = false;
        });
        Builder.addCase(getusersApi.pending, (state, action) => {
            state.isloading = true
        })
        Builder.addCase(getusersApi.fulfilled, (state, action) => {
            state.isloading = false;
        });
        Builder.addCase(createuserApi.pending, (state, action) => {
            state.isloading = true
        })
        Builder.addCase(createuserApi.fulfilled, (state, action) => {
            state.isloading = false;
        });
        Builder.addCase(createroleApi.pending, (state, action) => {
            state.isloading = true
        })
        Builder.addCase(createroleApi.fulfilled, (state, action) => {
            state.isloading = false;
        });
        Builder.addCase(createpermissionApi.pending, (state, action) => {
            state.isloading = true
        })
        Builder.addCase(createpermissionApi.fulfilled, (state, action) => {
            state.isloading = false;
        });
        Builder.addCase(updatepermissionApi.pending, (state, action) => {
            state.isloading = true
        })
        Builder.addCase(updatepermissionApi.fulfilled, (state, action) => {
            state.isloading = false;
        });
    }
})

export default AdminUser.reducer;