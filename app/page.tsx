'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { PreviewPanel } from '@/components/preview-panel'
import { MinimalistForm } from '@/components/templates/minimalist'
import { DataHeavyForm } from '@/components/templates/data-heavy'
import { AgencyStyleForm } from '@/components/templates/agency-style'
import { defaultFormData, type READMEFormData } from '@/lib/templates'
import { debounce } from '@/lib/utils'
import { RefreshCw, Download } from 'lucide-react'

export default function HomePage() {
  const [formData, setFormData] = useState<READMEFormData>(defaultFormData)
  const [generatedReadme, setGeneratedReadme] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const generateREADME = useCallback(async (data: READMEFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to generate README')
      }

      const result = await response.json()
      setGeneratedReadme(result.readme)
      setLastSaved(new Date())
    } catch (error) {
      console.error('Generation error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Debounced generation
  const debouncedGenerate = useCallback(
    debounce((data: READMEFormData) => {
      generateREADME(data)
    }, 500),
    [generateREADME]
  )

  // Auto-generate on form changes
  useEffect(() => {
    debouncedGenerate(formData)
  }, [formData, debouncedGenerate])

  const handleFormChange = (updates: Partial<READMEFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const handleReset = () => {
    setFormData(defaultFormData)
    setGeneratedReadme('')
    setLastSaved(null)
  }

  const handleDownload = () => {
    const blob = new Blob([generatedReadme], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'README.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const renderForm = () => {
    switch (formData.template) {
      case 'data-heavy':
        return <DataHeavyForm data={formData} onChange={handleFormChange} />
      case 'agency-style':
        return <AgencyStyleForm data={formData} onChange={handleFormChange} />
      default:
        return <MinimalistForm data={formData} onChange={handleFormChange} />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">README Generator</h1>
            <p className="text-muted-foreground mt-1">
              Create production-ready README files in seconds
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={formData.template}
              onChange={(e) => handleFormChange({ template: e.target.value as any })}
              aria-label="Select template"
            >
              <option value="minimalist">Minimalist</option>
              <option value="data-heavy">Data Heavy</option>
              <option value="agency-style">Agency Style</option>
            </Select>
            <Button variant="outline" onClick={handleReset} aria-label="Reset form">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button variant="default" onClick={handleDownload} disabled={!generatedReadme}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
        {lastSaved && (
          <p className="text-xs text-muted-foreground mt-2">
            Last saved: {lastSaved.toLocaleTimeString()}
          </p>
        )}
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Panel */}
        <Card className="h-fit">
          <CardContent className="p-6 space-y-8">
            {renderForm()}
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <div className="lg:sticky lg:top-8 h-fit">
          <PreviewPanel
            markdown={generatedReadme}
            onCopy={() => console.log('Copied to clipboard')}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Accessibility: Skip link */}
      <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
        Skip to main content
      </a>
    </div>
  )
}
