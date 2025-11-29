import { useState, useEffect } from 'react'
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants/contract'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function NotesManager() {
  const [newNote, setNewNote] = useState('')
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

  return (
    <div className="space-y-6">
        <Card className="bg-gradient-to-b from-gray-900/80 to-gray-900/40 border-gray-800 hover:border-orange-500/30 transition-all">
            <CardHeader>
                <CardTitle className="text-white">Add a New Note</CardTitle>
                <CardDescription className="text-gray-400">Write your note below and save it to the blockchain.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full gap-4">
                    <Textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Write your note here..."
                        rows={4}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500"
                    />
                    <Button
                        onClick={handleSaveNote}
                        disabled={isPending || isConfirming || !newNote.trim()}
                        className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg shadow-orange-500/20"
                    >
                        {isPending || isConfirming ? 'Saving...' : 'Save Note'}
                    </Button>
                </div>
            </CardContent>
        </Card>


      <Card className="bg-gradient-to-b from-gray-900/80 to-gray-900/40 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Your Notes</CardTitle>
          <CardDescription className="text-gray-400">You have {notesCount?.toString() || '0'} notes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notes && (notes as string[]).length > 0 ? (
            (notes as string[]).map((note, index) => (
              <Card key={index} className="bg-gray-800/40 border-gray-700 hover:border-orange-500/30 transition-all">
                <CardContent className="p-4">
                  <p className="text-gray-200">{note}</p>
                </CardContent>
                <CardFooter className="text-sm text-gray-500 p-2 px-4">
                    Note #{index + 1}
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">No notes saved yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
