from flask import Flask, request
from flask_cors import CORS
from scrape import read_pdf

import tempfile
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/resume', methods=['POST'])
def post_resume():
    file = request.files['pdfFile']
    temp_dir = tempfile.gettempdir()
    temp_file = tempfile.NamedTemporaryFile(delete=False, dir=temp_dir)
    try:
      file.save(temp_file.name)
      resume_data = read_pdf(temp_file.name)
      return { "message": resume_data }
    finally:
      temp_file.close()
      os.remove(temp_file.name)

if __name__ == '__main__':
    app.run(port=5000)