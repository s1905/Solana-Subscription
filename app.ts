import { Connection, PublicKey, LAMPORTS_PER_SOL, } from "@solana/web3.js";

const WSS_ENDPOINT = 'wss://crimson-sly-energy.solana-devnet.discover.quiknode.pro/1c323bd264ffee775c142a669e1e04f5fb08804e/'; // replace with your URL
const HTTP_ENDPOINT = 'https://crimson-sly-energy.solana-devnet.discover.quiknode.pro/1c323bd264ffee775c142a669e1e04f5fb08804e/'; // replace with your URL
const solanaConnection = new Connection(HTTP_ENDPOINT, { wsEndpoint: WSS_ENDPOINT });
const sleep = (ms:number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    console.log('Listening...');
    const ACCOUNT_TO_WATCH = new PublicKey('9o13FAL2BZDyUor6nDUZsXCpHXLzHQrhdTh2FmH7VKan');
    const subscriptionId = await solanaConnection.onAccountChange(
        ACCOUNT_TO_WATCH,
        (updatedAccountInfo) =>
            console.log(`---Event Notification for ${ACCOUNT_TO_WATCH.toString()}--- \nNew Account Balance:`, updatedAccountInfo.lamports / LAMPORTS_PER_SOL, ' SOL'),
        "confirmed"
    );
    console.log('Starting web socket, subscription ID: ', subscriptionId);
    await sleep(10000); //Wait 10 seconds for Socket Testing
    await solanaConnection.requestAirdrop(ACCOUNT_TO_WATCH, LAMPORTS_PER_SOL);
})()