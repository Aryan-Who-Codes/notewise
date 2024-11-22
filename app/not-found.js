import { FileQuestion } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="text-center space-y-6 max-w-2xl px-4">
        <div className="flex justify-center">
          <FileQuestion className="h-24 w-24 text-purple-400 animate-pulse" />
        </div>
        
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 text-lg">
          The page you're looking for doesn't exist or has been moved
        </p>

        <div className="flex justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
