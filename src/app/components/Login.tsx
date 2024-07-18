import { SigningKeypair } from "@stellar/typescript-wallet-sdk";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { PrimaryButton } from "./PrimaryButton";
import { anchorLogin } from "../services/scope/UserService";
import { useAppDispatch } from "../state/store/Store";
import { useSnackbar } from "notistack";

export const Login = () => {

    const [secretKey, setSecretKey] = useState<SigningKeypair | null>(null);
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const openModal = () => {
        setShowModal(prev => !prev);
    }
    const showNotification = (message: string, variant: "success" | "error") => {
        enqueueSnackbar(message, { variant });
    }
    const loginAccount = async () => {
        if (!secretKey) {
            return;
        }
        await anchorLogin(secretKey)(dispatch);
        showNotification("Logged in successfully", "success");
    }
       


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keyPair = SigningKeypair.fromSecret(e.target.value);
        setSecretKey(keyPair);

    }
    return (
        <div>
            <PrimaryButton onClick={openModal} text="LOGIN" />
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
                            value={secretKey?.secretKey}
                            onChange={onChange}
                            style={{ width: "90%" }}
                            className="border border-gray-300 rounded p-2"
                            placeholder="Enter Secret Key"
                        />
                    </div>
                    <div className="p-4">
                        <PrimaryButton onClick={loginAccount} text="Login" />
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    )


}