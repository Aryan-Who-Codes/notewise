"use client"

import { useParams } from 'next/navigation'
import React from 'react'
import WorkspaceHeader from './_components/WorkspaceHeader'
import PdfViewer from './_components/PdfViewer';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import TextEditor from './_components/TextEditor';
import { useTheme } from '../../context/ThemeContext'

function Workspace() {
    const { fileId } = useParams();
    const { theme } = useTheme();
    const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
        fileId: fileId,
    });

    return (
        <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-dark-glass' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
            <div className={`sticky top-0 w-full border border-opacity-20 ${theme === 'dark' ? 'bg-dark-glass border-dark-border' : 'bg-white/10'} backdrop-blur-lg z-50 shadow-lg`}>
                <WorkspaceHeader fileName={fileInfo?.fileName} />
            </div>

            <div className='flex-1 grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 p-8'>
                <div className={`h-full overflow-hidden rounded-lg ${theme === 'dark' ? 'bg-dark-card hover:bg-dark-card-hover' : 'bg-white/20 hover:bg-white/30'} backdrop-blur-sm border border-opacity-20 transition duration-300 shadow-lg`}>
                    <PdfViewer fileUrl={fileInfo?.fileUrl} />
                </div>

                <hr className='md:hidden border-t-4 border-white/20 backdrop-blur-sm my-2 mx-4 rounded-full' />

                <div className={`h-full overflow-hidden rounded-lg ${theme === 'dark' ? 'bg-dark-card hover:bg-dark-card-hover' : 'bg-white/20 hover:bg-white/30'} backdrop-blur-sm border border-opacity-20 transition duration-300 shadow-lg p-4`}>
                    <TextEditor fileId={fileId} />
                </div>
            </div>
        </div>
    )
}

export default Workspace
