'use client'

import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Check, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PreviewPanelProps {
  markdown: string
  onCopy: () => void
  isLoading?: boolean
}

export function PreviewPanel({ markdown, onCopy, isLoading = false }: PreviewPanelProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'preview' | 'raw'>('preview')

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    onCopy()
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'README.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Preview</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab('preview')}
            className={cn(activeTab === 'preview' && 'bg-accent')}
            aria-pressed={activeTab === 'preview'}
          >
            Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab('raw')}
            className={cn(activeTab === 'raw' && 'bg-accent')}
            aria-pressed={activeTab === 'raw'}
          >
            Raw
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
          >
            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            aria-label="Download README.md"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : activeTab === 'preview' ? (
          <article 
            className="prose prose-sm dark:prose-invert max-w-none"
            aria-live="polite"
          >
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </article>
        ) : (
          <pre className="bg-muted p-4 rounded-md overflow-auto text-sm font-mono">
            <code>{markdown}</code>
          </pre>
        )}
      </CardContent>
    </Card>
  )
}
