from PyPDF2 import PdfReader
from llm import get_skills

def read_pdf(file_path):
  resume_data = None
  with open(file_path, 'rb') as file:
    reader = PdfReader(file)
    resume_data = ''
    for page in reader.pages:
      resume_data += page.extract_text()
  skills = get_skills(resume_data)
  return skills  
  

    