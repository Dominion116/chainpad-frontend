'use client'

import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'
import { Button } from './ui/button'
import { Wallet } from 'lucide-react'

export default function ConnectButton() {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        <span className="text-sm text-gray-400">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
      </div>
    )
  }

  return (
    <Button onClick={() => open()} className="flex items-center gap-2">
      <Wallet className="w-4 h-4" />
      Connect Wallet
    </Button>
  )
}
