// export const dynamic = 'force-dynamic'

import { Footer, Navbar } from '@/components/Index';
import './globals.css'
import { Inter } from 'next/font/google'

import { StateContext } from '@/context/StateContext'

import { Toaster } from 'react-hot-toast';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <StateContext>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <Toaster />
          {children}
          <Footer />
        </body>
      </html>
    </StateContext>
  )
}