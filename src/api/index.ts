export async function jobAPI(technologies: string, skillLevel: string) {
  try {
    const response = await fetch(`https://api.crackeddevs.com/api/get-jobs?technologies=${technologies}&skill_levels=${skillLevel}`, {
      method: 'GET',
      headers: {
        'api-key': '<YOUR_API_KEY>',
        'Content-Type': 'application/json'
      }
    })
  
    if (!response.ok) {
      throw new Error(`Network Error after making resume post request. Status Code: ${response.status}`)
    }

    const jobs = await response.json()

    return jobs

  } catch (e) {
    return { error: `Error encountered while making Crackeddevs API call: ${e}` }
  }
}

