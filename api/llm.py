import requests

GEMINI_API_KEY = '<YOUR_API_KEY>'

def get_skills(resume_data):
  url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={GEMINI_API_KEY}'
  headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': 'http://127.0.0.1:5000'
  }
  body = {
    "contents": [{
      "parts": [{
        "text": f'''
          You are a candidate recruiter for a big company. You have been given the textual content of a resume and you need to find out what kind of technical skills (not soft skills) the candidate has. Go through the entire resume content and filter out the relevant technical skills and return them as an array of strings where each element is a technical skill.

          Here is the resume data:\n {resume_data}
        '''
      }]
    }]
  }
  data = f"""{body}""".encode(encoding='utf-8')
  try:
    response = requests.post(url, headers=headers, data=data)
  except Exception as e:
    print(f"Error occurred when posting the request: {e}")
  data = response.json()
  skills = data['candidates'][0]['content']['parts'][0]['text']
  return skills
