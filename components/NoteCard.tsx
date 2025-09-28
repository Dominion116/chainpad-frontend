'use client'

import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Clock, Hash, Type } from 'lucide-react'

interface NoteCardProps {
  note: string
  index: number
}

export default function NoteCard({ note, index }: NoteCardProps) {
  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  const formatTimestamp = () => {
    return new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCardGradient = () => {
    const gradients = [
      'from-blue-500/10 to-purple-600/10 border-blue-500/20',
      'from-green-500/10 to-teal-600/10 border-green-500/20',
      'from-purple-500/10 to-pink-600/10 border-purple-500/20',
      'from-orange-500/10 to-red-600/10 border-orange-500/20',
      'from-cyan-500/10 to-blue-600/10 border-cyan-500/20',
    ]
    return gradients[index % gradients.length]
  }

  const getBadgeVariant = () => {
    if (note.length > 200) return 'default'
    if (note.length > 100) return 'secondary'
    return 'outline'
  }

  return (
    <Card className={`card-hover bg-gradient-to-br ${getCardGradient()} group transition-all duration-300 hover:shadow-lg border`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-purple-600 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
              <Hash className="w-3 h-3 text-primary-foreground" />
            </div>
            <CardTitle className="text-sm font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
              Note #{index + 1}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={getBadgeVariant()} 
              className="text-xs font-medium bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 transition-colors"
            >
              <Type className="w-2.5 h-2.5 mr-1" />
              {note.length} chars
            </Badge>
          </div>
        </div>
        
        {/* Metadata row */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{formatTimestamp()}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{getWordCount(note)} words</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-lg -z-10 group-hover:from-primary/10 transition-colors" />
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
            <p className="text-sm text-foreground/90 whitespace-pre-wrap break-words leading-relaxed font-mono">
              {note}
            </p>
          </div>
        </div>
        
        {/* Note length indicator */}
        <div className="mt-3 flex justify-between items-center">
          <div className="flex-1 bg-muted/30 h-1 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full transition-all duration-500 group-hover:from-primary/80 group-hover:to-purple-600/80"
              style={{ width: `${Math.min((note.length / 200) * 100, 100)}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground ml-3 font-medium">
            {note.length > 200 ? 'Long' : note.length > 100 ? 'Medium' : 'Short'}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}