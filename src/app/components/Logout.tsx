import { logoutWallet } from "../services/scope/UserService";
import { useAppDispatch } from "../state/store/Store";
import { PrimaryButton } from "./PrimaryButton";

export const LogOut = () => {
    const dispatch = useAppDispatch();
    const logoutaAcount = () => {
        dispatch(logoutWallet());
        window.location.reload();
    }
    return (
        <PrimaryButton onClick={logoutaAcount} text="LOGOUT" />
    );
}