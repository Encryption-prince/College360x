import React, { createContext, useContext, useState, useEffect } from 'react';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';

const AptosContext = createContext();

export const useAptos = () => {
  const context = useContext(AptosContext);
  if (!context) {
    throw new Error('useAptos must be used within an AptosProvider');
  }
  return context;
};

// Simple wallet adapter that works with the wallet standard
const SimpleWalletAdapter = () => {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Check if any wallet extensions are available
    const checkWallets = async () => {
      const availableWallets = [];
      
      // Check for Petra wallet
      if (window.aptos) {
        availableWallets.push({
          name: 'Petra',
          icon: '🦊',
          connect: async () => {
            try {
              await window.aptos.connect();
              const account = await window.aptos.account();
              setAccount(account);
              setIsConnected(true);
              setSelectedWallet('Petra');
              return account;
            } catch (error) {
              console.error('Failed to connect to Petra:', error);
              throw error;
            }
          },
          disconnect: async () => {
            try {
              await window.aptos.disconnect();
              setIsConnected(false);
              setAccount(null);
              setSelectedWallet(null);
            } catch (error) {
              console.error('Failed to disconnect from Petra:', error);
            }
          },
          signAndSubmitTransaction: async (payload) => {
            try {
              const transaction = await window.aptos.signAndSubmitTransaction(payload);
              return transaction;
            } catch (error) {
              console.error('Failed to sign and submit transaction:', error);
              throw error;
            }
          }
        });
      }

      // Check for Martian wallet
      if (window.martian) {
        availableWallets.push({
          name: 'Martian',
          icon: '🚀',
          connect: async () => {
            try {
              await window.martian.connect();
              const account = await window.martian.account();
              setAccount(account);
              setIsConnected(true);
              setSelectedWallet('Martian');
              return account;
            } catch (error) {
              console.error('Failed to connect to Martian:', error);
              throw error;
            }
          },
          disconnect: async () => {
            try {
              await window.martian.disconnect();
              setIsConnected(false);
              setAccount(null);
              setSelectedWallet(null);
            } catch (error) {
              console.error('Failed to disconnect from Martian:', error);
            }
          },
          signAndSubmitTransaction: async (payload) => {
            try {
              const transaction = await window.martian.signAndSubmitTransaction(payload);
              return transaction;
            } catch (error) {
              console.error('Failed to sign and submit transaction:', error);
              throw error;
            }
          }
        });
      }

      setWallets(availableWallets);
    };

    checkWallets();
  }, []);

  const connectWallet = async (walletName) => {
    const wallet = wallets.find(w => w.name === walletName);
    if (wallet) {
      try {
        await wallet.connect();
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  const disconnectWallet = async () => {
    if (selectedWallet) {
      const wallet = wallets.find(w => w.name === selectedWallet);
      if (wallet) {
        await wallet.disconnect();
      }
    }
  };

  const signAndSubmitTransaction = async (payload) => {
    if (selectedWallet) {
      const wallet = wallets.find(w => w.name === selectedWallet);
      if (wallet) {
        return await wallet.signAndSubmitTransaction(payload);
      }
    }
    throw new Error('No wallet connected');
  };

  return {
    wallets,
    selectedWallet,
    isConnected,
    account,
    connectWallet,
    disconnectWallet,
    signAndSubmitTransaction
  };
};

const AptosWalletProvider = ({ children }) => {
  const walletAdapter = SimpleWalletAdapter();

  const value = {
    ...walletAdapter,
    setIsConnected: walletAdapter.setIsConnected,
    setAccount: walletAdapter.setAccount,
  };

  return (
    <AptosContext.Provider value={value}>
      {children}
    </AptosContext.Provider>
  );
};

export default AptosWalletProvider; 