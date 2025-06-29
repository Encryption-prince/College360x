# Aptos Blockchain Integration for Ragging Reports

## Overview

This document explains the integration of Aptos blockchain technology into the College360x ragging reports system to enhance security, privacy, and transparency while maintaining confidentiality of sensitive information.

## Features

### 🔒 Enhanced Security
- **Immutable Records**: All reports are stored on the Aptos blockchain, making them tamper-proof
- **Cryptographic Hashing**: Sensitive personal information is hashed before storage
- **Proof of Existence**: Each report generates a unique cryptographic proof
- **Audit Trail**: Complete transparency of report submission and status changes

### 🛡️ Privacy Protection
- **Name Hashing**: Personal names are converted to SHA-256 hashes
- **Contact Information Encryption**: Contact details are encrypted before storage
- **Anonymous Reporting**: Support for anonymous witness testimonies
- **Selective Disclosure**: Only authorized personnel can access decrypted data

### ⚡ Blockchain Benefits
- **Decentralized Storage**: No single point of failure
- **Transparent Verification**: Anyone can verify report authenticity
- **Smart Contract Logic**: Automated status updates and validations
- **Event Logging**: All actions are logged as blockchain events

## Architecture

### Frontend Components

#### 1. AptosWalletProvider (`components/AptosWalletProvider.jsx`)
- Manages wallet connections
- Supports multiple wallet types (Petra, Martian, etc.)
- Provides wallet context throughout the app

#### 2. BlockchainSecurityBadge (`components/BlockchainSecurityBadge.jsx`)
- Displays blockchain verification status
- Shows transaction hashes and report hashes
- Indicates security level of reports

#### 3. Aptos Utilities (`utils/aptosUtils.js`)
- `hashSensitiveData()`: Converts sensitive data to SHA-256 hashes
- `createReportHash()`: Generates unique hash for entire report
- `submitReportToBlockchain()`: Submits report to Aptos blockchain
- `verifyReportOnBlockchain()`: Verifies report authenticity
- `createProofOfExistence()`: Creates cryptographic proof

### Smart Contract (`backend/aptos-contracts/ragging_reports.move`)

The Move smart contract provides:

- **Report Submission**: Secure storage of report hashes
- **Status Management**: Automated status updates
- **Access Control**: Role-based permissions
- **Event Emission**: Transparent logging of all actions
- **Data Verification**: Cryptographic proof of report existence

## Data Flow

### 1. Report Submission
```
User Input → Hash Sensitive Data → Create Report Hash → 
Submit to Backend → Submit to Blockchain → Generate Proof
```

### 2. Data Hashing Process
```javascript
// Example of how personal data is hashed
const hashedName = hashSensitiveData(person.name);
const hashedContact = hashSensitiveData(witness.contactInfo);
const reportHash = createReportHash(entireReport);
```

### 3. Blockchain Storage
- Only hashed data and metadata are stored on-chain
- Original sensitive data remains encrypted in backend
- Blockchain provides proof of existence and timestamp

## Security Features

### Cryptographic Hashing
- **SHA-256**: Used for all sensitive data hashing
- **Salt Addition**: Random salt added to prevent rainbow table attacks
- **Deterministic**: Same input always produces same hash

### Privacy Protection
- **Zero-Knowledge**: Blockchain doesn't store personal information
- **Selective Disclosure**: Only authorized parties can decrypt data
- **Anonymous Reporting**: Support for anonymous submissions

### Immutability
- **Tamper-Proof**: Once submitted, reports cannot be altered
- **Audit Trail**: Complete history of all changes
- **Verification**: Anyone can verify report authenticity

## Installation and Setup

### 1. Install Dependencies
```bash
cd frontend
npm install @aptos-labs/wallet-adapter-react @aptos-labs/wallet-adapter-ant-design @aptos-labs/wallet-adapter-wallet-standard crypto-js antd
```

### 2. Configure Aptos Network
```javascript
// In aptosUtils.js
const APTOS_NETWORK = "testnet"; // Change to "mainnet" for production
```

### 3. Deploy Smart Contract
```bash
# Deploy the Move contract to Aptos
aptos move publish --named-addresses ragging_reports=<YOUR_ADDRESS>
```

### 4. Update Module Address
```javascript
// In aptosUtils.js, update the module address
const MODULE_ADDRESS = "0x<YOUR_DEPLOYED_ADDRESS>";
```

## Usage

### Connecting Wallet
1. User clicks "Connect Wallet" button
2. Selects preferred wallet (Petra, Martian, etc.)
3. Approves connection
4. Wallet address is displayed with connection status

