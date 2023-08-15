import React from 'react';
import WalletProvider from './WalletContext';
import LoadingProvider from './LoadingContext';
import WalletAdapter from './AdapterWallet';

export default function ProviderWrapper({ children }: any) {
  return (
    <LoadingProvider>
      <WalletAdapter>
        <WalletProvider>
          {children}
        </WalletProvider>
      </WalletAdapter>
    </LoadingProvider>
  )
}
