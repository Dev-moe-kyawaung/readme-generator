export interface SEOMetadata {
  title: string
  description: string
  keywords: string[]
  openGraph: {
    title: string
    description: string
    type: 'website'
    url: string
    siteName: string
  }
  twitter: {
    card: 'summary_large_image'
    title: string
    description: string
  }
}

export const defaultSEO: SEOMetadata = {
  title: 'README Generator - Create Premium README Templates',
  description: 'Generate production-ready README.md files with real-time preview. Choose from minimalist, data-heavy, or agency-style templates.',
  keywords: ['README generator', 'markdown template', 'GitHub README', 'developer tools', 'open source'],
  openGraph: {
    title: 'README Generator',
    description: 'Create premium README templates in seconds',
    type: 'website',
    url: 'https://readme-generator.vercel.app',
    siteName: 'README Generator'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'README Generator',
    description: 'Generate beautiful README files instantly'
  }
}

export function generateREADMESEO(projectName: string): Partial<SEOMetadata> {
  return {
    title: `${projectName} - README`,
    description: `Generated README for ${projectName}`,
    openGraph: {
      title: `${projectName} README`,
      description: `Professional README generated for ${projectName}`,
      type: 'website',
      url: `https://github.com/${projectName}`,
      siteName: 'README Generator'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${projectName} README`,
      description: `Check out this project: ${projectName}`
    }
  }
}
