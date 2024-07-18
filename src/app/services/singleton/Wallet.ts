import { StellarConfiguration, Wallet } from "@stellar/typescript-wallet-sdk";
import { ApplicationConfiguration, DefaultSigner } from "@stellar/typescript-wallet-sdk";
import { httpClient } from "./HttpClient";

let appConfig = new ApplicationConfiguration(DefaultSigner, httpClient);
export const wallet = new Wallet({
    stellarConfiguration: StellarConfiguration.TestNet(),
    applicationConfiguration: appConfig,
});
export const anchor = wallet.anchor({ homeDomain: process.env.NEXT_PUBLIC_ANCHOR_URL as string, allowHttp: true }); // Anchor URL
export const stellar = wallet.stellar();