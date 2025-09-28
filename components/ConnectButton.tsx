'use client'

import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from 'wagmi'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Wallet, LogOut, Zap, Copy, Check } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ConnectButton() {
  const { open } = useWeb3Modal()
  const { address, isConnected, isConnecting } = useAccount()
  const { disconnect } = useDisconnect()
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!mounted) {
    return (
      <Button disabled variant="outline" className="flex items-center gap-2 loading-shimmer">
        <Wallet className="w-4 h-4" />
        Loading...
      </Button>
    )
  }

  if (isConnecting) {
    return (
      <Button disabled variant="outline" className="flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        Connecting...
      </Button>
    )
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="glass-effect rounded-lg p-3 group animate-scale-in">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="status-dot w-3 h-3 bg-green-400 rounded-full" />
              <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono font-medium text-foreground/90">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyAddress}
                className="h-6 w-6 p-0 hover:bg-primary/20 transition-colors"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                )}
              </Button>
            </div>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
              <Zap className="w-2.5 h-2.5 mr-1" />
              Connected
            </Badge>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => disconnect()}
          className="p-2 hover:bg-destructive/20 hover:text-destructive transition-colors"
          title="Disconnect wallet"
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
    <Button 
      onClick={handleConnect} 
      className="flex items-center gap-2 btn-gradient group"
    >
      <Wallet className="w-4 h-4 group-hover:scale-110 transition-transform" />
      Connect Wallet
    </Button>
  )
}