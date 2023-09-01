
import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TriboAI',
  description: 'TriboAI offers powerful, on-demand AI solutions for generating images, music, videos, code snippets and more. Elevate your projects with our easy-to-use platform.',
  icon: './favicon.ico',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
  )
}
