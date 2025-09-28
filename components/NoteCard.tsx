'use client'

import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Badge } from './ui/badge'

interface NoteCardProps {
  note: string
  index: number
}

export default function NoteCard({ note, index }: NoteCardProps) {
  return (
    <Card className="transition-all hover:border-gray-600">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm text-gray-400">Note #{index + 1}</CardTitle>
          <Badge variant="secondary">{note.length} chars</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-200 whitespace-pre-wrap break-words">{note}</p>
      </CardContent>
    </Card>
  )
}
