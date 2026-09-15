'use client'

import React from 'react'
import { FormSection, FeatureInput, LinkInput } from '@/components/form-section'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import type { READMEFormData } from '@/lib/templates'

interface MinimalistFormProps {
  data: READMEFormData
  onChange: (data: Partial<READMEFormData>) => void
}

export function MinimalistForm({ data, onChange }: MinimalistFormProps) {
  return (
    <>
      <FormSection title="Basic Information" description="Essential project details">
        <div className="space-y-4">
          <div>
            <Label htmlFor="projectName">Project Name *</Label>
            <Input
              id="projectName"
              value={data.projectName}
              onChange={(e) => onChange({ projectName: e.target.value })}
              placeholder="my-awesome-project"
              required
            />
          </div>
          <div>
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={data.tagline}
              onChange={(e) => onChange({ tagline: e.target.value })}
              placeholder="A powerful tool for developers"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="Brief description of your project"
              rows={3}
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Quick Start" description="Installation and usage">
        <div className="space-y-4">
          <div>
            <Label htmlFor="installation">Installation Command</Label>
            <Input
              id="installation"
              value={data.installation}
              onChange={(e) => onChange({ installation: e.target.value })}
              placeholder="npm install my-project"
            />
          </div>
          <div>
            <Label htmlFor="usage">Usage Example</Label>
            <Textarea
              id="usage"
              value={data.usage}
              onChange={(e) => onChange({ usage: e.target.value })}
              placeholder="import { myFunction } from 'my-project'"
              rows={3}
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Project Links" description="External resources">
        <div className="grid gap-4">
          <LinkInput
            label="Demo"
            value={data.projectLinks.demo}
            onChange={(value) => onChange({ projectLinks: { ...data.projectLinks, demo: value } })}
          />
          <LinkInput
            label="Documentation"
            value={data.projectLinks.docs}
            onChange={(value) => onChange({ projectLinks: { ...data.projectLinks, docs: value } })}
          />
          <LinkInput
            label="Repository"
            value={data.projectLinks.repo}
            onChange={(value) => onChange({ projectLinks: { ...data.projectLinks, repo: value } })}
          />
        </div>
      </FormSection>
    </>
  )
}
