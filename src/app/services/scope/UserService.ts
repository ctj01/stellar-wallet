import {  SigningKeypair } from "@stellar/typescript-wallet-sdk";
import { anchor, stellar } from "../singleton/Wallet";
import { login, logout } from "@/app/state/slices/AuthenticationSlices";
import { Dispatch } from "@reduxjs/toolkit";
import { setLoading } from "@/app/state/slices/GeneralSlices";

export const createAccount = (secretKey: SigningKeypair, INITIAL_BALANCE: number = 1) => async (dispatch: Dispatch) => {

   
    try {
        if (!secretKey) {
            return;
        }
        
        dispatch(setLoading(true));
        await stellar.fundTestnetAccount(secretKey.publicKey);
        await anchorLogin(secretKey)(dispatch);

    } catch (error) {
        console.log(error);
    }
    finally {
        dispatch(setLoading(false));
    }

}

export const logoutWallet = () => async (dispatch: Dispatch) => {
    dispatch(logout());
    localStorage.removeItem("persist:root");
};

export const anchorLogin = (secretKey: SigningKeypair) => async (dispatch: Dispatch) => {
    const sep10 = await anchor.sep10();
    const  authToken = await sep10.authenticate({
        accountKp: secretKey,
    
    });
    dispatch(login({
        secretKey: secretKey.secretKey,
        ...authToken
    }));
}