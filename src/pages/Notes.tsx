import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { NotesManager } from '../components/NotesManager'

export function Notes() {
  const { isConnected, address } = useAccount()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isConnected) {
      navigate('/')
    }
  }, [isConnected, navigate])

  if (!isConnected) {
    return null
  }

  return (
    <section className="relative py-24 min-h-screen bg-black">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 border border-orange-500/20 rotate-45 rounded-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 border border-red-500/20 -rotate-12 rounded-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 pt-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-orange-400 text-sm font-medium">Connected</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Blockchain <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Notes</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-4">
            Store your notes permanently on the Base blockchain. Immutable, decentralized, and owned by you.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
            <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300 text-sm font-mono">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <NotesManager />
        </div>
      </div>
    </section>
  )
}
