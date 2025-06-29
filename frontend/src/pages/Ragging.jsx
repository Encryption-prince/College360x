import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon, UserIcon, PlusIcon, PaperClipIcon, InformationCircleIcon, PhoneIcon, AcademicCapIcon, DocumentTextIcon, CalendarIcon, MagnifyingGlassIcon, EyeIcon, EllipsisHorizontalIcon, ExclamationCircleIcon, MapPinIcon, ShieldCheckIcon, ArrowTopRightOnSquareIcon, WalletIcon, LockClosedIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { Menu, Transition } from '@headlessui/react';
import { PencilIcon, ArrowDownTrayIcon, DocumentArrowUpIcon, ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAptos } from '../components/AptosWalletProvider';
import WalletSelector from '../components/WalletSelector';
import BlockchainSecurityBadge from '../components/BlockchainSecurityBadge';
import { 
    submitReportToBlockchain, 
    createReportHash, 
    hashSensitiveData, 
    generateReportId,
    verifyReportOnBlockchain,
    createProofOfExistence,
    verifyTransaction,
    getTransactionUrl
} from '../utils/aptosUtils';

const roles = ['Student', 'Faculty', 'Staff', 'Other'];

const initialPerson = { name: '', role: '', additionalDetails: '' };
const initialWitness = { name: '', contactInfo: '', isAnonymous: false };

