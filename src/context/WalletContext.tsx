import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { ShyftService } from '../services/shyft.service';

interface WalletContextType {
  wallet: { address: any; balance: string | number } | null;
  setWallet: React.Dispatch<
    React.SetStateAction<{ address: any; balance: string | number } | null>
  >;
  refresh: any;
}

export const WalletContext = createContext<WalletContextType>({
  wallet: null,
  setWallet: () => { },
  refresh: () => { },
});

const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<{ address: any; balance: string | number } | null>(null);


  const refresh = async (amount: number) => {
    if (wallet && wallet.address) {
      const balance = await ShyftService.getBalance(wallet.address);
      const appBalance = await AsyncStorage.getItem('appBalance');
      console.log(Number(balance) + amount);
      setWallet((prev: any) => ({
        ...prev,
        balance: (Number(balance) + Number(amount)).toFixed(2),
        appBalance,
      }));
    }
  };

  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        const address = await AsyncStorage.getItem('walletAddress');
        if (address) {
          setWallet({ address, balance: 0 });
        }
      } catch (error) {
        console.log('Error fetching wallet address:', error);
      }
    };

    fetchWalletAddress();
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, setWallet, refresh }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
