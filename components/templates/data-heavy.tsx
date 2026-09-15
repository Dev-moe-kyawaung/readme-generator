'use client'

import React from 'react'
import { FormSection, FeatureInput, LinkInput } from '@/components/form-section'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { READMEFormData } from '@/lib/templates'

interface DataHeavyFormProps {
  data: READMEFormData
  onChange: (data: Partial<READMEFormData>) => void
}

export function DataHeavyForm({ data, onChange }: DataHeavyFormProps) {
  return (
    <>
      <FormSection title="Project Details" description="Comprehensive project information">
        <div className="space-y-4">
          <div>
            <Label htmlFor="projectName">Project Name *</Label>
            <Input
              id="projectName"
              value={data.projectName}
              onChange={(e) => onChange({ projectName: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={data.tagline}
              onChange={(e) => onChange({ tagline: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="description">Full Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => onChange({ description: e.target.value })}
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="positioningStatement">Positioning Statement</Label>
            <Textarea
              id="positioningStatement"
              value={data.positioningStatement}
              onChange={(e) => onChange({ positioningStatement: e.target.value })}
              placeholder="For [target audience], our product is a [category] that [benefit]."
              rows={3}
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Features" description="Key capabilities">
        <FeatureInput
          features={data.features}
          onChange={(features) => onChange({ features })}
        />
      </FormSection>

      <FormSection title="Badges" description="Status indicators (URLs)">
        <div className="grid gap-4">
          <LinkInput
            label="Build Status"
            value={data.badges?.build}
            onChange={(value) => onChange({ badges: { ...data.badges, build: value } })}
          />
          <LinkInput
            label="Version"
            value={data.badges?.version}
            onChange={(value) => onChange({ badges: { ...data.badges, version: value } })}
          />
          <LinkInput
            label="License"
            value={data.badges?.license}
            onChange={(value) => onChange({ badges: { ...data.badges, license: value } })}
          />
        </div>
      </FormSection>

      <FormSection title="Contributors" description="GitHub usernames">
        <FeatureInput
          features={data.contributors}
          onChange={(contributors) => onChange({ contributors })}
        />
      </FormSection>
    </>
  )
}
