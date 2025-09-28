import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants/contract'
import { base } from 'viem/chains'

export function NotesManager() {
  const [newNote, setNewNote] = useState('')
  const { address, isConnected, chainId } = useAccount()
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const { data: notes, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getNotes',
    chainId: base.id,
  })

  const { data: notesCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getNotesCount',
    chainId: base.id,
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
      chainId: base.id,
    })
  }

  if (!isConnected) {
    return <div>Please connect your wallet to use ChainPad</div>
  }

  if (chainId !== base.id) {
    return <div>Please switch to Base network to use ChainPad</div>
  }

  return (
    <div className="notes-manager">
      <div className="note-input">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write your note here..."
          rows={4}
        />
        <button 
          onClick={handleSaveNote}
          disabled={isPending || isConfirming || !newNote.trim()}
        >
          {isPending || isConfirming ? 'Saving...' : 'Save Note'}
        </button>
      </div>

      <div className="notes-info">
        <p>Total Notes: {notesCount?.toString() || '0'}</p>
      </div>

      <div className="notes-list">
        <h3>Your Notes</h3>
        {notes && notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={index} className="note-item">
              <p>#{index + 1}: {note}</p>
            </div>
          ))
        ) : (
          <p>No notes saved yet</p>
        )}
      </div>
    </div>
  )
}