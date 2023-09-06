
import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import ModalProvider from '@/components/Models-Provider'
import { CrispProvider } from '@/components/CrispProvider'
import { ToasterProvider } from '@/components/ToasterProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TriboAI',
  description: 'TriboAI offers powerful, on-demand AI solutions for generating images, music, videos, code snippets and more. Elevate your projects with our easy-to-use platform.',
  icon: 'favicon.ico',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <CrispProvider />
      <body className={inter.className}>
        <ModalProvider />
        <ToasterProvider />
        {children}
        </body>
    </html>
    </ClerkProvider>
  )
}
