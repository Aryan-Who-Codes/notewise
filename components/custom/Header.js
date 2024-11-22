"use client"

import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import { useTheme } from '@/app/context/ThemeContext'

export default function Header() {
  const { user } = useUser()
  const { theme } = useTheme()

  return (
    <nav className={`fixed w-full p-4 md:p-6 border border-opacity-20 ${theme === 'dark' ? 'bg-dark-glass border-dark-border' : 'bg-white/10'} backdrop-blur-lg z-50 shadow-lg`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="group cursor-pointer">
          <div className="flex items-center gap-2" aria-label="Notewise Home">
            <FileText className="h-6 w-6 text-purple-600" aria-hidden="true" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)]">NOTEWISE</h1>
          </div>
        </Link>
        {user ? (
          <UserButton redirectUrl="/" />
        ) : (
          <Button variant="outline"
            className={`${theme === 'dark' ? 'bg-dark-card hover:bg-dark-card-hover text-dark-text-primary' : 'bg-white/20 hover:bg-white/30'} backdrop-blur-sm border-opacity-20 transition-all duration-300`}
            asChild
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
        )}
      </div>
    </nav>
  )
}
