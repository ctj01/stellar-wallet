const FriendBotUrl = 'https://friendbot.stellar.org';

export const FriendoBotEndPoints = {
    fundAccount: (publicKey: string) => `${FriendBotUrl}?addr=${publicKey}`,
}