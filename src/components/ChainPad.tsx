"use client"

import React, { useState, useEffect } from 'react';
import { Wallet, FileText, Plus, AlertCircle, CheckCircle } from 'lucide-react';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';
import { ethers } from 'ethers';



const ChainPad = () => {
  const [account, setAccount] = useState('');
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [connected, setConnected] = useState(false);

  
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setStatus('Please install MetaMask');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Switch to Base mainnet
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x2105' }], // Base mainnet
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x2105',
              chainName: 'Base',
              nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
              rpcUrls: ['https://mainnet.base.org'],
              blockExplorerUrls: ['https://basescan.org'],
            }],
          });
        }
      }

      setAccount(accounts[0]);
      setConnected(true);
      setStatus('Connected to Base');
      await loadNotes();
    } catch (error) {
      console.error('Connection error:', error);
      setStatus('Connection failed');
    }
  };

  const getContract = (needSigner = false) => {
    if (!window.ethereum) throw new Error('No wallet found');
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    
    if (needSigner) {
      const signer = provider.getSigner();
      return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    } else {
      return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    }
  };

  const loadNotes = async () => {
    if (!connected) return;
    
    setLoading(true);
    try {
      const contract = getContract();
      const userNotes = await contract.getNotes();
      setNotes(userNotes);
      setStatus(`Loaded ${userNotes.length} notes from blockchain`);
    } catch (error) {
      console.error('Load notes error:', error);
      setStatus('Failed to load notes');
    }
    setLoading(false);
  };

  const saveNote = async () => {
    if (!newNote.trim()) return;
    if (!connected) {
      setStatus('Please connect wallet first');
      return;
    }

    setLoading(true);
    try {
      const contract = getContract(true);
      setStatus('Confirming transaction...');
      
      const tx = await contract.saveNote(newNote);
      setStatus('Transaction sent, waiting for confirmation...');
      
      await tx.wait();
      setStatus('Note saved to blockchain!');
      
      // Reload notes and clear input
      setNewNote('');
      await loadNotes();
    } catch (error: any) {
      console.error('Save note error:', error);
      if (error.code === 'ACTION_REJECTED') {
        setStatus('Transaction cancelled');
      } else if (error.reason) {
        setStatus(`Error: ${error.reason}`);
      } else {
        setStatus('Failed to save note');
      }
    }
    setLoading(false);
  };

  // Auto-connect if wallet was previously connected
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ 
            method: 'eth_accounts' 
          });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setConnected(true);
            await loadNotes();
          }
        } catch (error) {
          console.error('Auto-connect error:', error);
        }
      }
    };
    
    checkConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
            ChainPad
          </h1>
          <p className="text-slate-300 text-lg">
            Your notes, secured on Base blockchain forever
          </p>
        </div>

        {/* Connection Status */}
        <div className="mb-6 text-center">
          {!connected ? (
            <button
              onClick={connectWallet}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Wallet className="mr-2 h-5 w-5" />
              Connect Wallet
            </button>
          ) : (
            <div className="inline-flex items-center px-4 py-2 bg-green-600/20 border border-green-500 rounded-lg text-green-300">
              <CheckCircle className="mr-2 h-4 w-4" />
              {account.slice(0, 6)}...{account.slice(-4)}
            </div>
          )}
        </div>

        {/* Status Message */}
        {status && (
          <div className="mb-6 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300">
              <AlertCircle className="mr-2 h-4 w-4" />
              {status}
            </div>
          </div>
        )}

        {connected && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Write Note Section */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Plus className="mr-2 h-6 w-6" />
                Write Note
              </h2>
              <div className="space-y-4">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Write your note here... (max 1000 characters)"
                  className="w-full h-40 bg-slate-900/50 border border-slate-600 rounded-lg p-4 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                  maxLength={1000}
                  disabled={loading}
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">
                    {newNote.length}/1000 characters
                  </span>
                  <button
                    onClick={saveNote}
                    disabled={!newNote.trim() || loading}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200"
                  >
                    {loading ? 'Saving...' : 'Save to Chain'}
                  </button>
                </div>
              </div>
            </div>

            {/* Saved Notes Section */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <FileText className="mr-2 h-6 w-6" />
                  Your Notes ({notes.length})
                </h2>
                <button
                  onClick={loadNotes}
                  disabled={loading}
                  className="px-3 py-1 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-sm text-white rounded transition-colors"
                >
                  Refresh
                </button>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="text-center py-8 text-slate-400">
                    Loading notes...
                  </div>
                ) : notes.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    No notes yet. Write your first note!
                  </div>
                ) : (
                  notes.map((note, index) => (
                    <div
                      key={index}
                      className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 hover:border-slate-500 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-slate-400">
                          Note #{index + 1}
                        </span>
                      </div>
                      <p className="text-white whitespace-pre-wrap break-words">
                        {note}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>
            Powered by Base • Contract:{' '}
            <a 
              href={`https://basescan.org/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-400 underline"
            >
              {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChainPad;