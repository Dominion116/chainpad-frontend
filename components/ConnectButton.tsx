'use client'

import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from 'wagmi'
import { Button } from './ui/button'
import { Wallet, LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ConnectButton() {
  const { open } = useWeb3Modal()
  const { address, isConnected, isConnecting } = useAccount()
  const { disconnect } = useDisconnect()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button disabled className="flex items-center gap-2">
        <Wallet className="w-4 h-4" />
        Loading...
      </Button>
    )
  }

  if (isConnecting) {
    return (
      <Button disabled className="flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        Connecting...
      </Button>
    )
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-sm text-gray-300">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => disconnect()}
          className="p-2"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  const handleConnect = async () => {
    try {
      await open()
    } catch (error) {
      console.error('Failed to open wallet modal:', error)
    }
  }

  return (
    <Button onClick={handleConnect} className="flex items-center gap-2">
      <Wallet className="w-4 h-4" />
      Connect Wallet
    </Button>
  )
}
