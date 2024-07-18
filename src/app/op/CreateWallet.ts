
import { wallet } from "../services/singleton/Wallet";

export const getKeyPair = async () => {
    
   
    let account = wallet.stellar().account();
    const kp = account.createKeypair();

 
    return kp;

}