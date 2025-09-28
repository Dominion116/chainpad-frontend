'use client'

import { ReactNode, useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { State, WagmiProvider } from 'wagmi'
import { config } from '../config/wagmi'

// Create a new query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

let modalInitialized = false

export default function Web3ModalProvider({
  children,
  initialState
}: {
  children: ReactNode
  initialState?: State
}) {
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeModal = async () => {
      try {
        if (typeof window !== 'undefined' && !modalInitialized) {
          const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
          
          if (!projectId) {
            throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not defined')
          }

          // Create Web3Modal
          createWeb3Modal({
            projectId,
            wagmiConfig: config,
            defaultChain: config.chains[0], // sepolia
            enableAnalytics: false,
            enableOnramp: false,
            themeMode: 'dark',
            themeVariables: {
              '--w3m-font-family': 'inherit',
              '--w3m-border-radius-master': '8px'
            }
          })
          
          modalInitialized = true
        }
        setMounted(true)
      } catch (err) {
        console.error('Failed to initialize Web3Modal:', err)
        setError(err instanceof Error ? err.message : 'Failed to initialize Web3Modal')
        setMounted(true) // Still mount even with errors
      }
    }

    initializeModal()
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Initializing Web3...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-400 mb-4">⚠️ Web3 Initialization Error</div>
          <p className="text-gray-300 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Please check your WalletConnect Project ID in .env.local
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
