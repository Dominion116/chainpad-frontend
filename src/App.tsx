import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WalletConnect } from './components/WalletConnect'
import { NotesManager } from './components/NotesManager'
import { wagmiAdapter } from './config/wagmi'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const queryClient = new QueryClient()

function App() {
  console.log('App rendering...')
  
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto p-4">
          <header className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold">ChainPad</h1>
            <WalletConnect />
          </header>
          <main>
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <NotesManager />
              </CardContent>
            </Card>
          </main>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App