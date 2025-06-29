import React from 'react';
import { useAptos } from './AptosWalletProvider';
import { WalletIcon } from '@heroicons/react/24/outline';

const WalletSelector = () => {
  const { wallets, isConnected, selectedWallet, account, connectWallet, disconnectWallet } = useAptos();

  if (isConnected && selectedWallet) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-green-700">Connected</span>
        </div>
        <span className="text-xs text-gray-500 font-mono">
          {account?.address ? 
            `${account.address.substring(0, 6)}...${account.address.substring(-4)}` : 
            selectedWallet
          }
        </span>
        <button
          onClick={disconnectWallet}
          className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  if (wallets.length === 0) {
    return (
      <div className="flex items-center gap-2">
        <WalletIcon className="w-5 h-5 text-gray-400" />
        <span className="text-sm text-gray-500">No wallets available</span>
        <a 
          href="https://petra.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:underline"
        >
          Install Petra
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <WalletIcon className="w-5 h-5 text-gray-400" />
      <select
        onChange={(e) => {
          if (e.target.value) {
            connectWallet(e.target.value);
          }
        }}
        className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue=""
      >
        <option value="" disabled>Connect Wallet</option>
        {wallets.map((wallet) => (
          <option key={wallet.name} value={wallet.name}>
            {wallet.icon} {wallet.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WalletSelector; 