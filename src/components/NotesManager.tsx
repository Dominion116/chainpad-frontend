import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants/contract'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const NOTES_PER_PAGE = 5

export function NotesManager() {
  const [newNote, setNewNote] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const { address } = useAccount()
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract()

  const { isLoading: isConfirming, isSuccess, error: txError } = useWaitForTransactionReceipt({
    hash,
  })

  const { data: notes, refetch, isLoading: notesLoading, error: readError } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getNotes',
    account: address,
  })

  const { data: notesCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getNotesCount',
    account: address,
  })

  useEffect(() => {
    if (isSuccess) {
      refetch()
      setNewNote('')
      setCurrentPage(1) // Reset to first page when new note is added
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

  const displayError = writeError || txError || readError
  
  // Pagination logic
  const notesArray = (notes as string[]) || []
  const totalNotes = notesArray.length
  const totalPages = Math.ceil(totalNotes / NOTES_PER_PAGE)
  const startIndex = (currentPage - 1) * NOTES_PER_PAGE
  const endIndex = startIndex + NOTES_PER_PAGE
  const paginatedNotes = notesArray.slice(startIndex, endIndex)
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  
  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="space-y-6">
        <Card className="bg-gradient-to-b from-gray-900/80 to-gray-900/40 border-gray-800 hover:border-orange-500/30 transition-all">
            <CardHeader>
                <CardTitle className="text-white">Add a New Note</CardTitle>
                <CardDescription className="text-gray-400">Write your note below and save it to the Base blockchain.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full gap-4">
                    <Textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Write your note here..."
                        rows={6}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500 resize-none"
                    />
                    
                    {displayError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-red-400 text-sm">
                          {writeError?.message || txError?.message || readError?.message}
                        </p>
                      </div>
                    )}
                    
                    {isSuccess && (
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-green-400 text-sm">Note saved successfully to blockchain!</p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs">
                        {newNote.length} characters
                      </span>
                      <Button
                        onClick={handleSaveNote}
                        disabled={isPending || isConfirming || !newNote.trim()}
                        className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg shadow-orange-500/20 disabled:opacity-50"
                      >
                        {isPending && (
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                        {isPending ? 'Confirming...' : isConfirming ? 'Saving to Blockchain...' : 'Save to Blockchain'}
                      </Button>
                    </div>
                </div>
            </CardContent>
        </Card>


      <Card className="bg-gradient-to-b from-gray-900/80 to-gray-900/40 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Your Blockchain Notes</span>
            {notesLoading && (
              <svg className="animate-spin h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </CardTitle>
          <CardDescription className="text-gray-400">
            You have {notesCount?.toString() || '0'} note{notesCount?.toString() !== '1' ? 's' : ''} stored on the blockchain.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notesLoading ? (
            <div className="flex justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : notesArray.length > 0 ? (
            <>
              <div className="space-y-3">
                {paginatedNotes.map((note, index) => {
                  const actualIndex = startIndex + index
                  return (
                    <Card key={actualIndex} className="bg-gray-800/40 border-gray-700 hover:border-orange-500/30 transition-all group">
                      <CardContent className="p-4">
                        <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">{note}</p>
                      </CardContent>
                      <CardFooter className="text-xs text-gray-500 p-2 px-4 flex items-center justify-between border-t border-gray-700/50">
                        <span>Note #{actualIndex + 1}</span>
                        <div className="flex items-center gap-1 text-orange-500/70">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                          </svg>
                          <span>On-chain</span>
                        </div>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div className="text-sm text-gray-400">
                    Showing {startIndex + 1}-{Math.min(endIndex, totalNotes)} of {totalNotes} notes
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-30"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum
                        if (totalPages <= 5) {
                          pageNum = i + 1
                        } else if (currentPage <= 3) {
                          pageNum = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i
                        } else {
                          pageNum = currentPage - 2 + i
                        }
                        
                        return (
                          <Button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            className={currentPage === pageNum 
                              ? "bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 w-9 h-9 p-0" 
                              : "border-gray-700 text-gray-300 hover:bg-gray-800 w-9 h-9 p-0"
                            }
                          >
                            {pageNum}
                          </Button>
                        )
                      })}
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <>
                          <span className="text-gray-500 px-1">...</span>
                          <Button
                            onClick={() => goToPage(totalPages)}
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-300 hover:bg-gray-800 w-9 h-9 p-0"
                          >
                            {totalPages}
                          </Button>
                        </>
                      )}
                    </div>
                    
                    <Button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-30"
                    >
                      Next
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg font-medium mb-2">No notes yet</p>
              <p className="text-gray-500 text-sm">Create your first blockchain note above!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
