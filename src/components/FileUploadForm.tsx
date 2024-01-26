"use client"

import { FormEvent, useState } from "react"

function getSkillLevel(yearsOfExperience: number) {
  if (yearsOfExperience <= 1) {
    return 'junior'
  } else if (yearsOfExperience > 1 && yearsOfExperience <= 3) {
    return 'mid'
  } else {
    return 'senior'
  }
}

export default function FileUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [jobs, setJobs] = useState([])

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

        const skills = data.message.skills.replace(/\s/g, "")
        const skillLevel = getSkillLevel(data.message.yearsOfExperience)

        const jobs = await fetch(`https://api.crackeddevs.com/api/get-jobs?technologies=${skills}&skill_levels=${skillLevel}`, {
          method: 'GET',
          headers: {
            'api-key': '20a21438-fb18-441b-9c58-6bd18d8da0df',
            'Content-Type': 'application/json'
          }
        })
        console.log(jobs)
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
      <div className="mt-10 flex flex-wrap gap-5">
        
      </div>
    </>
  )
}