'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <section className={cn('space-y-4', className)}>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

interface FeatureInputProps {
  features: string[]
  onChange: (features: string[]) => void
}

export function FeatureInput({ features, onChange }: FeatureInputProps) {
  const addFeature = () => {
    onChange([...features, ''])
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    onChange(newFeatures)
  }

  const removeFeature = (index: number) => {
    onChange(features.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-2">
      {features.map((feature, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={feature}
            onChange={(e) => updateFeature(index, e.target.value)}
            placeholder={`Feature ${index + 1}`}
            aria-label={`Feature ${index + 1}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeFeature(index)}
            aria-label={`Remove feature ${index + 1}`}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addFeature}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Feature
      </Button>
    </div>
  )
}

interface LinkInputProps {
  label: string
  value?: string
  onChange: (value: string) => void
  placeholder?: string
}

export function LinkInput({ label, value = '', onChange, placeholder }: LinkInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <Input
        id={label.toLowerCase()}
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || `https://example.com/${label.toLowerCase()}`}
        aria-describedby={`${label.toLowerCase()}-description`}
      />
      <p id={`${label.toLowerCase()}-description`} className="text-xs text-muted-foreground">
        Optional {label.toLowerCase()} URL
      </p>
    </div>
  )
}
