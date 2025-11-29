import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { NotesManager } from '../components/NotesManager'

export function Notes() {
  const { isConnected } = useAccount()
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
            <span className="text-orange-400 text-sm font-medium">Your Notes</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blockchain <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Notes</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Store your notes securely on the blockchain. Your wallet is connected.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <NotesManager />
        </div>
      </div>
    </section>
  )
}
