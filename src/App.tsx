import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { NotesManager } from './components/NotesManager'
import { Footer } from './components/Footer'
import { wagmiAdapter } from './config/wagmi'

const queryClient = new QueryClient()

function App() {
  console.log('App rendering...')
  
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-black">
          <Header />
          <Hero />
          <Features />
          
          {/* Notes Section */}
          <section id="notes-section" className="relative py-24 bg-black">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-1/4 w-72 h-72 border border-orange-500/20 rotate-45 rounded-3xl"></div>
              <div className="absolute bottom-20 right-1/4 w-96 h-96 border border-red-500/20 -rotate-12 rounded-3xl"></div>
            </div>
            
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
                  <span className="text-orange-400 text-sm font-medium">Your Notes</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Blockchain <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Notes</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Store your notes securely on the blockchain. Connect your wallet to get started.
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <NotesManager />
              </div>
            </div>
          </section>
          
          <Footer />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App