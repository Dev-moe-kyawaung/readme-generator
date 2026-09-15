'use client'

import React from 'react'
import { FormSection, FeatureInput, LinkInput } from '@/components/form-section'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import type { READMEFormData } from '@/lib/templates'

interface AgencyStyleFormProps {
  data: READMEFormData
  onChange: (data: Partial<READMEFormData>) => void
}

export function AgencyStyleForm({ data, onChange }: AgencyStyleFormProps) {
  return (
    <>
      <FormSection title="Branding" description="Visual identity">
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
            <Label htmlFor="tagline">Catchy Tagline</Label>
            <Input
              id="tagline"
              value={data.tagline}
              onChange={(e) => onChange({ tagline: e.target.value })}
              placeholder="✨ Revolutionary. Elegant. Powerful."
            />
          </div>
          <div>
            <Label htmlFor="description">About Section</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => onChange({ description: e.target.value })}
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="positioningStatement">Value Proposition</Label>
            <Textarea
              id="positioningStatement"
              value={data.positioningStatement}
              onChange={(e) => onChange({ positioningStatement: e.target.value })}
              rows={3}
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Features" description="What makes it special">
        <FeatureInput
          features={data.features}
          onChange={(features) => onChange({ features })}
        />
      </FormSection>

      <FormSection title="Links" description="Online presence">
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
            label="Website"
            value={data.projectLinks.website}
            onChange={(value) => onChange({ projectLinks: { ...data.projectLinks, website: value } })}
          />
        </div>
      </FormSection>

      <FormSection title="License">
        <div>
          <Label htmlFor="license">License Type</Label>
          <Select
            id="license"
            value={data.license}
            onChange={(e) => onChange({ license: e.target.value })}
          >
            <option value="MIT">MIT</option>
            <option value="Apache-2.0">Apache 2.0</option>
            <option value="GPL-3.0">GPL 3.0</option>
            <option value="BSD-3-Clause">BSD 3-Clause</option>
            <option value="ISC">ISC</option>
          </Select>
        </div>
      </FormSection>
    </>
  )
}
