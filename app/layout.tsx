import './globals.css'
import Web3ModalProvider from '../components/Web3ModalProvider'

export const metadata = {
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
      <body>
        <Web3ModalProvider>
          {children}
        </Web3ModalProvider>
      </body>
    </html>
  )
}
