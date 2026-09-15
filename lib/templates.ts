export interface READMEFormData {
  projectName: string
  tagline: string
  description: string
  positioningStatement: string
  features: string[]
  installation: string
  usage: string
  projectLinks: {
    demo?: string
    docs?: string
    repo?: string
    website?: string
  }
  badges?: {
    build?: string
    version?: string
    license?: string
    downloads?: string
  }
  contributors?: string[]
  license: string
  template: 'minimalist' | 'data-heavy' | 'agency-style'
}

export const defaultFormData: READMEFormData = {
  projectName: 'My Project',
  tagline: 'A powerful tool for developers',
  description: 'This project provides an elegant solution to common problems.',
  positioningStatement: 'For developers who need X, our project is a Y that provides Z.',
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
  installation: 'npm install my-project',
  usage: 'import { myFunction } from "my-project"',
  projectLinks: {},
  badges: {},
  contributors: [],
  license: 'MIT',
  template: 'minimalist'
}

export function generateREADME(data: READMEFormData): string {
  const templates = {
    'minimalist': generateMinimalistREADME,
    'data-heavy': generateDataHeavyREADME,
    'agency-style': generateAgencyStyleREADME
  }
  
  return templates[data.template](data)
}

function generateMinimalistREADME(data: READMEFormData): string {
  return `# ${data.projectName}

${data.tagline}

${data.description}

## Quick Start

```bash
${data.installation}
```

## Usage

```javascript
${data.usage}
```

## Links

${Object.entries(data.projectLinks)
  .filter(([_, url]) => url)
  .map(([key, url]) => `- [${key.charAt(0).toUpperCase() + key.slice(1)}](${url})`)
  .join('
')}

## License

${data.license}
`
}

function generateDataHeavyREADME(data: READMEFormData): string {
  const badges = Object.entries(data.badges || {})
    .filter(([_, url]) => url)
    .map(([key, url]) => `![${key}](${url})`)
    .join(' ')

  return `# ${data.projectName}

${data.tagline}

${badges ? `${badges}

` : ''}## Overview

${data.description}

### Positioning

${data.positioningStatement}

## Key Features

${data.features.map(f => `- **${f}**`).join('
')}

## Installation

```bash
${data.installation}
```

## Usage Examples

```javascript
${data.usage}
```

## Project Links

| Type | Link |
|------|------|
${Object.entries(data.projectLinks)
  .filter(([_, url]) => url)
  .map(([key, url]) => `| ${key.charAt(0).toUpperCase() + key.slice(1)} | [Visit](${url}) |`)
  .join('
')}

## Contributors

${data.contributors.length > 0 
  ? data.contributors.map(c => `- @${c}`).join('
')
  : 'No contributors yet'}

## License

${data.license} License
`
}

function generateAgencyStyleREADME(data: READMEFormData): string {
  return `# ✨ ${data.projectName}

> ${data.tagline}

---

## 🎯 About

${data.description}

### 💡 Positioning Statement

${data.positioningStatement}

---

## 🚀 Features

${data.features.map(f => `- ✅ ${f}`).join('
')}

---

## 📦 Installation

```bash
${data.installation}
```

---

## 💻 Usage

```javascript
${data.usage}
```

---

## 🔗 Links

${Object.entries(data.projectLinks)
  .filter(([_, url]) => url)
  .map(([key, url]) => `- [**${key.charAt(0).toUpperCase() + key.slice(1)}**](${url})`)
  .join('
')}

---

## 📄 License

${data.license}

---

*Built with ❤️ for the developer community*
`
}
