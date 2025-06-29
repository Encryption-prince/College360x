import React from 'react';
import { ShieldCheckIcon, CheckCircleIcon, ExclamationTriangleIcon, ClockIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const BlockchainSecurityBadge = ({ 
  isVerified, 
  isOnBlockchain, 
  reportHash, 
  transactionHash, 
  verificationStatus = 'pending',
  showDetails = false 
}) => {
  const getStatusConfig = () => {
    if (isVerified && isOnBlockchain) {
      return {
        icon: CheckCircleIcon,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        text: 'Blockchain Verified',
        description: 'Report is securely stored on Aptos blockchain'
      };
    } else if (isOnBlockchain) {
      return {
        icon: ClockIcon,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        text: 'Pending Verification',
        description: 'Report submitted to blockchain, awaiting verification'
      };
    } else {
      return {
        icon: ExclamationTriangleIcon,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        text: 'Not on Blockchain',
        description: 'Report not yet submitted to blockchain'
      };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-4 mb-4`}>
      <div className="flex items-center gap-3">
        <IconComponent className={`w-6 h-6 ${config.color}`} />
        <div className="flex-1">
          <h3 className={`font-semibold ${config.color}`}>{config.text}</h3>
          <p className="text-sm text-gray-600">{config.description}</p>
        </div>
        <ShieldCheckIcon className="w-5 h-5 text-gray-400" />
      </div>
      
      {showDetails && (reportHash || transactionHash) && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="space-y-2">
            {reportHash && (
              <div>
                <label className="text-xs font-medium text-gray-500">Report Hash:</label>
                <div className="text-xs font-mono bg-gray-100 p-2 rounded break-all">
                  {reportHash}
                </div>
              </div>
            )}
            {transactionHash && (
              <div>
                <label className="text-xs font-medium text-gray-500">Transaction Hash:</label>
                <div className="text-xs font-mono bg-gray-100 p-2 rounded break-all">
                  {transactionHash}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <LockClosedIcon className="w-3 h-3" />
          <span>End-to-end encrypted</span>
        </div>
        <div className="flex items-center gap-1">
          <ShieldCheckIcon className="w-3 h-3" />
          <span>Immutable record</span>
        </div>
      </div>
    </div>
  );
};

export default BlockchainSecurityBadge; 