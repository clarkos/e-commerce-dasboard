import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { ModalProvider } from '@/providers/modalProvider'
import { ToasterProvider } from '@/providers/toast-provider'

import './globals.css'
import { ThemeProvider } from '@/providers/themeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MegaStoreAdmin',
  description: 'Administration module for multipleStore Sites',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
            <ToasterProvider />
            <ModalProvider />
            {children}
            </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
