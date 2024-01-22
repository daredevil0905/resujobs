"use client"

import { FormEvent, useState } from "react"

export default function FileUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [resumeData, setResumeData] = useState('')

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (file !== null) {
      try {
        const formData = new FormData()
        formData.append('pdfFile', file)
  
        const response = await fetch('http://127.0.0.1:5000/api/resume', {
          method: 'POST',
          body: formData
        })
  
        if (!response.ok) {
          throw new Error(`Network Error after making resume post request. Status Code: ${response.status}`)
        }
  
        const data = await response.json()

        setResumeData(data.message)
      } catch (e) {
        console.log(`Error: ${e}`)
      }
    }
  }

  return (
    <>
      <form encType="multipart/form-data" onSubmit={handleFormSubmit}>
        <label htmlFor="fileInput">Choose a PDF file:</label>
        <input
          type="file"
          id="fileInput"
          accept=".pdf"
          required
          onChange={(e) => setFile(e.target.files !== null ? e.target.files[0] : null)} 
        />
        <button type="submit">Submit</button>
      </form>
      <div className="mt-10">
        {resumeData}
      </div>
    </>
  )
}