'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { State, WagmiProvider } from 'wagmi'
import { config } from '../config/wagmi'

const queryClient = new QueryClient()

if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
  throw new Error('Project ID is not defined')
}

createWeb3Modal({
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  wagmiConfig: config,
  defaultChain: config.chains[1], // sepolia
  enableAnalytics: false,
  enableOnramp: false
})

export default function Web3ModalProvider({
  children,
  initialState
}: {
  children: React.ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
