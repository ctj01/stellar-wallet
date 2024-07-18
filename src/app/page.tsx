"use client";
import { getKeyPair } from "./op/CreateWallet";
import { SigningKeypair } from "@stellar/typescript-wallet-sdk";
import { CopyToClipboard } from "./components/TextArea";
import { Nav } from "./components/Nav";
import { useEffect, useState } from "react";
import { Loading } from "./components/Loading";
import { createAccount, logoutWallet } from "./services/scope/UserService";
import { useAppDispatch, useAppSelector } from "./state/store/Store";
import { getAccountDetails } from "./services/scope/AccountService";
import { PrimaryButton } from "./components/PrimaryButton";
import { CreateAsset } from "./components/CreateAsset";
import { AccountDetails } from "./components/AccountDetails";


export default function Home() {
  const generalSelector = useAppSelector(state => state.general);
  const [secretKey, setSecretKey] = useState<SigningKeypair | null>(null);
  const userSelector = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  const generateKeyPair = async () => {
    ;
    const keyPair = await getKeyPair();
    setSecretKey(keyPair);
  }
  const getWalletDetails = async () => {

    if (!userSelector.auth.isAuthenticated) {
      dispatch(logoutWallet());
    }
    try {
      const accountId = userSelector.auth.user.principalAccount;
      dispatch(getAccountDetails(accountId));
    } catch (error) {
      console.log(error);
    }

  }
  const getSecretKeyFromState = () => {
    if (userSelector.auth.isAuthenticated) {
      const signingKeyPair = SigningKeypair.fromSecret(userSelector.auth.user.secretKey);
      setSecretKey(signingKeyPair);
    }
  }

  async function createWallet() {

    try {

      dispatch(createAccount(secretKey as SigningKeypair));

    } catch (error) {
      alert("Error creating account");
    }
  }

  useEffect(() => {
    getWalletDetails();
    getSecretKeyFromState();
  }, [userSelector.auth.isAuthenticated]);
  return (

    <div className="flex min-h-screen flex-col bg-white align-center ">  
      <Nav />
      <div className="p-4">
        <p className="text-lg">This is a simple wallet application for testing Stellar blockchain</p>
      </div>
      <div className="p-4" >
        <div style={{ width: "50%" }} className="mt-4">
          <CopyToClipboard label="SECRET KEY" type="password" value={secretKey?.secretKey} />
        </div>
        <div style={{ width: "50%" }} className="mt-4">
          <CopyToClipboard label="PUBLIC KEY" type="text" value={secretKey?.publicKey} />
        </div>
        {!userSelector.auth.isAuthenticated && (<PrimaryButton onClick={generateKeyPair} text="Generate Key Pair" />)}
        {
          !userSelector.auth.isAuthenticated &&  (
            secretKey && (
              <PrimaryButton onClick={createWallet} text="Create Account" />
            )
          )
        }
      </div>
      {userSelector.auth.isAuthenticated && (
        <>
          <div>
            <AccountDetails />
            <div className="p-4">
              <CreateAsset secretKey={secretKey as SigningKeypair} />
            </div>
          </div>
        </>
      )}
      {generalSelector.isLoading && (<Loading />)}
    </div>
  );
}
