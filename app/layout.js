
import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import ModalProvider from '@/components/Models-Provider'
import { CrispProvider } from '@/components/CrispProvider'
import { ToasterProvider } from '@/components/ToasterProvider'
import { CopyRight } from '@/components/Copyright'
import Meta from '@/components/SEO/Meta'


const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (
    <>
    <Meta/> 
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
    </>
  )
}
