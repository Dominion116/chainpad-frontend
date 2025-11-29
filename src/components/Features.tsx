import { Card, CardContent } from "@/components/ui/card"

export function Features() {
  const features = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Truly Decentralized",
      description: "Your notes are stored on-chain. No central servers, no data breaches, complete ownership."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Immutable & Permanent",
      description: "Once saved, your notes are permanent and tamper-proof on the blockchain forever."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
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
              className="relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-orange-500/50 transition-all duration-500 overflow-hidden group shadow-xl hover:shadow-2xl hover:shadow-orange-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <CardContent className="relative p-8 z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-orange-500/30 shadow-lg shadow-orange-500/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-[15px]">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="mt-24 max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
            <span className="text-orange-500 text-sm font-semibold">How It Works</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: Steps */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Secure & Fast</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                ChainPad leverages blockchain technology to give you complete control over your notes. Every note is a transaction, permanently recorded and accessible only by you.
              </p>

              <div className="space-y-5">
                {/* Step 1 */}
                <div className="flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm flex items-center justify-center text-orange-500 font-bold border border-orange-500/30 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                    1
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1 group-hover:text-orange-400 transition-colors">Connect Your Wallet</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Use any Web3 wallet like MetaMask, WalletConnect, or Coinbase Wallet</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm flex items-center justify-center text-orange-500 font-bold border border-orange-500/30 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                    2
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1 group-hover:text-orange-400 transition-colors">Write & Save</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Create your notes and save them directly to the Base blockchain</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm flex items-center justify-center text-orange-500 font-bold border border-orange-500/30 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                    3
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1 group-hover:text-orange-400 transition-colors">Access Anywhere</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Your notes are available forever, accessible from any device with your wallet</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Stats Card */}
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden group hover:border-orange-500/30 transition-all duration-500">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="text-sm text-gray-400 mb-3 font-medium">Total Notes Stored</div>
                <div className="flex items-baseline gap-3 mb-6">
                  <div className="text-6xl font-bold text-white">1000+</div>
                  <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                    <span>Growing</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                </div>

                {/* Network Info Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Network</div>
                    <div className="text-white font-bold">Base</div>
                  </div>
                  <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Gas</div>
                    <div className="text-white font-bold">Low</div>
                  </div>
                  <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Status</div>
                    <div className="text-green-400 font-bold">Live</div>
                  </div>
                </div>

                {/* Chart visualization */}
                <div className="bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-2xl p-6 border border-orange-500/20">
                  <div className="flex items-end justify-between gap-2 h-32">
                    {[40, 55, 45, 65, 50, 70, 60, 80, 75, 90].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-orange-500 to-red-500 rounded-t-lg transition-all duration-500 hover:from-orange-400 hover:to-red-400"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
