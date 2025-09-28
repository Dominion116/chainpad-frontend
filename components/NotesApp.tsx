'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Plus, FileText, Loader2, CheckCircle, XCircle, Wallet } from 'lucide-react'

import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import ConnectButton from './ConnectButton'
import NoteCard from './NoteCard'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contracts/notes'

export default function NotesApp() {
  const { address, isConnected } = useAccount()
  const [newNote, setNewNote] = useState('')
  const [status, setStatus] = useState('')

  // Read contract data
  const { data: notes = [], refetch: refetchNotes } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getNotes',
    account: address,
  })

  const { data: notesCount = 0n } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getNotesCount',
    account: address,
  })

  // Write contract
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const handleSaveNote = async () => {
    if (!newNote.trim()) return
    
    try {
      setStatus('Preparing transaction...')
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'saveNote',
        args: [newNote],
      })
    } catch (err) {
      console.error('Error saving note:', err)
      setStatus('Failed to save note')
    }
  }

  // Handle transaction status
  useEffect(() => {
    if (isPending) {
      setStatus('Confirm transaction in wallet...')
    } else if (isConfirming) {
      setStatus('Saving note to blockchain...')
    } else if (isConfirmed) {
      setStatus('Note saved successfully!')
      setNewNote('')
      refetchNotes()
      setTimeout(() => setStatus(''), 3000)
    } else if (error) {
      setStatus('Failed to save note')
      setTimeout(() => setStatus(''), 3000)
    }
  }, [isPending, isConfirming, isConfirmed, error, refetchNotes])

  const charactersLeft = 1000 - newNote.length
  const isOverLimit = newNote.length > 1000

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Notes DApp</h1>
            <ConnectButton />
          </div>
          
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="pt-6">
              <Wallet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">Connect Your Wallet</h2>
              <p className="text-muted-foreground mb-6">
                Connect your wallet to start saving and viewing your notes on the blockchain.
              </p>
              <ConnectButton />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Notes DApp</h1>
          <ConnectButton />
        </div>

        {/* Write Note Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Write New Note
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Write your note here... (max 1000 characters)"
                  disabled={isPending || isConfirming}
                  rows={6}
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-sm ${
                    isOverLimit 
                      ? 'text-destructive' 
                      : charactersLeft < 100 
                        ? 'text-yellow-500' 
                        : 'text-muted-foreground'
                  }`}>
                    {charactersLeft} characters remaining
                  </span>
                </div>
              </div>

              {status && (
                <div className="flex items-center gap-2 text-sm">
                  {isPending || isConfirming ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isConfirmed ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : error ? (
                    <XCircle className="w-4 h-4 text-destructive" />
                  ) : null}
                  <span className={
                    isConfirmed ? 'text-green-500' : 
                    error ? 'text-destructive' : 
                    'text-blue-500'
                  }>
                    {status}
                  </span>
                </div>
              )}

              <Button
                onClick={handleSaveNote}
                disabled={!newNote.trim() || isPending || isConfirming || isOverLimit}
                className="w-full"
              >
                {isPending || isConfirming ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isPending ? 'Confirm in Wallet' : 'Saving...'}
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Save Note
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notes List Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Your Notes
              </CardTitle>
              <Badge>{Number(notesCount)} total</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {notes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No notes saved yet.</p>
                <p className="text-sm">Write your first note above!</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {notes.map((note: string, index: number) => (
                  <NoteCard key={index} note={note} index={index} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
