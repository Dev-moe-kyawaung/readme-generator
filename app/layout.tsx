import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { defaultSEO } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: defaultSEO.title,
    template: '%s | README Generator'
  },
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
  openGraph: defaultSEO.openGraph,
  twitter: defaultSEO.twitter,
  metadataBase: new URL('https://readme-generator.vercel.app'),
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <footer className="border-t py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
            <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built with Next.js 14 • Open Source • {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
