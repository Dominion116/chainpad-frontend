import { useNavigate } from 'react-router-dom'
import { WalletConnect } from './WalletConnect'

export function Header() {
  const navigate = useNavigate()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-white font-semibold text-xl">ChainPad</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/#home" className="text-gray-300 hover:text-white transition-colors">
              Home
            </a>
            <a href="/#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <button 
              onClick={() => navigate('/notes')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Notes
            </button>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  )
}
