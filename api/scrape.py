from PyPDF2 import PdfReader
from llm import get_data

def read_pdf(file_path):
  resume_data = None
  with open(file_path, 'rb') as file:
    reader = PdfReader(file)
    resume_data = ''
    for page in reader.pages:
      resume_data += page.extract_text()
  data = get_data(resume_data)
  return data  
  

    