import { Aptos } from "@aptos-labs/ts-sdk";
import CryptoJS from 'crypto-js';

// Aptos configuration
const APTOS_NETWORK = "testnet"; // Change to "mainnet" for production

// Initialize Aptos client
export const aptos = new Aptos({ network: APTOS_NETWORK });

// Module address for the ragging reports contract
const MODULE_ADDRESS = "0x1"; // Replace with your deployed module address
const MODULE_NAME = "ragging_reports";
const STRUCT_NAME = "RaggingReport";

// Hash sensitive data for privacy
export const hashSensitiveData = (data) => {
  if (!data) return "";
  return CryptoJS.SHA256(data.toString()).toString();
};

// Hash personal information while keeping structure
export const hashPersonalInfo = (person) => {
  return {
    nameHash: hashSensitiveData(person.name),
    role: person.role, // Keep role as it's not personally identifiable
    additionalDetailsHash: hashSensitiveData(person.additionalDetails),
    // Add a salt for additional security
    salt: CryptoJS.lib.WordArray.random(16).toString()
  };
};

// Create a secure hash of the entire report
export const createReportHash = (reportData) => {
  const reportString = JSON.stringify({
    dateOfIncident: reportData.dateOfIncident,
    timeOfIncident: reportData.timeOfIncident,
    location: reportData.location,
    severityLevel: reportData.severityLevel,
    descriptionHash: hashSensitiveData(reportData.description),
    involvedPersons: reportData.involvedPersons.map(hashPersonalInfo),
    witnesses: reportData.witnesses.map(w => ({
      nameHash: hashSensitiveData(w.name),
      contactInfoHash: hashSensitiveData(w.contactInfo),
      isAnonymous: w.isAnonymous
    })),
    evidences: reportData.evidences.map(hashSensitiveData),
    timestamp: new Date().toISOString()
  });
  
  return CryptoJS.SHA256(reportString).toString();
};

// Submit report to blockchain
export const submitReportToBlockchain = async (reportData, wallet) => {
  try {
    const reportHash = createReportHash(reportData);
    
    // For now, since the smart contract isn't deployed yet, we'll simulate the submission
    // This allows testing the UI flow while the contract is being developed
    console.log("Simulating blockchain submission for testing...");
    
    // Simulate transaction delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a mock transaction hash for testing
    const mockTransactionHash = "0x" + CryptoJS.lib.WordArray.random(32).toString();
    
    return {
      success: true,
      transactionHash: mockTransactionHash,
      reportHash: reportHash,
      isSimulated: true // Flag to indicate this is a simulation
    };
    
    /* 
    // Uncomment this section when the smart contract is deployed
    const payload = {
      type: "entry_function_payload",
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::submit_report`,
      type_arguments: [],
      arguments: [
        reportHash,
        reportData.severityLevel,
        reportData.location,
        reportData.status,
        JSON.stringify({
          dateOfIncident: reportData.dateOfIncident,
          timeOfIncident: reportData.timeOfIncident,
          descriptionLength: reportData.description.length,
          involvedPersonsCount: reportData.involvedPersons.length,
          witnessesCount: reportData.witnesses.length,
          evidencesCount: reportData.evidences.length
        })
      ]
    };

    // Submit transaction using the wallet's signAndSubmitTransaction method
    const transaction = await wallet.signAndSubmitTransaction(payload);
    
    // Wait for transaction to be confirmed
    await aptos.waitForTransaction({ transactionHash: transaction.hash });
    
    return {
      success: true,
      transactionHash: transaction.hash,
      reportHash: reportHash
    };
    */
  } catch (error) {
    console.error("Error submitting to blockchain:", error);
    throw new Error(`Blockchain submission failed: ${error.message}`);
  }
};

// Verify report on blockchain
export const verifyReportOnBlockchain = async (reportHash) => {
  try {
    // This would need to be implemented based on your smart contract structure
    // For now, we'll return a mock verification
    return {
      verified: true,
      timestamp: new Date().toISOString(),
      blockHeight: "mock_block_height"
    };
  } catch (error) {
    console.error("Error verifying on blockchain:", error);
    return {
      verified: false,
      error: error.message
    };
  }
};

// Get report history from blockchain
export const getBlockchainReportHistory = async (walletAddress) => {
  try {
    // This would query your smart contract for reports associated with the wallet
    // For now, returning mock data
    return [];
  } catch (error) {
    console.error("Error fetching blockchain history:", error);
    return [];
  }
};

// Generate a unique identifier for the report
export const generateReportId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `RAG-${timestamp}-${random}`.toUpperCase();
};

// Encrypt sensitive data for storage
export const encryptSensitiveData = (data, key) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
};

// Decrypt sensitive data
export const decryptSensitiveData = (encryptedData, key) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};

// Create a proof of existence
export const createProofOfExistence = (reportData) => {
  const reportHash = createReportHash(reportData);
  const timestamp = new Date().toISOString();
  const proofData = `${reportHash}${timestamp}`;
  
  return {
    proofHash: CryptoJS.SHA256(proofData).toString(),
    timestamp: timestamp,
    reportHash: reportHash
  };
};

// Verify transaction on blockchain
export const verifyTransaction = async (transactionHash) => {
  try {
    const transaction = await aptos.getTransactionByHash({ transactionHash });
    
    return {
      success: true,
      transaction: transaction,
      status: transaction.success ? 'success' : 'failed',
      timestamp: transaction.timestamp,
      gasUsed: transaction.gas_used,
      gasUnitPrice: transaction.gas_unit_price
    };
  } catch (error) {
    console.error("Error verifying transaction:", error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get transaction URL for Aptos Explorer
export const getTransactionUrl = (transactionHash, network = "testnet") => {
  const baseUrl = network === "mainnet" 
    ? "https://explorer.aptoslabs.com" 
    : "https://explorer.aptoslabs.com";
  return `${baseUrl}/txn/${transactionHash}`;
}; 