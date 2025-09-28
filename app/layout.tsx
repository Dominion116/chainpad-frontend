import type { Metadata } from 'next'
import './globals.css'
import Web3ModalProvider from '../components/Web3ModalProvider'

export const metadata: Metadata = {
  title: 'Notes DApp',
  description: 'Decentralized Notes Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-gray-100">
        <Web3ModalProvider>
          {children}
        </Web3ModalProvider>
      </body>
    </html>
  )
}
