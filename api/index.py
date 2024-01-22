from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/resume', methods=['POST'])
def post_resume():
    return { "message": "Hello, World!" }

if __name__ == '__main__':
    app.run(port=5000)