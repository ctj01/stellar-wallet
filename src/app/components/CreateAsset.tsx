import { useState } from "react";
import { PrimaryButton } from "./PrimaryButton";
import { Asset, Keypair, Networks, Operation, TransactionBuilder } from "@stellar/stellar-sdk";
import { stellar } from "../services/singleton/Wallet";
import { SigningKeypair } from "@stellar/typescript-wallet-sdk";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "../state/store/Store";
import { setLoading } from "../state/slices/GeneralSlices";
import { getAccountDetails } from "../services/scope/AccountService";

interface Props {
    secretKey: SigningKeypair
}

export const CreateAsset = ({secretKey} : Props) => {

    const [assetName, setAssetName] = useState("");
    const [supply, setSupply] = useState("");
    const [showModal, setShowModal] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.general.isLoading);

    const openModal = () => {
        setShowModal(prev => !prev);
    }

    const showNotification = (message: string, variant: "success" | "error") => {
        enqueueSnackbar(message, { variant });
    }

    const createAsset = async () => {
        dispatch(setLoading(true));
          const distributionSignKey = SigningKeypair.fromSecret(process.env.NEXT_PUBLIC_SIGN_KEY as string);
          const distributionKeyPair = Keypair.fromSecret(process.env.NEXT_PUBLIC_SIGN_KEY as string);
          const asset = new Asset(assetName, distributionSignKey?.publicKey as string);
          const signKeyPair = SigningKeypair.fromSecret(secretKey?.secretKey as string);
          const signTransactionKeyPair = Keypair.fromSecret(secretKey?.secretKey as string);
          const fee = await stellar.getRecommendedFee();
          const distributionAccount = await stellar.server.loadAccount(distributionKeyPair.publicKey());
          const receiverAccount = await stellar.server.loadAccount(signKeyPair.publicKey);
          let transaction = new TransactionBuilder(receiverAccount, { fee: fee, networkPassphrase: Networks.TESTNET })
            .addOperation(Operation.changeTrust({
              asset: asset,
              limit: supply
            })).setTimeout(100).build();
          transaction.sign(signTransactionKeyPair);
          await stellar.server.submitTransaction(transaction).then((result) => {
    
            transaction = new TransactionBuilder(distributionAccount, { fee: fee, networkPassphrase: Networks.TESTNET })
              .addOperation(Operation.payment({
                destination: signKeyPair.publicKey,
                asset: asset,
                amount: supply
              })).setTimeout(100).build();
            transaction.sign(distributionKeyPair);
            stellar.server.submitTransaction(transaction).then((result) => {
                showNotification("Asset created successfully", "success");
                window.location.reload();
            }).catch((error) => {
                showNotification("Error creating asset", "error");
              console.log(error);
            });
            dispatch(getAccountDetails(signKeyPair.publicKey));
    
          }).catch((error) => {
            console.log(error);
          }).finally(() => {
            dispatch(setLoading(false));
            setShowModal(false);
          });

    
      }

    
    return (
        <div>
            <PrimaryButton text="Create Asset" onClick={openModal} />
            <Dialog
                open={showModal}
                onClose={openModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
            >
                <DialogContent>
                    <div className="p-4">
                        <input
                            type="text"
                            value={assetName}
                            onChange={(e) => setAssetName(e.target.value)}
                            style={{ width: "90%" }}
                            className="border border-gray-300 rounded p-2"
                            placeholder="Enter Asset Name"
                        />
                    </div>
                    <div className="p-4">
                        <input
                            type="number"
                            value={supply}
                            onChange={(e) => setSupply(e.target.value)}
                            style={{ width: "90%" }}
                            className="border border-gray-300 rounded p-2"
                            placeholder="Enter initial Supply"
                        />
                    </div>
                    <div className="p-4">
                        <PrimaryButton onClick={createAsset} disabled={loading}  text="Create" />
                    </div>
                </DialogContent>
            </Dialog>
         
        </div>
    );
}