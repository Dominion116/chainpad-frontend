import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { base, type AppKitNetwork } from '@reown/appkit/networks'
// import type { AppKitNetwork } from '@reown/appkit'

const projectId = '8429aa0bbbea1af265e0d8bbe0d8f01e'

// 👇 force it to be a non-empty tuple
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [base]

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
    url: typeof window !== 'undefined' ? window.location.origin : '',
    icons: []
  },
  features: {
    analytics: false
  }
})

export { wagmiAdapter }
