'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { FileText, Sparkles } from 'lucide-react'
import NotesApp from './NotesApp'

export default function ClientWrapper() {
  const [mounted, setMounted] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setMounted(true)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        {/* Background orbs */}
        <div className="floating-orb floating-orb-1" />
        <div className="floating-orb floating-orb-2" />
        
        <Card className="glass-effect w-96 animate-scale-in">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
                <FileText className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-gradient-primary mb-2">
                Notes DApp
              </h2>
              <p className="text-muted-foreground">
                Initializing your decentralized experience...
              </p>
            </div>
            
            {/* Loading animation */}
            <div className="relative mb-6">
              <div className="w-12 h-12 border-4 border-muted/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <div className="flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium">Loading Web3...</span>
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="relative">
              <div className="w-full bg-muted/30 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(loadingProgress, 100)}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                {Math.round(loadingProgress)}% Complete
              </div>
            </div>
            
            {/* Loading steps */}
            <div className="mt-6 space-y-2 text-left">
              <div className={`flex items-center gap-2 text-xs transition-colors ${
                loadingProgress > 20 ? 'text-primary' : 'text-muted-foreground'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  loadingProgress > 20 ? 'bg-primary animate-pulse' : 'bg-muted-foreground/50'
                }`} />
                Connecting to blockchain network
              </div>
              <div className={`flex items-center gap-2 text-xs transition-colors ${
                loadingProgress > 50 ? 'text-primary' : 'text-muted-foreground'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  loadingProgress > 50 ? 'bg-primary animate-pulse' : 'bg-muted-foreground/50'
                }`} />
                Loading smart contracts
              </div>
              <div className={`flex items-center gap-2 text-xs transition-colors ${
                loadingProgress > 80 ? 'text-primary' : 'text-muted-foreground'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  loadingProgress > 80 ? 'bg-primary animate-pulse' : 'bg-muted-foreground/50'
                }`} />
                Preparing user interface
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <NotesApp />
}