const RaggingReport = () => {
    // Wallet state
    const { isConnected, account, signAndSubmitTransaction } = useAptos();
    
    // Form state
    const [form, setForm] = useState({
        dateOfIncident: '',
        timeOfIncident: '',
        location: '',
        severityLevel: 'Low',
        description: '',
        reportAsSelf: false,
        status: 'PENDING',
        reportId: null,
        involvedPersons: [{ ...initialPerson }],
        witnesses: [{ ...initialWitness }],
        evidences: [''] // Evidence URLs as strings
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);
    const [blockchainStatus, setBlockchainStatus] = useState({
        isOnBlockchain: false,
        isVerified: false,
        reportHash: null,
        transactionHash: null,
        verificationStatus: 'pending'
    });
    const [transactionDetails, setTransactionDetails] = useState(null);
    const [verifying, setVerifying] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [statusUpdateMessage, setStatusUpdateMessage] = useState(null);

    // Handlers for dynamic fields
    const addPerson = () => setForm(f => ({ ...f, involvedPersons: [...f.involvedPersons, { ...initialPerson }] }));
    const addWitness = () => setForm(f => ({ ...f, witnesses: [...f.witnesses, { ...initialWitness }] }));
    const addEvidence = () => setForm(f => ({ ...f, evidences: [...f.evidences, ''] }));

    // Handlers for input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    };
    const handlePersonChange = (idx, field, value) => {
        setForm(f => {
            const updated = [...f.involvedPersons];
            updated[idx][field] = value;
            return { ...f, involvedPersons: updated };
        });
    };
    const handleWitnessChange = (idx, field, value) => {
        setForm(f => {
            const updated = [...f.witnesses];
            updated[idx][field] = value;
            return { ...f, witnesses: updated };
        });
    };
    const handleEvidenceChange = (idx, value) => {
        setForm(f => {
            const updated = [...f.evidences];
            updated[idx] = value;
            return { ...f, evidences: updated };
        });
    };

    // Submit handler with blockchain integration
    const handleSubmit = async (e, draft = false) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        // Debug wallet connection
        console.log('=== WALLET DEBUG ===');
        console.log('connected:', isConnected);
        console.log('account:', account);
        console.log('account.address:', account?.address);
        console.log('signAndSubmitTransaction:', typeof signAndSubmitTransaction);
        console.log('===================');

        // Clear previous blockchain status when starting a new submission
        setBlockchainStatus({
            isOnBlockchain: false,
            isVerified: false,
            reportHash: null,
            transactionHash: null,
            verificationStatus: 'pending',
            isSimulated: false
        });

        try {
            // Generate report ID and hash
            const reportId = generateReportId();
            const reportHash = createReportHash(form);
            const proofOfExistence = createProofOfExistence(form);

            // Prepare payload for backend
            const payload = {
                reportId,
                ...form,
                status: draft ? 'DRAFT' : 'PENDING',
                involvedPersons: form.involvedPersons.map(p => ({
                    nameHash: hashSensitiveData(p.name),
                    role: p.role,
                    additionalDetailsHash: hashSensitiveData(p.additionalDetails)
                })),
                witnesses: form.witnesses.map(w => ({
                    nameHash: hashSensitiveData(w.name),
                    contactInfoHash: hashSensitiveData(w.contactInfo),
                    isAnonymous: w.isAnonymous
                })),
                evidences: form.evidences.map(hashSensitiveData),
                reportHash,
                proofOfExistence
            };

            // Submit to backend first
            const backendRes = await fetch('https://careful-vikky-koyebdeployacc1-6fac48b5.koyeb.app/api/ragging-reports', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!backendRes.ok) {
                throw new Error('Failed to submit to backend');
            }

            const backendData = await backendRes.json();

            // Store the report ID from backend response for future status updates
            if (backendData.id || backendData.reportId) {
                setForm(prev => ({ ...prev, reportId: backendData.id || backendData.reportId }));
            }

            // If wallet is connected, submit to blockchain
            let blockchainResult = null;
            if (isConnected && account && !draft) {
                try {
                    console.log('Submitting to blockchain...', { isConnected, account: account?.address });
                    blockchainResult = await submitReportToBlockchain(form, { signAndSubmitTransaction });
                    console.log('Blockchain result:', blockchainResult);
                    
                    setBlockchainStatus({
                        isOnBlockchain: true,
                        isVerified: false,
                        reportHash: reportHash,
                        transactionHash: blockchainResult.transactionHash,
                        verificationStatus: 'pending',
                        isSimulated: blockchainResult.isSimulated || false
                    });
                    
                    console.log('Blockchain status updated:', {
                        isOnBlockchain: true,
                        transactionHash: blockchainResult.transactionHash,
                        isSimulated: blockchainResult.isSimulated
                    });
                } catch (blockchainError) {
                    console.error('Blockchain submission failed:', blockchainError);
                    // Continue with backend submission even if blockchain fails
                }
            } else {
                console.log('Wallet not connected or draft mode:', { isConnected, account: account?.address, draft });
                if (!isConnected) {
                    setMessage({ 
                        type: 'warning', 
                        text: `Report submitted to backend successfully! To submit to blockchain for enhanced security, please connect your wallet first.` 
                    });
                }
            }

            setMessage({ 
                type: 'success', 
                text: `Report ${draft ? 'saved as draft' : 'submitted'}! ID: ${reportId}${blockchainResult ? (blockchainResult.isSimulated ? ' | Blockchain simulation completed' : ' | Blockchain TX: ' + blockchainResult.transactionHash.substring(0, 10) + '...') : ''}` 
            });

            // Reset form
            setForm({
                dateOfIncident: '',
                timeOfIncident: '',
                location: '',
                severityLevel: 'Low',
                description: '',
                reportAsSelf: false,
                status: 'PENDING',
                reportId: reportId,
                involvedPersons: [{ ...initialPerson }],
                witnesses: [{ ...initialWitness }],
                evidences: ['']
            });

        } catch (err) {
            setMessage({ type: 'error', text: 'Network error: ' + err.message });
        } finally {
            setSubmitting(false);
        }
    };

    // Verify transaction on blockchain
    const handleVerifyTransaction = async () => {
        if (!blockchainStatus.transactionHash) return;
        
        setVerifying(true);
        try {
            const result = await verifyTransaction(blockchainStatus.transactionHash);
            setTransactionDetails(result);
            
            if (result.success) {
                setBlockchainStatus(prev => ({
                    ...prev,
                    isVerified: true,
                    verificationStatus: 'verified'
                }));
                setMessage({ 
                    type: 'success', 
                    text: `Transaction verified! Status: ${result.status}` 
                });
            } else {
                setMessage({ 
                    type: 'error', 
                    text: `Transaction verification failed: ${result.error}` 
                });
            }
        } catch (error) {
            setMessage({ 
                type: 'error', 
                text: `Verification error: ${error.message}` 
            });
        } finally {
            setVerifying(false);
        }
    };

    // Update report status
    const handleUpdateStatus = async (newStatus) => {
        setUpdatingStatus(true);
        setStatusUpdateMessage(null);
        
        try {
            // Use the report ID from form state
            const reportId = form.reportId;
            
            if (!reportId) {
                setStatusUpdateMessage({ 
                    type: 'error', 
                    text: 'Report ID not found. Please submit the report first.' 
                });
                return;
            }
            
            const response = await fetch(`https://careful-vikky-koyebdeployacc1-6fac48b5.koyeb.app/api/ragging-reports/${reportId}/status?newStatus=${encodeURIComponent(newStatus)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                setStatusUpdateMessage({ 
                    type: 'success', 
                    text: `Status updated successfully to ${newStatus}` 
                });
                // Update the form status
                setForm(prev => ({ ...prev, status: newStatus }));
            } else {
                setStatusUpdateMessage({ 
                    type: 'error', 
                    text: data.message || 'Failed to update status' 
                });
            }
        } catch (error) {
            setStatusUpdateMessage({ 
                type: 'error', 
                text: `Network error: ${error.message}` 
            });
        } finally {
            setUpdatingStatus(false);
        }
    };

    return (
        <div className="max-w-[90rem] mx-auto w-full py-8 px-2 md:px-8">
            {/* Modern Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-6">
                <ol className="flex items-center space-x-2 text-sm">
                    <li>
                        <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition font-medium">
                            <HomeIcon className="w-4 h-4 text-gray-400" />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li><span className="text-gray-400">/</span></li>
                    <li>
                        <Link to="/ragging" className="text-gray-500 hover:text-gray-700 transition font-medium">Ragging</Link>
                    </li>
                    <li><span className="text-gray-400">/</span></li>
                    <li className="text-gray-700 font-semibold">Report Incident</li>
                </ol>
            </nav>

            <div className="flex items-center gap-3 mb-2">
                <ExclamationTriangleIcon className="w-7 h-7 text-red-500" />
                <h1 className="text-2xl font-bold text-gray-900 font-poppins">Report Ragging Incident</h1>
            </div>
            <p className="mb-6 text-gray-600 max-w-2xl">Your safety is our priority. All reports are handled with strict confidentiality and appropriate action will be taken. You can choose to remain anonymous if you prefer.</p>

            {/* Blockchain Security Badge */}
            <BlockchainSecurityBadge 
                isVerified={blockchainStatus.isVerified}
                isOnBlockchain={blockchainStatus.isOnBlockchain}
                reportHash={blockchainStatus.reportHash}
                transactionHash={blockchainStatus.transactionHash}
                verificationStatus={blockchainStatus.verificationStatus}
                showDetails={true}
                isSimulated={blockchainStatus.isSimulated}
            />

            {/* Transaction Verification Section */}
            {blockchainStatus.transactionHash && (
                <div className={`bg-gradient-to-r ${blockchainStatus.isSimulated ? 'from-blue-50 to-purple-50 border-blue-200' : 'from-green-50 to-blue-50 border-green-200'} border rounded-xl p-6 mb-6`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <ShieldCheckIcon className={`w-6 h-6 ${blockchainStatus.isSimulated ? 'text-blue-600' : 'text-green-600'}`} />
                            <div>
                                <h3 className={`font-semibold ${blockchainStatus.isSimulated ? 'text-blue-900' : 'text-green-900'}`}>
                                    {blockchainStatus.isSimulated ? 'Simulation Complete' : 'Transaction Verification'}
                                </h3>
                                <p className={`text-sm ${blockchainStatus.isSimulated ? 'text-blue-700' : 'text-green-700'}`}>
                                    {blockchainStatus.isSimulated ? 'Report submitted (simulated for testing)' : 'Verify your transaction on the blockchain'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {!blockchainStatus.isSimulated && (
                                <button
                                    onClick={handleVerifyTransaction}
                                    disabled={verifying}
                                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-lg px-4 py-2 shadow"
                                >
                                    {verifying ? (
                                        <>
                                            <ArrowPathIcon className="w-4 h-4 animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        <>
                                            <ShieldCheckIcon className="w-4 h-4" />
                                            Verify Transaction
                                        </>
                                    )}
                                </button>
                            )}
                            {blockchainStatus.isSimulated ? (
                                <div className="flex items-center gap-2 bg-blue-600 text-white font-medium rounded-lg px-4 py-2">
                                    <CheckCircleIcon className="w-4 h-4" />
                                    Simulation Complete
                                </div>
                            ) : (
                                <a
                                    href={getTransactionUrl(blockchainStatus.transactionHash)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 shadow"
                                >
                                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                                    View on Explorer
                                </a>
                            )}
                        </div>
                    </div>
                    
                    {/* Transaction Details */}
                    {transactionDetails && !blockchainStatus.isSimulated && (
                        <div className="bg-white rounded-lg p-4 border border-green-200">
                            <h4 className="font-semibold text-green-900 mb-2">Transaction Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium text-gray-600">Status:</span>
                                    <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                                        transactionDetails.status === 'success' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {transactionDetails.status}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600">Gas Used:</span>
                                    <span className="ml-2 font-mono">{transactionDetails.gasUsed || 'N/A'}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600">Timestamp:</span>
                                    <span className="ml-2">{transactionDetails.timestamp ? new Date(transactionDetails.timestamp).toLocaleString() : 'N/A'}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600">Transaction Hash:</span>
                                    <span className="ml-2 font-mono text-xs break-all">{blockchainStatus.transactionHash}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Simulation Details */}
                    {blockchainStatus.isSimulated && (
                        <div className="bg-white rounded-lg p-4 border border-blue-200">
                            <h4 className="font-semibold text-blue-900 mb-2">Simulation Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium text-gray-600">Status:</span>
                                    <span className="ml-2 px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                        Simulated
                                    </span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600">Report Hash:</span>
                                    <span className="ml-2 font-mono text-xs break-all">{blockchainStatus.reportHash}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600">Mock Transaction Hash:</span>
                                    <span className="ml-2 font-mono text-xs break-all">{blockchainStatus.transactionHash}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600">Note:</span>
                                    <span className="ml-2 text-blue-600">Smart contract deployment pending</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Wallet Connection Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <WalletIcon className="w-6 h-6 text-blue-600" />
                        <div>
                            <h3 className="font-semibold text-blue-900">Blockchain Security</h3>
                            <p className="text-sm text-blue-700">Connect your wallet for enhanced security and immutability</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {isConnected ? (
                            <div className="flex items-center gap-2">
                                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-medium text-green-700">Connected</span>
                                <span className="text-xs text-gray-500 font-mono">
                                    {account?.address ? 
                                        `${account.address.substring(0, 6)}...${account.address.substring(-4)}` : 
                                        'Wallet'
                                    }
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
                                <span className="text-sm text-yellow-700">Wallet not connected</span>
                            </div>
                        )}
                        <WalletSelector />
                    </div>
                </div>
                
                {/* Debug wallet connection status */}
                <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="text-xs text-gray-600">
                        <strong>Debug Info:</strong> connected={isConnected.toString()}, account={account ? 'defined' : 'undefined'}, address={account?.address || 'none'}
                    </div>
                </div>
                
                {isConnected && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-green-700">
                            <LockClosedIcon className="w-4 h-4" />
                            <span>Your report will be securely stored on the Aptos blockchain for immutability and transparency.</span>
                        </div>
                    </div>
                )}
            </div>

            {message && (
                <div className={`mb-4 px-4 py-3 rounded-lg ${
                    message.type === 'success' ? 'bg-green-100 text-green-800' : 
                    message.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }`}>
                    {message.text}
                </div>
            )}

            {/* Status Update Section */}
            {form.reportId && (
                <div className="bg-white rounded-2xl shadow p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900">Report Status</h3>
                            <p className="text-sm text-gray-600">Report ID: <span className="font-mono text-xs">{form.reportId}</span></p>
                            <p className="text-sm text-gray-600">Current status: <span className="font-medium">{form.status}</span></p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                form.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                form.status === 'UNDER_INVESTIGATION' ? 'bg-orange-100 text-orange-800' :
                                form.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                                form.status === 'DRAFT' ? 'bg-gray-100 text-gray-800' :
                                'bg-blue-100 text-blue-800'
                            }`}>
                                {form.status}
                            </span>
                        </div>
                    </div>
                    
                    {statusUpdateMessage && (
                        <div className={`mb-4 px-4 py-3 rounded-lg ${
                            statusUpdateMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                            {statusUpdateMessage.text}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => handleUpdateStatus('PENDING')}
                            disabled={updatingStatus || form.status === 'PENDING'}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                form.status === 'PENDING' 
                                    ? 'bg-yellow-100 text-yellow-800 cursor-not-allowed' 
                                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                            }`}
                        >
                            {updatingStatus ? 'Updating...' : 'Set to Pending'}
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => handleUpdateStatus('UNDER_INVESTIGATION')}
                            disabled={updatingStatus || form.status === 'UNDER_INVESTIGATION'}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                form.status === 'UNDER_INVESTIGATION' 
                                    ? 'bg-orange-100 text-orange-800 cursor-not-allowed' 
                                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                            }`}
                        >
                            {updatingStatus ? 'Updating...' : 'Set to Under Investigation'}
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => handleUpdateStatus('RESOLVED')}
                            disabled={updatingStatus || form.status === 'RESOLVED'}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                form.status === 'RESOLVED' 
                                    ? 'bg-green-100 text-green-800 cursor-not-allowed' 
                                    : 'bg-green-500 hover:bg-green-600 text-white'
                            }`}
                        >
                            {updatingStatus ? 'Updating...' : 'Set to Resolved'}
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => handleUpdateStatus('DRAFT')}
                            disabled={updatingStatus || form.status === 'DRAFT'}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                form.status === 'DRAFT' 
                                    ? 'bg-gray-100 text-gray-800 cursor-not-allowed' 
                                    : 'bg-gray-500 hover:bg-gray-600 text-white'
                            }`}
                        >
                            {updatingStatus ? 'Updating...' : 'Set to Draft'}
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={e => handleSubmit(e, false)}>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Main Form */}
                    <div className="lg:col-span-3 space-y-6 w-full">
                        {/* Incident Details */}
                        <div className="bg-white rounded-2xl shadow p-6 mb-2">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-semibold text-lg text-gray-900">Incident Details</h2>
                                <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer select-none">
                                    <span className="mr-2">Report as Yourself</span>
                                    <button
                                        type="button"
                                        aria-pressed={form.reportAsSelf}
                                        onClick={() => setForm(f => ({ ...f, reportAsSelf: !f.reportAsSelf }))}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none
                    ${form.reportAsSelf ? 'bg-blue-500' : 'bg-gray-300'}`}
                                    >
                                        <span
                                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200
                      ${form.reportAsSelf ? 'translate-x-5' : 'translate-x-1'}`}
                                        />
                                    </button>
                                </label>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date of Incident</label>
                                    <div className="border border-gray-200 rounded-lg p-2">
                                        <input type="date" name="dateOfIncident" value={form.dateOfIncident} onChange={handleChange} className="w-full rounded-lg border-none focus:outline-none focus:ring-0 focus:border-gray-200" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Time of Incident</label>
                                    <div className="border border-gray-200 rounded-lg p-2">
                                        <input type="time" name="timeOfIncident" value={form.timeOfIncident} onChange={handleChange} className="w-full rounded-lg border-none focus:outline-none focus:ring-0 focus:border-gray-200" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Location</label>
                                    <div className="border border-gray-200 rounded-lg p-2">
                                        <select name="location" value={form.location} onChange={handleChange} className="w-full rounded-lg border-none focus:outline-none focus:ring-0 focus:border-gray-200">
                                            <option value="">Select location</option>
                                            <option>Hostel</option>
                                            <option>Classroom</option>
                                            <option>Cafeteria</option>
                                            <option>Sports Ground</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Severity Level</label>
                                    <div className='mt-3'>
                                        <div className="flex gap-3 mt-1">
                                            {['Low', 'Medium', 'High'].map(level => (
                                                <label key={level} className={`flex items-center gap-2 px-4 py-1 rounded-full border text-sm font-medium cursor-pointer transition
                        ${form.severityLevel === level
                                                        ? level === 'Low'
                                                            ? 'bg-yellow-100 border-yellow-400 text-yellow-700'
                                                            : level === 'Medium'
                                                                ? 'bg-orange-100 border-orange-400 text-orange-700'
                                                                : 'bg-red-100 border-red-400 text-red-700'
                                                        : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="severityLevel"
                                                        value={level}
                                                        checked={form.severityLevel === level}
                                                        onChange={handleChange}
                                                        className={
                                                            level === 'Low' ? 'accent-yellow-400' :
                                                                level === 'Medium' ? 'accent-orange-400' :
                                                                    'accent-red-500'
                                                        }
                                                    />
                                                    {level}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description of the Incident</label>
                                <div className="border border-gray-200 rounded-lg p-2">
                                    <textarea name="description" value={form.description} onChange={handleChange} className="w-full rounded-lg border-none focus:outline-none focus:ring-0 focus:border-gray-200 min-h-[80px]" maxLength={2000} placeholder="Please provide a detailed description of what happened. Include any relevant context that might help us understand the situation better." />
                                    <div className="text-xs text-gray-400 text-right mt-1">{form.description.length}/2000</div>
                                </div>
                            </div>
                        </div>

                        {/* Involved Persons */}
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h2 className="font-semibold text-lg text-gray-900 mb-4">Involved Persons</h2>
                            {form.involvedPersons.map((person, idx) => (
                                <div key={idx} className="mb-6 bg-gray-50 rounded-xl p-4">
                                    <div className="font-semibold text-gray-700 mb-2">Person {idx + 1}</div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Name (if known)</label>
                                            <div className="border border-gray-200 rounded-lg p-2">
                                                <input className="w-full rounded-lg border-none focus:outline-none focus:ring-0 focus:border-gray-200" placeholder="Enter name" value={person.name} onChange={e => handlePersonChange(idx, 'name', e.target.value)} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Role</label>
                                            <div className="border border-gray-200 rounded-lg p-2">
                                                <select className="w-full rounded-lg border-none focus:outline-none focus:ring-0 focus:border-gray-200" value={person.role} onChange={e => handlePersonChange(idx, 'role', e.target.value)}>
                                                    <option value="">Select role</option>
                                                    {roles.map(role => <option key={role}>{role}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium mb-1">Additional Details</label>
                                        <div className="border border-gray-200 rounded-lg p-2">
                                            <textarea className="w-full rounded-lg border-none focus:outline-none focus:ring-0 focus:border-gray-200 min-h-[38px]" placeholder="Any additional info (e.g., department, year, identifying characteristics)" value={person.additionalDetails} onChange={e => handlePersonChange(idx, 'additionalDetails', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={addPerson} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg px-4 py-2 mt-2 mb-2 shadow">
                                <PlusIcon className="w-5 h-5" /> Add Another Person
                            </button>
                        </div>

                        {/* Witnesses */}
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h2 className="font-semibold text-lg text-gray-900 mb-4">Witnesses (if any)</h2>
                            {form.witnesses.map((w, idx) => (
                                <div key={idx} className="mb-6 bg-gray-50 rounded-xl p-4">
                                    <div className="font-semibold text-gray-700 mb-2">Witness {idx + 1}</div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Name</label>
                                            <div className="border border-gray-200 rounded-lg p-2">
                                                <input className="w-full rounded-lg border-none focus:outline-none focus:ring-0 focus:border-gray-200" placeholder="Enter name" value={w.name} onChange={e => handleWitnessChange(idx, 'name', e.target.value)} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Contact Information (optional)</label>
                                            <div className="border border-gray-200 rounded-lg p-2">
                                                <input className="w-full rounded-lg border-none focus:outline-none focus:ring-0 focus:border-gray-200" placeholder="Email or phone number" value={w.contactInfo} onChange={e => handleWitnessChange(idx, 'contactInfo', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            type="button"
                                            aria-pressed={w.isAnonymous}
                                            onClick={() => handleWitnessChange(idx, 'isAnonymous', !w.isAnonymous)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none
                      ${w.isAnonymous ? 'bg-blue-500' : 'bg-gray-300'}`}
                                        >
                                            <span
                                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200
                        ${w.isAnonymous ? 'translate-x-5' : 'translate-x-1'}`}
                                            />
                                        </button>
                                        <span className="text-sm text-gray-500">Keep this witness anonymous in the report</span>
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={addWitness} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg px-4 py-2 mt-2 mb-2 shadow">
                                <PlusIcon className="w-5 h-5" /> Add Another Witness
                            </button>
                        </div>

                        {/* Evidence Upload */}
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h2 className="font-semibold text-lg text-gray-900 mb-4">Evidence Upload</h2>
                            <p className="text-gray-500 text-sm mb-3">Paste links to any evidence you have (e.g., Google Drive links to photos, videos, audio, PDFs, etc.)</p>
                            {form.evidences.map((url, idx) => (
                                <div key={idx} className="mb-3 flex gap-2 items-center">
                                    <input
                                        type="url"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Paste evidence URL here (e.g., Google Drive link)"
                                        value={url}
                                        onChange={e => handleEvidenceChange(idx, e.target.value)}
                                    />
                                </div>
                            ))}
                            <button type="button" onClick={addEvidence} className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2">
                                <PlusIcon className="w-5 h-5" /> Add Another Evidence Link
                            </button>
                        </div>

                        {/* Submit/Save */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-8 py-3 shadow" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Report'}</button>
                            <button type="button" className="bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg px-8 py-3 shadow" onClick={e => handleSubmit(e, true)} disabled={submitting}>{submitting ? 'Saving...' : 'Save as Draft'}</button>
                        </div>

                        {/* Important Reminder */}
                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg px-4 py-3 mt-4 flex items-start gap-2">
                            <InformationCircleIcon className="w-8 h-8 mt-0.5 text-yellow-500" />
                            <span>Filing a false report is a serious offense and may result in disciplinary action. Please ensure all information provided is accurate to the best of your knowledge.</span>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-2 space-y-6 w-full max-w-none">
                        <div className="bg-blue-50  border-l-4 border-l-blue-500 rounded-xl shadow p-5">
                            <h3 className="font-bold text-base text-blue-700 mb-2">Confidentiality Guarantee</h3>
                            <p className="text-sm text-blue-700 mb-2">All information provided in this report will be handled with strict confidentiality. Your identity will be protected unless you choose to disclose it.</p>
                            <p className="text-sm text-blue-700">Only authorized personnel from the Anti-Ragging Committee will have access to this information.</p>
                        </div>

                        <div className="bg-purple-50 border-l-4 border-l-purple-500 rounded-xl shadow p-5">
                            <h3 className="font-bold text-base text-purple-700 mb-2 flex items-center gap-2">
                                <ShieldCheckIcon className="w-5 h-5" />
                                Blockchain Security
                            </h3>
                            <p className="text-sm text-purple-700 mb-2">Your report is secured using Aptos blockchain technology for:</p>
                            <ul className="text-sm text-purple-700 space-y-1 pl-4">
                                <li>• Immutable record keeping</li>
                                <li>• Tamper-proof evidence</li>
                                <li>• Transparent audit trail</li>
                                <li>• Enhanced privacy protection</li>
                            </ul>
                        </div>

                        <div className="bg-white border-2 border-gray-200 rounded-xl shadow p-5">
                            <h3 className="font-bold text-base text-gray-900 mb-2">What Happens Next?</h3>
                            <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2 pl-2">
                                <li className="flex items-start gap-2"><span className="flex aspect-square h-6 rounded-full bg-purple-600 text-white text-xs font-medium items-center justify-center mt-1">
                                    1
                                </span>
                                    Your report will be reviewed by the Anti-Ragging Committee within 24 hours.</li>
                                <li className="flex items-start gap-2"><span className="flex aspect-square h-6 rounded-full bg-purple-600 text-white text-xs font-medium items-center justify-center mt-1">
                                    2
                                </span>
                                    If additional information is needed, you will be contacted through your preferred method.</li>
                                <li className="flex items-start gap-2"><span className="flex aspect-square h-6 rounded-full bg-purple-600 text-white text-xs font-medium items-center justify-center mt-1">
                                    3
                                </span>
                                    Appropriate action will be taken based on the severity and evidence provided.</li>
                                <li className="flex items-start gap-2"><span className="flex aspect-square h-6 rounded-full bg-purple-600 text-white text-xs font-medium items-center justify-center mt-1">
                                    4
                                </span>
                                    You will receive updates on the status of your report through the platform.</li>
                            </ol>
                        </div>

                        <div className="bg-red-50 border-l-4 border-l-red-500 rounded-xl shadow p-5">
                            <h3 className="font-bold text-base text-red-700 mb-2">Emergency Contacts</h3>
                            <ul className="text-sm text-red-700 space-y-2 pl-1">
                                <li className="flex items-center gap-2"><PhoneIcon className="w-4 h-4" /> <span>Anti-Ragging Helpline <span className="font-semibold"><br />1800-180-5522</span></span></li>
                                <li className="flex items-center gap-2"><PhoneIcon className="w-4 h-4" /> <span>Campus Security <span className="font-semibold"><br />+91 98765 43210</span></span></li>
                                <li className="flex items-center gap-2"><UserIcon className="w-4 h-4" /> <span>Student Counselor <span className="font-semibold"><br />counselor@campus.edu</span></span></li>
                            </ul>
                        </div>

                        <div className="bg-white border-2 border-gray-200 rounded-xl shadow p-5">
                            <h3 className="font-bold text-base text-gray-900 mb-2">Helpful Resources</h3>
                            <ul className="text-sm space-y-2 pl-1">
                                <li><a href="#" className="hover:underline flex items-center text-purple-700"><DocumentTextIcon className="w-4 h-4 mr-1" /> Anti-Ragging Policy</a></li>
                                <li><a href="#" className="hover:underline flex items-center text-purple-700"><AcademicCapIcon className="w-4 h-4 mr-1" /> UGC Regulations on Ragging</a></li>
                                <li><a href="#" className="hover:underline flex items-center text-purple-700"><PaperClipIcon className="w-4 h-4 mr-1" /> Video: How to Document Evidence</a></li>
                                <li><a href="#" className="hover:underline flex items-center text-purple-700"><InformationCircleIcon className="w-4 h-4 mr-1" /> Frequently Asked Questions</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export function RaggingHistoryPage() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusMessage, setStatusMessage] = useState(null);
    const [selectedReport, setSelectedReport] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(1);
    const reportsPerPage = 5;
    const totalPages = Math.ceil(reports.length / reportsPerPage);
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [openMenu, setOpenMenu] = useState(null);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [statusUpdateMessage, setStatusUpdateMessage] = useState(null);

    const statusColors = {
        'Draft': 'bg-gray-100 text-gray-700',
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Under Investigation': 'bg-orange-100 text-orange-800',
        'Resolved': 'bg-green-100 text-green-700',
    };
    const severityColors = {
        'Low': 'bg-blue-100 text-blue-700',
        'Medium': 'bg-yellow-100 text-yellow-800',
        'High': 'bg-red-100 text-red-700',
    };

    // Fetch reports from backend
    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch('https://careful-vikky-koyebdeployacc1-6fac48b5.koyeb.app/api/ragging-reports')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch reports');
                return res.json();
            })
            .then(data => {
                // Map backend data to frontend format if needed
                setReports(Array.isArray(data) ? data.map(r => ({
                    ...r,
                    id: r.id || r.reportId || '',
                    submitted: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '',
                    incident: r.dateOfIncident || '',
                    location: r.location || '',
                    severity: r.severityLevel || '',
                    status: r.status || '',
                })) : []);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const sortedReports = [...reports].sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];
        if (sortBy === 'submitted' || sortBy === 'incident') {
            valA = new Date(valA);
            valB = new Date(valB);
        }
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });
    const paginatedReports = sortedReports.slice((page - 1) * reportsPerPage, page * reportsPerPage);

    const getReportDetails = (report) => ({
        ...report,
        description: report.description || 'No description provided.',
        persons: report.persons || [{ name: 'Person 1' }, { name: 'Person 2' }, { name: 'Person 3' }],
        witnesses: report.witnesses || [{ name: 'Witness 1' }],
    });

    const handleView = (report) => {
        setSelectedReport(getReportDetails(report));
        setShowModal(true);
    };
    const handleClose = () => {
        setShowModal(false);
        setSelectedReport(null);
    };

    const handlePrev = () => setPage((p) => Math.max(1, p - 1));
    const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

    useEffect(() => {
        const handleClick = (e) => {
            if (!e.target.closest('.relative.inline-block.text-left')) setOpenMenu(null);
        };
        if (openMenu !== null) document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [openMenu]);

    // PUT: Update report status
    const updateReportStatus = async (id, newStatus) => {
        setUpdatingStatus(true);
        setStatusMessage(null);
        setStatusUpdateMessage(null);
        
        try {
            const res = await fetch(`https://careful-vikky-koyebdeployacc1-6fac48b5.koyeb.app/api/ragging-reports/${id}/status?newStatus=${encodeURIComponent(newStatus)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (res.ok) {
                setStatusMessage({ type: 'success', text: `Status updated successfully to ${newStatus}.` });
                setStatusUpdateMessage({ type: 'success', text: `Status updated to ${newStatus}` });
                // Refresh reports
                setReports(reports => reports.map(r => r.id === id ? { ...r, status: newStatus } : r));
            } else {
                setStatusMessage({ type: 'error', text: data.message || 'Failed to update status.' });
                setStatusUpdateMessage({ type: 'error', text: data.message || 'Failed to update status.' });
            }
        } catch (err) {
            setStatusMessage({ type: 'error', text: 'Network error: ' + err.message });
            setStatusUpdateMessage({ type: 'error', text: 'Network error: ' + err.message });
        } finally {
            setUpdatingStatus(false);
        }
    };

    const statusMessages = {
        'Resolved': 'This case has been investigated and appropriate action has been taken. Thank you for your report.',
        'Under Investigation': 'Your report is under investigation. The committee will update you with the outcome.',
        'Pending': 'Your report has been submitted and is awaiting review by the committee.',
        'Draft': 'This report is currently a draft. Please complete and submit when ready.',
    };
    const statusColor = {
        'Resolved': 'bg-green-50 border-green-200 text-green-800',
        'Under Investigation': 'bg-orange-50 border-orange-200 text-orange-800',
        'Pending': 'bg-yellow-50 border-yellow-200 text-yellow-800',
        'Draft': 'bg-gray-50 border-gray-200 text-gray-800',
    };

    return (
        <div className="max-w-[90rem] mx-auto w-full py-8 px-2 md:px-8">
            {loading && <div className="mb-4 text-gray-500">Loading reports...</div>}
            {error && <div className="mb-4 text-red-600">{error}</div>}
            {statusMessage && <div className={`mb-4 px-4 py-3 rounded-lg ${statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{statusMessage.text}</div>}
            {/* Modern Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-6">
                <ol className="flex items-center space-x-2 text-sm">
                    <li>
                        <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition font-medium">
                            <HomeIcon className="w-4 h-4 text-gray-400" />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li><span className="text-gray-400">/</span></li>
                    <li>
                        <Link to="/ragging" className="text-gray-500 hover:text-gray-700 transition font-medium">Ragging</Link>
                    </li>
                    <li><span className="text-gray-400">/</span></li>
                    <li className="text-gray-700 font-semibold">Report History</li>
                </ol>
            </nav>
            {/* <button className="mb-4 flex items-center gap-2 text-sm text-gray-500 hover:underline">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Back to Dashboard
            </button> */}
            <div className="flex items-center gap-3 mb-2">
                <DocumentTextIcon className="w-7 h-7 text-purple-500" />
                <h1 className="text-2xl font-bold text-gray-900 font-poppins">Report History</h1>
            </div>
            <p className="mb-6 text-gray-600 max-w-2xl">View and manage all your previously submitted ragging incident reports. Track their status and access detailed information about each case.</p>
            {/* Filters */}
            <div className="bg-white rounded-2xl shadow p-6 mb-6 flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="font-bold text-lg text-gray-900">Filters</h2>
                    <button className="text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50">Clear All Filters</button>
                </div>
                <div className="flex flex-wrap gap-4 items-end">
                    <div>
                        <label className="block text-xs font-medium mb-1 text-gray-500">From Date</label>
                        <div className="relative">
                            <input type="date" className="w-44 rounded-lg border border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200 pl-10" />
                            <CalendarIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1 text-gray-500">To Date</label>
                        <div className="relative">
                            <input type="date" className="w-44 rounded-lg border border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200 pl-10" />
                            <CalendarIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1 text-gray-500">Status</label>
                        <select className="w-44 rounded-lg border border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200">
                            <option>All Statuses</option>
                            <option>Draft</option>
                            <option>Pending</option>
                            <option>Under Investigation</option>
                            <option>Resolved</option>
                        </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs font-medium mb-1 text-gray-500">Search</label>
                        <div className="relative">
                            <input type="text" className="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200 pl-10" placeholder="Search by ID, location, or description" />
                            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>
            {/* Reports Table */}
            <div className="bg-white rounded-2xl shadow p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-lg text-gray-900">Your Reports</h2>
                    <Link to="/ragging" className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg px-4 py-2 shadow">
                        <ExclamationCircleIcon className="w-5 h-5" /> Report New Incident
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead>
                            <tr className="text-gray-500 border-b">
                                <th className="py-2 px-3 font-medium cursor-pointer select-none" onClick={() => handleSort('id')}>
                                    ID
                                    <FontAwesomeIcon icon={faSort} className={`ml-1 text-gray-400 ${sortBy === 'id' ? 'text-purple-600' : ''}`} style={{ transform: sortBy === 'id' && sortOrder === 'desc' ? 'rotate(180deg)' : undefined }} />
                                </th>
                                <th className="py-2 px-3 font-medium cursor-pointer select-none" onClick={() => handleSort('submitted')}>
                                    Date Submitted
                                    <FontAwesomeIcon icon={faSort} className={`ml-1 text-gray-400 ${sortBy === 'submitted' ? 'text-purple-600' : ''}`} style={{ transform: sortBy === 'submitted' && sortOrder === 'desc' ? 'rotate(180deg)' : undefined }} />
                                </th>
                                <th className="py-2 px-3 font-medium cursor-pointer select-none" onClick={() => handleSort('incident')}>
                                    Incident Date
                                    <FontAwesomeIcon icon={faSort} className={`ml-1 text-gray-400 ${sortBy === 'incident' ? 'text-purple-600' : ''}`} style={{ transform: sortBy === 'incident' && sortOrder === 'desc' ? 'rotate(180deg)' : undefined }} />
                                </th>
                                <th className="py-2 px-3 font-medium cursor-pointer select-none" onClick={() => handleSort('location')}>
                                    Location
                                    <FontAwesomeIcon icon={faSort} className={`ml-1 text-gray-400 ${sortBy === 'location' ? 'text-purple-600' : ''}`} style={{ transform: sortBy === 'location' && sortOrder === 'desc' ? 'rotate(180deg)' : undefined }} />
                                </th>
                                <th className="py-2 px-3 font-medium cursor-pointer select-none" onClick={() => handleSort('severity')}>
                                    Severity
                                    <FontAwesomeIcon icon={faSort} className={`ml-1 text-gray-400 ${sortBy === 'severity' ? 'text-purple-600' : ''}`} style={{ transform: sortBy === 'severity' && sortOrder === 'desc' ? 'rotate(180deg)' : undefined }} />
                                </th>
                                <th className="py-2 px-3 font-medium cursor-pointer select-none" onClick={() => handleSort('status')}>
                                    Status
                                    <FontAwesomeIcon icon={faSort} className={`ml-1 text-gray-400 ${sortBy === 'status' ? 'text-purple-600' : ''}`} style={{ transform: sortBy === 'status' && sortOrder === 'desc' ? 'rotate(180deg)' : undefined }} />
                                </th>
                                <th className="py-2 px-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedReports.map((r) => (
                                <tr
                                    key={r.id}
                                    className="border-b last:border-0 cursor-pointer hover:bg-gray-50 transition"
                                    onClick={() => handleView(r)}
                                >
                                    <td className="py-2 px-3 font-mono text-xs md:text-base">{r.id}</td>
                                    <td className="py-2 px-3 md:text-base">{r.submitted}</td>
                                    <td className="py-2 px-3 md:text-base">{r.incident}</td>
                                    <td className="py-2 px-3 md:text-base">{r.location}</td>
                                    <td className="py-2 px-3 md:text-base">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${severityColors[r.severity]}`}>{r.severity}</span>
                                    </td>
                                    <td className="py-2 px-3 md:text-base">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[r.status]}`}>{r.status}</span>
                                    </td>
                                    <td className="py-2 px-3 flex items-center gap-2 md:text-base" onClick={e => e.stopPropagation()}>
                                        <button className="hover:text-purple-600" onClick={() => handleView(r)}><EyeIcon className="w-5 h-5" /></button>
                                        <Menu as="div" className="relative inline-block text-left">
                                            <Menu.Button onClick={() => setOpenMenu(openMenu === r.id ? null : r.id)}>
                                                <EllipsisHorizontalIcon className="w-5 h-5 hover:text-gray-600" />
                                            </Menu.Button>
                                            <Transition
                                                show={openMenu === r.id}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items static className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="py-1">
                                                        <Menu.Item>
                                                            {() => (
                                                                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700">
                                                                    <ArrowDownTrayIcon className="w-5 h-5 mr-2" /> Download PDF
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {() => (
                                                                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700">
                                                                    <DocumentArrowUpIcon className="w-5 h-5 mr-2" /> Report Request
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        
                                                        {/* Status Update Section */}
                                                        <div className="border-t border-gray-100 my-1"></div>
                                                        <div className="px-3 py-1 text-xs font-medium text-gray-500">Update Status</div>
                                                        
                                                        <Menu.Item>
                                                            {() => (
                                                                <button 
                                                                    className={`flex items-center w-full px-4 py-2 text-sm ${r.status === 'PENDING' ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                                                                    onClick={() => r.status !== 'PENDING' && updateReportStatus(r.id, 'PENDING')}
                                                                    disabled={r.status === 'PENDING' || updatingStatus}
                                                                >
                                                                    <ArrowPathIcon className="w-5 h-5 mr-2" /> 
                                                                    {updatingStatus ? 'Updating...' : 'Set to Pending'}
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        
                                                        <Menu.Item>
                                                            {() => (
                                                                <button 
                                                                    className={`flex items-center w-full px-4 py-2 text-sm ${r.status === 'UNDER_INVESTIGATION' ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                                                                    onClick={() => r.status !== 'UNDER_INVESTIGATION' && updateReportStatus(r.id, 'UNDER_INVESTIGATION')}
                                                                    disabled={r.status === 'UNDER_INVESTIGATION' || updatingStatus}
                                                                >
                                                                    <ArrowPathIcon className="w-5 h-5 mr-2" /> 
                                                                    {updatingStatus ? 'Updating...' : 'Set to Under Investigation'}
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        
                                                        <Menu.Item>
                                                            {() => (
                                                                <button 
                                                                    className={`flex items-center w-full px-4 py-2 text-sm ${r.status === 'RESOLVED' ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                                                                    onClick={() => r.status !== 'RESOLVED' && updateReportStatus(r.id, 'RESOLVED')}
                                                                    disabled={r.status === 'RESOLVED' || updatingStatus}
                                                                >
                                                                    <CheckCircleIcon className="w-5 h-5 mr-2" /> 
                                                                    {updatingStatus ? 'Updating...' : 'Set to Resolved'}
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        
                                                        <Menu.Item>
                                                            {() => (
                                                                <button 
                                                                    className={`flex items-center w-full px-4 py-2 text-sm ${r.status === 'DRAFT' ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                                                                    onClick={() => r.status !== 'DRAFT' && updateReportStatus(r.id, 'DRAFT')}
                                                                    disabled={r.status === 'DRAFT' || updatingStatus}
                                                                >
                                                                    <PencilIcon className="w-5 h-5 mr-2" /> 
                                                                    {updatingStatus ? 'Updating...' : 'Set to Draft'}
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between mt-4 text-xs text-gray-500 gap-2">
                    <span className="text-left">
                        {`Showing ${(page - 1) * reportsPerPage + 1} to ${Math.min(page * reportsPerPage, sortedReports.length)} of ${sortedReports.length} reports`}
                    </span>
                    <div className="flex items-center gap-1">
                        <button className="flex items-center gap-1 px-2 py-1 rounded  text-purple-700 font-semibold hover:text-purple-900 disabled:cursor-not-allowed" onClick={handlePrev} disabled={page === 1}>
                            <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M10 12l-4-4 4-4" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            Previous
                        </button>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                className={`px-2 py-1 rounded border ${page === i + 1 ? 'border-gray-300 bg-white font-semibold text-gray-900' : 'text-gray-700'}`}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button className="flex items-center gap-1 px-2 py-1 rounded text-purple-700 font-semibold hover:text-purple-900 disabled:cursor-not-allowed" onClick={handleNext} disabled={page === totalPages}>
                            Next
                            <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M6 4l4 4-4 4" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-purple-100 border-l-4 border-l-purple-500 border-purple-200 rounded-xl p-5">
                    <h3 className="font-bold text-purple-700 mb-2 flex items-center"><ExclamationCircleIcon className="w-5 h-5 mr-2" /> Understanding Report Status</h3>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">Draft</span>
                            <span className="text-xs text-gray-600">Report saved but not yet submitted</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">Pending</span>
                            <span className="text-xs text-gray-600">Report submitted and awaiting review</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-medium">Under Investigation</span>
                            <span className="text-xs text-gray-600">Committee is actively investigating</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Resolved</span>
                            <span className="text-xs text-gray-600">Investigation complete and case closed</span>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-100 border-l-4 border-l-blue-500 rounded-xl p-5">
                    <h3 className="font-bold text-blue-700 mb-2 flex items-center"><PhoneIcon className="w-5 h-5 mr-2" /> Need Assistance?</h3>
                    <p className="text-sm text-blue-700 mb-3">If you have questions about a report or need to provide additional information, please contact the Anti-Ragging Committee.</p>
                    <button className="bg-white border border-blue-300 text-blue-700 font-medium rounded px-3 py-1.5 text-sm shadow hover:bg-blue-100">Contact Committee</button>
                </div>
                <div className="bg-green-100 border-l-4 border-l-green-500 rounded-xl p-5">
                    <h3 className="font-bold text-green-700 mb-2 flex items-center"><ShieldCheckIcon className="w-5 h-5 mr-2" /> Privacy Assurance</h3>
                    <p className="text-sm text-green-700 mb-3">Your privacy is our priority. All reports are handled with strict confidentiality and only accessible to authorized personnel.</p>
                    <a href="#" className="text-green-700 text-xs hover:underline flex items-center">View Privacy Policy <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" /></a>
                </div>
            </div>
            {/* Modal Popup */}
            {showModal && selectedReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative animate-fade-in text-base">
                        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={handleClose} aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="mb-2 flex items-center gap-2">
                            <span className="font-bold text-xl text-gray-900">Report Details</span>
                            <span className="ml-2 px-2 py-0.5 rounded bg-gray-900 text-white text-xs font-mono">{selectedReport.id}</span>
                        </div>
                        <p className="text-gray-500 text-base mb-4">Detailed information about the reported incident</p>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <div className="text-base font-medium text-gray-500 mb-1">Date Submitted</div>
                                <div className="flex items-center gap-1 text-gray-900"><CalendarIcon className="w-4 h-4" /> {selectedReport.submitted}</div>
                            </div>
                            <div>
                                <div className="text-base font-medium text-gray-500 mb-1">Incident Date</div>
                                <div className="flex items-center gap-1 text-gray-900"><CalendarIcon className="w-4 h-4" /> {selectedReport.incident}</div>
                            </div>
                            <div>
                                <div className="text-base font-medium text-gray-500 mb-1">Location</div>
                                <div className="flex items-center gap-1 text-gray-900"><MapPinIcon className="w-4 h-4" /> {selectedReport.location}</div>
                            </div>
                            <div>
                                <div className="text-base font-medium text-gray-500 mb-1">Current Status</div>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-medium"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" /></svg> {selectedReport.status}</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="text-base font-medium text-gray-500 mb-1">Incident Description</div>
                            <div className="bg-gray-50 rounded-lg p-3 text-gray-900 text-base">{selectedReport.description || 'No description provided.'}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                                <div className="text-base font-medium text-gray-500 mb-1">Severity</div>
                                <span className="inline-block px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-semibold">{selectedReport.severity}</span>
                            </div>
                            <div>
                                <div className="text-base font-medium text-gray-500 mb-1">Involved Persons</div>
                                <span className="inline-flex items-center gap-1 text-gray-900 text-base">{(selectedReport.persons || [{ name: 'Person' }]).length} people</span>
                            </div>
                            <div>
                                <div className="text-base font-medium text-gray-500 mb-1">Witnesses</div>
                                <span className="inline-flex items-center gap-1 text-gray-900 text-base">{(selectedReport.witnesses || [{ name: 'Witness' }]).length} witnesses</span>
                            </div>
                        </div>
                        <div className={`${statusColor[selectedReport.status] || 'bg-gray-50 border-gray-200 text-gray-800'} border rounded-lg px-4 py-3 mb-4 flex items-start gap-2`}>
                            <svg className="w-16 h-16 mt-0.5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg>
                            <span className="text-base">{statusMessages[selectedReport.status] || 'Status information not available.'}</span>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg px-6 py-2 text-base" onClick={handleClose}>Close</button>
                            <button className="bg-white border border-gray-300 text-gray-700 font-medium rounded-lg px-6 py-2 flex items-center gap-2 text-base"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg> Download PDF</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RaggingReport;