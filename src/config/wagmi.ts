import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { base } from 'viem/chains'
import { type AppKitNetwork } from '@reown/appkit/networks'

const projectId = '8429aa0bbbea1af265e0d8bbe0d8f01e'

// Convert viem chains to AppKit networks
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  base
] as [AppKitNetwork, ...AppKitNetwork[]]

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId
})

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'ChainPad',
    description: 'Decentralized Note Taking',
    url: 'https://chainpad.app',
    icons: ['https://chainpad.app/icon.png']
  }
})

export { wagmiAdapter }