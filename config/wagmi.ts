import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { base } from 'wagmi/chains'

// Get projectId from environment
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id'

const metadata = {
  name: 'Notes DApp',
  description: 'Decentralized Notes Application',
  url: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
  icons: ['https://walletconnect.com/walletconnect-logo.png']
}

// Configure chains with proper RPC endpoints
const chains = [base] as const

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: false, // Disable to reduce errors
  ssr: false, // Disable SSR for Web3Modal
})
