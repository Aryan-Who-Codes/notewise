import React from 'react'

function PdfViewer({ fileUrl }) {
  // console.log(fileUrl);
  return (
    <div className='h-full'>

      {/* 
        PDF Viewer iframe options:
        #toolbar=0 - hides the toolbar
        #zoom=100 - sets initial zoom level
        #page=2 - opens specific page
        #view=Fit - fits to window
        #pagemode=thumbs - shows thumbnail navigation
        #search="keyword" - highlights search term
        #nameddest=section1 - jumps to named destination
        Multiple parameters can be combined with & like:
        fileUrl + "#toolbar=0&zoom=100&pagemode=thumbs"
      */}

      {/* note: if we don't want toolbar then use this code */}

      {/* <iframe src={fileUrl+"#toolbar=0"} width="100%" height="90vh" className='border-none h-[90vh]'></iframe> */}


      <iframe src={fileUrl} width="100%" height="90vh" className='border-none h-full' loading="eager"></iframe>
    </div>
  )
}

export default PdfViewer
