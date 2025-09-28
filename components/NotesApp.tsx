'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { PenTool, BookOpen, Sparkles, Save, FileText, Zap } from 'lucide-react'
import ConnectButton from './ConnectButton'
import NoteCard from './NoteCard'

interface Note {
  id: string
  content: string
  timestamp: number
  characterCount: number
}

export default function NotesApp() {
  const { address, isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', content: 'qsajcs', timestamp: Date.now(), characterCount: 6 },
    { id: '2', content: 'nvjvkbj', timestamp: Date.now(), characterCount: 7 },
    { id: '3', content: 'hkjosivijklhc', timestamp: Date.now(), characterCount: 13 },
    { id: '4', content: 'Welcome to your decentralized notes app! This is where your thoughts live on the blockchain forever.', timestamp: Date.now(), characterCount: 95 },
  ])
  const [newNote, setNewNote] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const maxCharacters = 1000
  const remainingChars = maxCharacters - newNote.length
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSaveNote = async () => {
    if (!newNote.trim() || !isConnected) return
    
    setIsSaving(true)
    
    // Simulate blockchain transaction delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const note: Note = {
      id: Date.now().toString(),
      content: newNote.trim(),
      timestamp: Date.now(),
      characterCount: newNote.trim().length
    }
    
    setNotes(prev => [note, ...prev])
    setNewNote('')
    setIsSaving(false)
    setSaveSuccess(true)
    
    // Reset success state
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  const getCharCountColor = () => {
    if (remainingChars < 50) return 'text-red-400'
    if (remainingChars < 200) return 'text-yellow-400'
    return 'text-muted-foreground'
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating background orbs */}
      <div className="floating-orb floating-orb-1" />
      <div className="floating-orb floating-orb-2" />
      <div className="floating-orb floating-orb-3" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gradient-primary">Notes DApp</h1>
                  <p className="text-sm text-muted-foreground">Decentralized note-taking</p>
                </div>
              </div>
              <ConnectButton />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Connection Status */}
          {isConnected && address && (
            <div className="mb-8 animate-slide-in-up">
              <Card className="glass-effect border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="status-dot w-3 h-3 bg-green-400 rounded-full" />
                    <div>
                      <p className="text-sm font-medium">Connected to Blockchain</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {formatAddress(address)}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Zap className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!isConnected && (
            <div className="mb-8 animate-slide-in-up">
              <Card className="border-yellow-500/30 bg-yellow-500/5">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Connect Your Wallet</h3>
                  <p className="text-muted-foreground text-sm">
                    Connect your wallet to start saving notes on the blockchain
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Write Note Section */}
            <div className="lg:col-span-2">
              <Card className="card-hover glass-effect animate-scale-in">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <PenTool className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Write New Note</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Express your thoughts on-chain
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Textarea
                      placeholder="What's on your mind? Share your thoughts with the decentralized world..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="min-h-32 resize-none input-glow text-base leading-relaxed"
                      maxLength={maxCharacters}
                      disabled={!isConnected}
                    />
                    <div className="absolute bottom-3 right-3 text-xs">
                      <span className={`font-medium transition-colors ${getCharCountColor()}`}>
                        {remainingChars}
                      </span>
                      <span className="text-muted-foreground ml-1">left</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleSaveNote}
                    disabled={!newNote.trim() || !isConnected || isSaving}
                    className="w-full btn-gradient group"
                    size="lg"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Saving to Blockchain...
                      </>
                    ) : saveSuccess ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Saved Successfully!
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Save Note
                      </>
                    )}
                  </Button>
                  
                  {!isConnected && (
                    <p className="text-xs text-muted-foreground text-center">
                      Please connect your wallet to save notes
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Notes List Section */}
            <div className="lg:col-span-3">
              <Card className="glass-effect animate-scale-in h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Your Notes</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Stored permanently on blockchain
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                        {notes.length} Notes
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {notes.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium mb-2">No notes yet</h3>
                      <p className="text-sm text-muted-foreground">
                        Write your first note to get started!
                      </p>
                    </div>
                  ) : (
                    <ScrollArea className="h-96">
                      <div className="space-y-3 pr-4">
                        {notes.map((note, index) => (
                          <div key={note.id} className="animate-slide-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                            <NoteCard note={note.content} index={index} />
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats Section */}
          {notes.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-in-up">
              <Card className="glass-effect">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-gradient-primary">
                    {notes.length}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Notes</p>
                </CardContent>
              </Card>
              <Card className="glass-effect">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-gradient-secondary">
                    {notes.reduce((acc, note) => acc + note.characterCount, 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">Characters Written</p>
                </CardContent>
              </Card>
              <Card className="glass-effect">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round(notes.reduce((acc, note) => acc + note.characterCount, 0) / notes.length) || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">Avg. Note Length</p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}