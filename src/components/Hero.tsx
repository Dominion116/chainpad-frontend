import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { Button } from "@/components/ui/button"

export function Hero() {
  const navigate = useNavigate()
  const { isConnected } = useAccount()
  const { open } = useAppKit()

  const handleGetStarted = () => {
    if (isConnected) {
      navigate('/notes')
    } else {
      open()
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Geometric Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-orange-500/20 rotate-45 rounded-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-red-500/20 -rotate-12 rounded-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 border border-orange-400/20 rotate-12 rounded-2xl"></div>
      </div>

      {/* Animated Gradient Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-600/20 blur-3xl rounded-full animate-pulse-slow"></div>

      {/* Floating Balls */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-ball absolute top-20 left-[10%] w-4 h-4 bg-orange-500/40 rounded-full blur-sm"></div>
        <div className="floating-ball-delayed absolute top-40 right-[15%] w-6 h-6 bg-red-500/30 rounded-full blur-sm"></div>
        <div className="floating-ball absolute bottom-32 left-[20%] w-3 h-3 bg-orange-400/50 rounded-full blur-sm"></div>
        <div className="floating-ball-delayed absolute bottom-48 right-[25%] w-5 h-5 bg-red-400/40 rounded-full blur-sm"></div>
        <div className="floating-ball absolute top-1/3 left-[30%] w-4 h-4 bg-orange-600/30 rounded-full blur-sm"></div>
        <div className="floating-ball-delayed absolute top-2/3 right-[20%] w-4 h-4 bg-red-600/30 rounded-full blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
          <span className="text-orange-400 text-sm font-medium">Decentralized Note-Taking</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Your Notes. Your Keys.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
            Your Blockchain.
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Store your notes permanently on the blockchain. Censorship-resistant, immutable, and owned by you forever.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg shadow-orange-500/20"
          >
            {isConnected ? 'Go to Notes' : 'Connect Wallet'}
          </Button>
          <Button
            variant="outline"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-gray-600 text-white hover:bg-white/5 px-8 py-6 text-lg rounded-lg"
          >
            Learn More
          </Button>
        </div>

        {/* Partner Logos Section */}
        <div className="mt-24">
          <p className="text-gray-500 text-sm mb-8">Built on trusted blockchain infrastructure</p>
          <div className="flex items-center justify-center gap-12 flex-wrap opacity-40 grayscale hover:opacity-60 transition-opacity">
            <div className="text-gray-400 text-2xl font-semibold">Base</div>
            <div className="text-gray-400 text-2xl font-semibold">Ethereum</div>
            <div className="text-gray-400 text-2xl font-semibold">IPFS</div>
            <div className="text-gray-400 text-2xl font-semibold">Web3</div>
            <div className="text-gray-400 text-2xl font-semibold">Metamask</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-2 bg-orange-500 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}
