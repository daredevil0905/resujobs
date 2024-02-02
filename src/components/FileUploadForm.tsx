"use client"

import { FormEvent, useState } from "react"
import { tech, techMap } from "../constants"
import { getSkillLevel } from "../lib"
import { jobAPI } from "../api"

export default function FileUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [jobs, setJobs] = useState<string[]>([])

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

        const skills: string[] = data.message.skills.toLowerCase().replace(/\s/g, "").split(',')
        let technologies = ''
        for (const skill of skills) {
          if (tech.includes(skill)) {
            technologies += skill + ','
          } else {
            if (skill in techMap) {
              technologies += techMap[skill] + ','
            }
          }
        }

        technologies = technologies.slice(0, -1)
        
        const skillLevel = getSkillLevel(data.message.yearsOfExperience)

        const jobs = await jobAPI(technologies, skillLevel)        
        setJobs(jobs.map((job: any) => job.title))
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
        {jobs.map((job, index) => (
          <h1 key={index}>{job}</h1>
        ))}
      </div>
    </>
  )
}