"use client"

import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { FileText, Save } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useTheme } from '../../../context/ThemeContext'

function WorkspaceHeader({ fileName }) {
    const { theme } = useTheme();

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <div className="flex items-center gap-2">
                            <FileText className="h-6 w-6 text-red-400" />
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">NOTEWISE</h1>
                        </div>
                    </Link>
                    <div className="h-4 w-[2px] bg-gradient-to-b from-purple-600 to-pink-600 rounded-full" />
                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700/80'}`}>
                        {fileName}
                    </h3>
                </div>

                <div className="flex items-center gap-4">
                    {/* <Button 
                        variant="outline" 
                        className="gap-2 bg-white/20 backdrop-blur-sm border border-opacity-20 hover:bg-white/30 text-gray-800"
                    >
                        <Save className="h-4 w-4" />
                        Save
                    </Button> */}
                    <UserButton />
                </div>
            </div>
        </div>
    )
}

export default WorkspaceHeader
