const HorizonURL = "https://horizon-testnet.stellar.org/";

export const HorizonEndPoints = {
    acccountDetails: (publicKey: string) => `${HorizonURL}accounts/${publicKey}`,
    transactions: (publicKey: string) => `${HorizonURL}accounts/${publicKey}/transactions`,
    operations: (publicKey: string) => `${HorizonURL}accounts/${publicKey}/operations`,
    payments: (publicKey: string) => `${HorizonURL}accounts/${publicKey}/payments`,
}