import { useAccount, useDisconnect } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { open } = useAppKit()

  if (isConnected) {
    return (
      <div className="wallet-info">
        <p>Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  }

  return (
    <div className="wallet-connect">
      <button onClick={() => open()}>Connect Wallet</button>
    </div>
  )
}