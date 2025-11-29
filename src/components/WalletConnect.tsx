import { useAppKit } from '@reown/appkit/react'
import { useAccount, useDisconnect } from 'wagmi'
import { Button } from "@/components/ui/button"

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { open } = useAppKit()

  const handleConnect = () => {
    open()
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-gray-300">{address.slice(0, 6)}...{address.slice(-4)}</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => disconnect()}
          className="border-gray-700 text-gray-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30"
        >
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button 
      onClick={handleConnect}
      className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg shadow-orange-500/20"
    >
      Connect Wallet
    </Button>
  )
}