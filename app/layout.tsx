import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import UserProvider from './context/userContext'
import AllOverlays from './components/AllOverlays'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next js Tiktok-clone',
  description: 'Next js Tiktok-clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <AllOverlays />
          {children}
        </body>
      </UserProvider>
    </html>
  )
}
