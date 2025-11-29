import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { base, type AppKitNetwork } from '@reown/appkit/networks'

const projectId = '8429aa0bbbea1af265e0d8bbe0d8f01e'

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [base]

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false
})

// Initialize AppKit with custom theme
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'ChainPad',
    description: 'Decentralized Note Taking on the Blockchain',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
  features: {
    analytics: false,
    email: false,
    socials: []
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#f97316',
    '--w3m-border-radius-master': '8px'
  }
})
