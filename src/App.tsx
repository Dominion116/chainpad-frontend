import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WalletConnect } from './components/WalletConnect'
import { NotesManager } from './components/NotesManager'
import { wagmiAdapter } from './config/wagmi'
import './App.css'

const queryClient = new QueryClient()

function App() {
  console.log('App rendering...')
  
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <header>
            <h1>ChainPad</h1>
            <WalletConnect />
          </header>
          <main>
            <NotesManager />
          </main>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App