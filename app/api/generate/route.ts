import { NextRequest, NextResponse } from 'next/server'
import { generateREADME, type READMEFormData } from '@/lib/templates'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.projectName || typeof body.projectName !== 'string') {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 }
      )
    }

    // Sanitize input
    const sanitizedData: READMEFormData = {
      ...body,
      projectName: body.projectName.trim(),
      tagline: body.tagline?.trim() || '',
      description: body.description?.trim() || '',
      positioningStatement: body.positioningStatement?.trim() || '',
      features: Array.isArray(body.features) ? body.features.filter(Boolean).map((f: string) => f.trim()) : [],
      installation: body.installation?.trim() || '',
      usage: body.usage?.trim() || '',
      projectLinks: body.projectLinks || {},
      badges: body.badges || {},
      contributors: Array.isArray(body.contributors) ? body.contributors.filter(Boolean) : [],
      license: body.license || 'MIT',
      template: body.template || 'minimalist'
    }

    // Generate README
    const readme = generateREADME(sanitizedData)

    return NextResponse.json({ 
      success: true, 
      readme,
      metadata: {
        projectName: sanitizedData.projectName,
        template: sanitizedData.template,
        generatedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('README generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate README' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'README Generator API',
    version: '1.0.0',
    endpoints: {
      generate: 'POST /api/generate'
    }
  })
}
