import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { base, mainnet } from 'viem/chains'

const projectId = '8429aa0bbbea1af265e0d8bbe0d8f01e'

const networks = [base, mainnet]

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false
})

// Initialize AppKit
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'ChainPad',
    description: 'Decentralized Note Taking',
    url: window.location.origin,
    icons: []
  },
  features: {
    analytics: false
  }
})

export { wagmiAdapter }