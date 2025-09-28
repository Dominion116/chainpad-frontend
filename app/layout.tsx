import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Web3ModalProvider from '../components/Web3ModalProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Notes DApp - Decentralized Note Taking',
  description: 'Store your thoughts permanently on the blockchain with our decentralized notes application',
  keywords: ['blockchain', 'notes', 'decentralized', 'web3', 'dapp'],
  authors: [{ name: 'Notes DApp Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0f172a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📝</text></svg>" />
      </head>
      <body className={`${inter.variable} font-sans bg-background text-foreground antialiased min-h-screen`}>
        <Web3ModalProvider>
          <div className="relative min-h-screen">
            {/* Global background effects */}
            <div className="fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              {children}
            </div>
            
            {/* Footer */}
            <footer className="relative z-10 border-t border-border/50 bg-card/30 backdrop-blur-xl mt-auto">
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Built with</span>
                    <span className="text-red-400">♥</span>
                    <span>on the blockchain</span>
                  </div>
                  <div className="flex items-center gap-6 text-xs text-muted-foreground">
                    <span>Powered by Web3</span>
                    <span>•</span>
                    <span>Decentralized Forever</span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Web3ModalProvider>
      </body>
    </html>
  )
}