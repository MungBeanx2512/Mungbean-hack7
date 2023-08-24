import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React, { useContext, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import HeliusService from '../../services/helius.service';
import { WalletContext } from '../../context/WalletContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShyftService } from '../../services/shyft.service';
// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

export const HeaderRight = () => {
  const { publicKey } = useWallet();
  const { wallet, setWallet } = useContext(WalletContext);
  useEffect(() => {
    (async () => {
      if (publicKey && !wallet) {
        const balance = await ShyftService.getBalance(publicKey);
        const appBalance = await AsyncStorage.getItem('appBalance');
        await setWallet((prev: any) => ({
          ...prev,
          address: publicKey,
          balance: balance,
          appBalance: Number(appBalance).toFixed(2),
        }));
      } else if (wallet && publicKey === null && wallet.address) {
        setWallet(null);
      }
    })();
  }, [publicKey]);
  return (
    <div style={{ marginRight: 10 }}>
      <WalletMultiButton />
    </div>
  );
};
