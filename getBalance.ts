import { 
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL, 
    Keypair,
    sendAndConfirmTransaction} from "@solana/web3.js";
import * as bs58 from "bs58";

const connection = new Connection("https://api.devnet.solana.com");

const sender = new PublicKey('HAcWvGRksxsFaHph9MjVVjgpsmsbr71jJx2MMFJyRuA3');

const generateAccount = async () => {
    const keypair = Keypair.generate();
    console.log(`Public Key: ${keypair.publicKey.toBase58()}`);
    console.log(`private key(raw): ${keypair.secretKey}`);
    console.log(`private key(bs58): ${bs58.encode(keypair.secretKey)}`);
}

const getSol = async () => {
    let txhash = await connection.requestAirdrop(sender, 1e9);
    console.log(`txhash: ${txhash}`);
}

const getBalanceSOL = async () => {
    let balance = await connection.getBalance(sender);
    console.log(`${balance / LAMPORTS_PER_SOL} SOL`);
}

const getBalanceUSDC = async () => {
    const ACCOUNT_TO_WATCH = new PublicKey('A7WBCkvxYP1zHrFH9vnRGbZ6M93G4Myo8VidTyzpkmx2');
    const USDC_Balance = await connection.getTokenAccountBalance(ACCOUNT_TO_WATCH);
    console.log(USDC_Balance.value.uiAmount);
}

getBalanceUSDC()
//connection.requestAirdrop(senderKeypair, LAMPORTS_PER_SOL);