### Submitting Reports
1. User fills out ragging report form
2. Sensitive data is automatically hashed
3. Report is submitted to backend first
4. If wallet is connected, report is also submitted to blockchain
5. User receives confirmation with transaction hash

### Verifying Reports
1. Use report hash to verify on blockchain
2. Check transaction status and timestamp
3. Verify cryptographic proof of existence

## API Reference

### Blockchain Functions

#### `submitReportToBlockchain(reportData, wallet)`
Submits a report to the Aptos blockchain.

**Parameters:**
- `reportData`: Object containing report information
- `wallet`: Connected Aptos wallet instance

**Returns:**
- `{ success: boolean, transactionHash: string, reportHash: string }`

#### `verifyReportOnBlockchain(reportHash)`
Verifies if a report exists on the blockchain.

**Parameters:**
- `reportHash`: SHA-256 hash of the report

**Returns:**
- `{ verified: boolean, timestamp: string, blockHeight: string }`

#### `createReportHash(reportData)`
Creates a unique hash for the entire report.

**Parameters:**
- `reportData`: Complete report object

**Returns:**
- `string`: SHA-256 hash of the report

### Smart Contract Functions

#### `submit_report`
Submits a new ragging report to the blockchain.

#### `update_report_status`
Updates the status of an existing report.

#### `withdraw_report`
Allows the original submitter to withdraw their report.

#### `verify_report`
Verifies if a report exists on the blockchain.

## Security Considerations

### Best Practices
1. **Never store plain text personal data on blockchain**
2. **Use strong cryptographic hashing for all sensitive data**
3. **Implement proper access controls**
4. **Regular security audits of smart contracts**
5. **Monitor blockchain transactions for anomalies**

### Privacy Compliance
- **GDPR Compliance**: Only hashed data on blockchain
- **FERPA Compliance**: Educational records protection
- **Local Laws**: Compliance with anti-ragging regulations

### Risk Mitigation
- **Backup Systems**: Traditional database as backup
- **Error Handling**: Graceful degradation if blockchain is unavailable
- **Rate Limiting**: Prevent spam submissions
- **Input Validation**: Validate all user inputs

## Monitoring and Analytics

### Blockchain Metrics
- Total reports submitted
- Transaction success rates
- Gas usage optimization
- Network performance

### Security Monitoring
- Failed transaction attempts
- Unusual activity patterns
- Smart contract events
- Access control violations

## Future Enhancements

### Planned Features
1. **Multi-Signature Approvals**: Require multiple authorities for status changes
2. **IPFS Integration**: Store evidence files on decentralized storage
3. **Zero-Knowledge Proofs**: Advanced privacy protection
4. **Cross-Chain Verification**: Verify reports across multiple blockchains
5. **Mobile Wallet Support**: Native mobile wallet integration

### Scalability Improvements
1. **Layer 2 Solutions**: Reduce transaction costs
2. **Batch Processing**: Submit multiple reports in single transaction
3. **Caching Layer**: Improve read performance
4. **Sharding**: Distribute data across multiple shards

## Troubleshooting

### Common Issues

#### Wallet Connection Problems
```javascript
// Check if wallet is properly initialized
if (!wallet.connected) {
    console.log("Wallet not connected");
}
```

#### Transaction Failures
```javascript
// Handle blockchain submission errors
try {
    const result = await submitReportToBlockchain(data, wallet);
} catch (error) {
    console.error("Blockchain submission failed:", error);
    // Fallback to backend-only submission
}
```

#### Hash Verification Issues
```javascript
// Verify report hash consistency
const expectedHash = createReportHash(reportData);
const actualHash = blockchainReport.hash;
if (expectedHash !== actualHash) {
    console.error("Hash mismatch detected");
}
```

## Support and Resources

### Documentation
- [Aptos Developer Documentation](https://aptos.dev/)
- [Move Language Reference](https://move-language.github.io/move/)
- [Wallet Adapter Documentation](https://github.com/aptos-labs/aptos-wallet-adapter)

### Community
- [Aptos Discord](https://discord.gg/aptos)
- [Move Language Community](https://community.move-lang.dev/)
- [College360x Support](mailto:support@college360x.com)

### Security Audits
- Regular smart contract audits recommended
- Third-party security reviews
- Bug bounty programs

---

**Note**: This integration provides enhanced security and transparency while maintaining user privacy. The blockchain serves as a tamper-proof audit trail while sensitive personal information remains protected through cryptographic hashing and encryption. 