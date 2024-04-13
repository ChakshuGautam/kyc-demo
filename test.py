from flask import Flask, request
from flask_cors import CORS  # Import the CORS extension

app = Flask(__name__)

# Configure CORS with supports_credentials set to True
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/', defaults={'path': ''}, methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'])
@app.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'])
def echo(path):
    print(request.data.decode)
    data = request.data.decode('utf-8')
    print(f"printing data {data} and path {path}")
    return path

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
