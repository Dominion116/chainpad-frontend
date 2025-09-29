import { useAccount, useDisconnect } from 'wagmi'
import { modal } from '../config/wagmi'
import { Button } from "@/components/ui/button";

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const handleConnect = () => {
    modal.open()
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-4">
        <p className="text-sm text-muted-foreground">Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
        <Button variant="destructive" onClick={() => disconnect()}>Disconnect</Button>
      </div>
    )
  }

  return (
    <Button onClick={handleConnect}>Connect Wallet</Button>
  )
}