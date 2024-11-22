"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { DialogClose } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader2Icon } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import uuid4 from 'uuid4'
import axios from 'axios'
import { toast } from 'sonner'
import Link from 'next/link'
import { useTheme } from '../../context/ThemeContext'

function UploadPdfDialog({ children, isMaxFile }) {

  const { theme } = useTheme();
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const AddFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const GetFileUrl = useMutation(api.fileStorage.GetFileUrl);
  const embeddedDocument = useAction(api.myAction.ingest);
  const { user } = useUser();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState();
  const [open, setOpen] = useState(false);

  // const handleDialogClose = () => {
  //   setOpen(false);
  //   setFile(null);
  //   setFileName('');
  //   setLoading(false);
  // }

  if (!user) {
    return (
      <Button asChild className="w-full">
        <Link href="/sign-in">Sign in to Upload</Link>
      </Button>
    )
  }

  if (isMaxFile) {
    return (
      <div className="w-full">
        <Button className={`w-full ${theme === 'dark' ? 'bg-dark-card text-dark-text-secondary' : 'bg-gray-300'} cursor-not-allowed`} variant="ghost">
          Free Limit Reached
        </Button>
        <p className={`text-xs ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-500'} mt-1 text-center`}>Upgrade to upload more PDFs</p>
      </div>
    )
  }

  const OnFileSelect = (event) => {
    setFile(event.target.files[0]);
  }

  const OnUpload = async () => {
    setLoading(true);
    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();

    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });
    const { storageId } = await result.json();

    console.log('StorageId', storageId);
    const fileId = uuid4();
    const fileUrl = await GetFileUrl({ storageId: storageId });

    // Step 3: Save the newly allocated storage id to the database

    const result2 = await AddFileEntry({
      fileId: fileId,
      storageId: storageId,
      fileName: fileName ?? 'Untitled File',
      fileUrl: fileUrl,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });

    console.log('result2', result2);

    // API call to fetch pdf Processed Data

    const apiResponse = await axios.get('/api/pdf-loader?pdfUrl=' + fileUrl);
    console.log(apiResponse.data.result);

    // API call to ingest the pdf data

    await embeddedDocument({
      splitText: apiResponse.data.result,
      fileId: fileId,
    });

    // console.log('embeddedResult', embeddedResult);
    setLoading(false);
    setOpen(false);

    toast.success('File Uploaded Successfully');
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full hover:shadow-lg transition-all duration-300" disabled={isMaxFile} onClick={() => setOpen(true)}>
            + Upload PDF File
          </Button>
          {/* {children} */}
        </DialogTrigger>
        <DialogContent className={theme === 'dark' ? 'bg-dark-glass border-dark-border' : ''}>
          <DialogHeader>
            <DialogTitle className={`text-2xl font-semibold ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>Upload PDF File</DialogTitle>
            <DialogDescription asChild>
              <div className='space-y-4'>
                <h2 className={`text-lg font-medium ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700'}`}>Choose a PDF to Upload</h2>
                <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dark-card border-dark-border hover:border-dark-border/80' : 'bg-gray-50 border-gray-200 hover:border-gray-300'} transition-colors duration-200`}>
                  <input type="file" accept='application/pdf'
                    onChange={(event) => OnFileSelect(event)}
                    className="w-full cursor-pointer"
                  />
                </div>

                <div className='space-y-2'>
                  <label className={`text-sm font-medium ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700'}`}>Document Name *</label>
                  <Input
                    placeholder='Enter a descriptive name'
                    onChange={(e) => setFileName(e.target.value)}
                    className={`focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-dark-card border-dark-border text-dark-text-primary' : ''}`}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-3 mt-6">
            <DialogClose asChild>
              <Button type="button" variant="secondary"
                className={theme === 'dark' ? 'bg-dark-card hover:bg-dark-card-hover text-dark-text-primary' : 'hover:bg-gray-100'}
                onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={OnUpload}
              disabled={loading}
              className={theme === 'dark' ? 'bg-dark-card hover:bg-dark-card-hover text-dark-text-primary' : 'bg-black hover:bg-gray-700'}>
              {loading ? <Loader2Icon className='animate-spin mr-2' /> : 'Upload Document'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UploadPdfDialog
