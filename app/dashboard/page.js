"use client"
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useTheme } from '../context/ThemeContext';

function Dashboard() {
  const { user } = useUser();
  const { theme } = useTheme();
  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-dark-background' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      <div className='p-4 sm:p-6 md:p-8 lg:p-10 max-w-[2000px] mx-auto'>
        <h2 className='font-bold text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600'>Workspace</h2>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-6 sm:gap-4 md:gap-6">
          {fileList?.length > 0 ? fileList?.map((file, index) => (
            <Link key={file.fileId} href={'/workspace/' + file.fileId}>
              <div className={`flex p-4 sm:p-5 md:p-6 rounded-lg flex-col items-center justify-center ${
                theme === 'dark' 
                  ? 'bg-dark-glass border-dark-border hover:bg-dark-card-hover' 
                  : 'bg-white/20 border-white/20 hover:bg-white/30'
              } backdrop-blur-sm border border-opacity-20 transition duration-300 shadow-lg`}>
                <Image
                  src={'/pdf.png'}
                  alt={file.fileName}
                  width={50}
                  height={50}
                  sizes="(max-width: 640px) 40px, (max-width: 768px) 50px, 70px"
                  priority
                  className="mx-auto w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[70px] md:h-[70px]"
                />
                <p className={`text-center mt-2 text-xs xs:text-sm sm:text-base truncate w-full px-2 ${
                  theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700/80'
                }`}>{file.fileName}</p>
              </div>
            </Link>
          ))
            :
            Array(5).fill(null).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className={`${
                  theme === 'dark' 
                    ? 'bg-dark-glass border-dark-border' 
                    : 'bg-white/20 border-white/20'
                } backdrop-blur-sm border border-opacity-20 rounded-lg h-[100px] sm:h-[120px] md:h-[150px] animate-pulse`}
              >
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard
