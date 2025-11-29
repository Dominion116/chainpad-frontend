import { Card, CardContent } from "@/components/ui/card"

export function Features() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Truly Decentralized",
      description: "Your notes are stored on-chain. No central servers, no data breaches, complete ownership."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Immutable & Permanent",
      description: "Once saved, your notes are permanent and tamper-proof on the blockchain forever."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      title: "Wallet-Controlled Access",
      description: "Only you can access your notes. Your wallet, your keys, your data."
    }
  ]

  return (
    <section id="features" className="relative py-24 bg-gradient-to-b from-black via-gray-900/50 to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-1/4 w-72 h-72 border border-orange-500/10 rotate-45 rounded-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 border border-red-500/10 -rotate-12 rounded-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
            <span className="text-orange-400 text-sm font-medium">Why Choose ChainPad</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blockchain-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Note Taking</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience the future of note-taking with true ownership and permanent storage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gradient-to-b from-gray-900/80 to-gray-900/40 border-gray-800 hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 group"
            >
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-lg flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-24 grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
              <span className="text-orange-400 text-sm font-medium">How It Works</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Secure & Fast</span>
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              ChainPad leverages blockchain technology to give you complete control over your notes. Every note is a transaction, permanently recorded and accessible only by you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                  <span className="text-orange-500 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Connect Your Wallet</h4>
                  <p className="text-gray-400 text-sm">
                    Use any Web3 wallet like MetaMask, WalletConnect, or Coinbase Wallet
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                  <span className="text-orange-500 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Write & Save</h4>
                  <p className="text-gray-400 text-sm">
                    Create your notes and save them directly to the Base blockchain
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                  <span className="text-orange-500 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Access Anywhere</h4>
                  <p className="text-gray-400 text-sm">
                    Your notes are available forever, accessible from any device with your wallet
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-8 shadow-2xl">
              <div className="mb-6">
                <div className="text-gray-400 text-sm mb-2">Total Notes Stored</div>
                <div className="flex items-end gap-2">
                  <div className="text-5xl font-bold text-white">1000+</div>
                  <div className="text-green-500 text-sm mb-2 flex items-center gap-1">
                    Growing
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-gray-400 text-xs mb-1">Network</div>
                  <div className="text-white font-semibold text-lg">Base</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-gray-400 text-xs mb-1">Gas</div>
                  <div className="text-white font-semibold text-lg">Low</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-gray-400 text-xs mb-1">Status</div>
                  <div className="text-green-500 font-semibold text-lg">Live</div>
                </div>
              </div>

              <div className="relative h-48 bg-gradient-to-t from-orange-500/20 to-transparent rounded-lg overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-500/40 to-orange-500/10 rounded-t-3xl"></div>
                <div className="absolute inset-0 flex items-end justify-center gap-1 pb-4">
                  {[40, 60, 45, 80, 55, 75, 90].map((height, i) => (
                    <div
                      key={i}
                      className="w-8 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Floating accent */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
