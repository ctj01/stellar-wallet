import { createSlice } from "@reduxjs/toolkit";



const initialState  = {
    auth: {
        isAuthenticated: false,
        user: {
            issuer: null,
            principalAccount: "",
            issuedAt: null,
            expiresAt: null,
            clientDomain: null,
            token: "",
            secretKey : ""
        },
    }
    
}
const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.auth.isAuthenticated = true;
            state.auth.user = action.payload;
        },
        logout: (state) => {
            state.auth.isAuthenticated = false;
            state.auth.user = null as any;
        }
    }
});

export const { login, logout } = loginSlice.actions;
export const AuthReducer = loginSlice.reducer;