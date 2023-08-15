import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { BackpackWalletAdapter } from '@solana/wallet-adapter-backpack';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const WalletService = {
  solanaConnect: async () => {4
    const { solana }: any = window;
    if (!solana) {
      alert("Please Install Solana");
    }

    try {
      const network = "devnet";
      const backpackWallet: any = new BackpackWalletAdapter();
      await backpackWallet.connect();
      const rpcUrl = clusterApiUrl(network);
      const connection = new Connection(rpcUrl, "confirmed");
      const wallet = {
        address: backpackWallet.publicKey.toString(),
      };

      if (wallet.address) {
        const accountInfo = await connection.getAccountInfo(new PublicKey(wallet.address), "confirmed");
        await AsyncStorage.setItem('walletAddress', wallet.address)
        return wallet.address;
      }
    } catch (err) {
      console.log(err);
    }
  }
};
