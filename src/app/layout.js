import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AfterDoc',
  description: 'Your AI-powered healthcare companion',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="page-transition">
          {children}
        </div>
      </body>
    </html>
  )
}
