'use client'

import { useEffect, useState } from 'react'
import NotesApp from './NotesApp'

export default function ClientWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading Notes DApp...</p>
        </div>
      </div>
    )
  }

  return <NotesApp />
}
