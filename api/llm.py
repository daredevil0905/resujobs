import requests
import json

GEMINI_API_KEY = '<YOUR_API_KEY>'

def get_data(resume_data):
  url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={GEMINI_API_KEY}'
  headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': 'http://127.0.0.1:5000'
  }
  body = {
    "contents": [{
      "parts": [{
        "text": f'''
          You are a candidate recruiter for a big company. You have been given the textual content of a resume and you need to find out what kind of technical skills (not soft skills) and amount of years in actual working (non-project) experience the candidate has.

          Here is the resume data:\n {resume_data}

          Go through the entire resume content and filter out the relevant technical skills and calculate the total years of work experience (specified under 'WORK EXPERIENCE' or 'EXPERIENCE'). Return this data in a stringified JSON with the following (key, value) pairs: ('skills', <single string with comma-separated skills>) and ('years_of_experience', <number of years of experience>). Simply return the json starting with curly braces, do not write anything like 'json' before the stringified object.
        '''
      }]
    }]
  }
  data = f"""{body}""".encode(encoding='utf-8')
  try:
    response = requests.post(url, headers=headers, data=data)
    data = response.json()
    data = data['candidates'][0]['content']['parts'][0]['text']
    data = json.loads(data)
    return data
  except Exception as e:
    return f"Error occurred when posting the request: {e}"
