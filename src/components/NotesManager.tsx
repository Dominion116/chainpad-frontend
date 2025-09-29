import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants/contract'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function NotesManager() {
  const [newNote, setNewNote] = useState('')
  const { isConnected } = useAccount()
  const { writeContract, data: hash, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const { data: notes, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getNotes',
  })

  const { data: notesCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getNotesCount',
  })

  useEffect(() => {
    if (isSuccess) {
      refetch()
      setNewNote('')
    }
  }, [isSuccess, refetch])

  const handleSaveNote = () => {
    if (!newNote.trim()) return

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'saveNote',
      args: [newNote],
    })
  }

  if (!isConnected) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Connect Wallet</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Please connect your wallet to use ChainPad.</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <div className="space-y-4">
        <Card>
            <CardHeader>
                <CardTitle>Add a New Note</CardTitle>
                <CardDescription>Write your note below and save it to the blockchain.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full gap-2">
                    <Textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Write your note here..."
                        rows={4}
                    />
                    <Button
                        onClick={handleSaveNote}
                        disabled={isPending || isConfirming || !newNote.trim()}
                    >
                        {isPending || isConfirming ? 'Saving...' : 'Save Note'}
                    </Button>
                </div>
            </CardContent>
        </Card>


      <Card>
        <CardHeader>
          <CardTitle>Your Notes</CardTitle>
          <CardDescription>You have {notesCount?.toString() || '0'} notes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notes && (notes as string[]).length > 0 ? (
            (notes as string[]).map((note, index) => (
              <Card key={index} className="bg-muted/40">
                <CardContent className="p-4">
                  <p>{note}</p>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground p-2 px-4">
                    Note #{index + 1}
                </CardFooter>
              </Card>
            ))
          ) : (
            <p>No notes saved yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
