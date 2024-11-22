"use client"
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Layout, Shield, Menu, FileText, UserCircle } from 'lucide-react';
import React, { useState } from 'react';
import UploadPdfDialog from './UploadPdfDialog';
import { UserButton, useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../../context/ThemeContext';

function Navbar() {
  const { user } = useUser();
  const { theme } = useTheme();
  const path = usePathname();
  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='md:hidden'>
      <div className={`${theme === 'dark' ? 'bg-dark-glass border-dark-border' : 'bg-white/10'} backdrop-blur-lg border border-opacity-20 p-4 shadow-lg`}>
        <div className='flex justify-between items-center'>
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">NOTEWISE</h1>
          </Link>

          <div className='flex items-center gap-4'>
            <UserButton />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className={`${theme === 'dark' ? 'hover:bg-dark-card-hover' : 'hover:bg-white/30'}`}>
              <Menu className='h-5 w-5 sm:h-6 sm:w-6' />
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={`${theme === 'dark' ? 'bg-dark-glass border-dark-border' : 'bg-white/10'} backdrop-blur-lg border-b border-opacity-20 p-4 shadow-lg space-y-4`}>
          <UploadPdfDialog isMaxFile={fileList?.length >= 5 ? true : false}>
            <Button className={`w-full text-sm sm:text-base ${theme === 'dark' ? 'bg-dark-card hover:bg-dark-card-hover text-dark-text-primary' : 'bg-white/20 hover:bg-white/30 text-gray-800'} backdrop-blur-sm border border-opacity-20`}>+ Upload PDF</Button>
          </UploadPdfDialog>

          <div className='flex flex-col gap-3'>
            <Link href={'/dashboard'}>
              <div className={`flex items-center gap-2 p-3 ${theme === 'dark' ? 'hover:bg-dark-card-hover' : 'hover:bg-white/30'} rounded-lg cursor-pointer transition-all ${path === '/dashboard' ? (theme === 'dark' ? 'bg-dark-card' : 'bg-white/40') : ''}`}>
                <Layout className={`h-5 w-5 sm:h-6 sm:w-6 ${theme === 'dark' ? 'text-dark-text-primary' : ''}`} />
                <h2 className={`text-sm sm:text-base ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700/80'}`}>Workspace</h2>
              </div>
            </Link>

            <Link href={'/dashboard/upgrade'}>
              <div className={`flex items-center gap-2 p-3 ${theme === 'dark' ? 'hover:bg-dark-card-hover' : 'hover:bg-white/30'} rounded-lg cursor-pointer transition-all ${path === '/dashboard/upgrade' ? (theme === 'dark' ? 'bg-dark-card' : 'bg-white/40') : ''}`}>
                <Shield className={`h-5 w-5 ${theme === 'dark' ? 'text-dark-text-primary' : ''}`} />
                <h2 className={`text-sm sm:text-base ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700/80'}`}>Upgrade</h2>
              </div>
            </Link>

            <Link href={'/dashboard/profile'}>
              <div className={`flex items-center gap-2 p-3 ${theme === 'dark' ? 'hover:bg-dark-card-hover' : 'hover:bg-white/30'} rounded-lg cursor-pointer transition-all ${path === '/dashboard/profile' ? (theme === 'dark' ? 'bg-dark-card' : 'bg-white/40') : ''}`}>
                <UserCircle className={`h-5 w-5 ${theme === 'dark' ? 'text-dark-text-primary' : ''}`} />
                <h2 className={theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700/80'}>Profile</h2>
              </div>
            </Link>
          </div>

          <div className='mt-5 space-y-2'>
            <Progress
              value={(fileList?.length / 5) * 100}
              className={`h-2 ${theme === 'dark' ? 'bg-dark-card' : 'bg-white/20'} backdrop-blur-sm border border-opacity-20 [&>div]:bg-gradient-to-r [&>div]:from-purple-600 [&>div]:to-pink-600`}
            />
            <p className={`text-sm ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700/80'}`}>{fileList?.length} out of 5 PDF Uploaded</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-400'}`}>Upgrade to Upload more PDF</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
