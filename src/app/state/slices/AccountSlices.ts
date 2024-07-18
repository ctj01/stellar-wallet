import { createSlice } from "@reduxjs/toolkit";
type AccountDetails = {
    Account: {
        balances: {
            asset_type: string;
            asset_code: string;
            asset_issuer: string;
            balance: string;
        }[]
    }
}

const initialState : AccountDetails  = {
    Account: {
        balances: []
    }
    
}

const AccountSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        accountDetails: (state, action) => {
            state.Account = action.payload;
        },
    }
});

export const { accountDetails } = AccountSlice.actions;
export const AccountReducer = AccountSlice.reducer;