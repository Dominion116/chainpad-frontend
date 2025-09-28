import { useAccount, useDisconnect } from 'wagmi'
import { modal } from '../config/wagmi'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const handleConnect = () => {
    modal.open()
  }

  if (isConnected && address) {
    return (
      <div className="wallet-info">
        <p>Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  }

  return (
    <div className="wallet-connect">
      <button onClick={handleConnect}>Connect Wallet</button>
    </div>
  )
}