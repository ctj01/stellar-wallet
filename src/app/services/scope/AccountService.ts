import { accountDetails } from "@/app/state/slices/AccountSlices";
import { HorizonEndPoints } from "@/app/utils/HorizonEndPoints";
import { Dispatch } from "@reduxjs/toolkit";
import { httpClient } from "../singleton/HttpClient";
import { setLoading } from "@/app/state/slices/GeneralSlices";

export const getAccountDetails = (publicKey: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        const account = await httpClient.get(HorizonEndPoints.acccountDetails(publicKey));
        dispatch(accountDetails(account.data));
    } catch (error) {
        console.log(error);
    }
    finally {
        dispatch(setLoading(false));
    }

}