import {
    ShyftSdk,
    Network,
    signAndSendTransaction,
    signAndSendTransactionWithPrivateKeys,
} from "@shyft-to/js";
import { bankerAddress, privateWalKey } from "../constants/Banker";
import { ApiService } from "./api.service";
import { Connection, PublicKey, Transaction, clusterApiUrl } from "@solana/web3.js";
import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";

const apiKey = 'Uc6QK72WsU6HXlwM';

const shyft = new ShyftSdk({
    apiKey: 'Uc6QK72WsU6HXlwM',
    network: Network.Devnet,
});

export const ShyftService = {
    sendSol: async (address: string, amount: number) => {
        const body = {
            network: Network.Devnet,
            from_address: address,
            to_address: bankerAddress,
            amount: Number(amount)
        };

        const response = ApiService.post('https://api.shyft.to/sol/v1/wallet/send_sol', body, { headers: { 'x-api-key': apiKey } })

        return response;
    },
    withdraw: async (address: string, amount: number) => {
        const body = {
            network: Network.Devnet,
            from_address: bankerAddress,
            to_address: address,
            amount: Number(amount)
        };

        const response = ApiService.post('https://api.shyft.to/sol/v1/wallet/send_sol', body, { headers: { 'x-api-key': apiKey } })

        return response;
    },
    getBalance: async(wallet: any) => {
        const response = await shyft.wallet.getBalance({wallet});

        return response.toFixed(2);
    },
    getProfile: async(wallet: any) => {
        const response = await shyft.wallet.getPortfolio({wallet});
        
        return response.nfts;
    },
    signContract: async (encodedTransaction: string,wallet: any) => {
        const network = "devnet";
        // const wallet: any = new BackpackWalletAdapter();
        // await wallet.disconnect();
        // await wallet.connect();
        const rpcUrl = clusterApiUrl(network);
        const connection = new Connection(rpcUrl, "confirmed");
        const recoveredTransaction = Transaction.from(
            Buffer.from(encodedTransaction, "base64")
        );
        const signedTx = await wallet.signTransaction(recoveredTransaction);
        const confirmTransaction = await connection.sendRawTransaction(
            signedTx.serialize()
        );
        return confirmTransaction;
    },
    signWithPrivate: async (encodedTransaction: string) => {
        const network = Network.Devnet;
        const privateKeys = [privateWalKey];
        return await signAndSendTransactionWithPrivateKeys(
            network,
            encodedTransaction,
            privateKeys
        );
    },
    getActiveListings: async (size = 6, page = 1) =>
    await shyft.marketplace.listing.active({
      network: Network.Devnet,
      marketplaceAddress: 'DUR7FnsaK5fN93qygYAgA9YDrc8mwjM9AspdAvCXLSec',
      sortBy: "price",
      sortOrder: "desc",
      page: page,
      size: size,
    }),
}