import { PublicKey } from "@solana/web3.js";
import { Helius } from "helius-sdk";
import { ApiService } from "./api.service";

const apiKey: string = '4a87deb3-929e-4a2e-9e11-5d667e57b878';
const urlRPC: string = `https://devnet.helius-rpc.com/?api-key=${apiKey}`;

const helius = new Helius(apiKey, 'devnet');

const HeliusService: any = {
    getBalance: async (address: string) => {
        const response: any = await ApiService.get(`https://api-devnet.helius.xyz/v0/addresses/${address}/balances?api-key=${apiKey}`)
        return (response.nativeBalance / 1000000000).toFixed(2);
    },
    takeAirdrop: async (address: string) => {
        try {
            return await helius.rpc.airdrop(new PublicKey(address), 1000000000);
        } catch (error: any) {
            return error.message;
        }
    },
    getProfile: async (address: string) => {
        const response: any = await ApiService.post(urlRPC, {
            jsonrpc: '2.0',
            id: 'my-id',
            method: 'getAssetsByOwner',
            params: {
                ownerAddress: address,
                page: 1, // Starts at 1
                limit: 1000
            },
        },
        );
        return response.result;
    }
};

export default HeliusService;