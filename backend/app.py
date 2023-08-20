from flask import Flask
import cohere

app = Flask(__name__)
@app.route('/prompt')

def prompt():
 co = cohere.Client('uMOsOiLKyUjoJL1fIoqVUhUiveizJt2Qdslj64Bw')

response = co.generate(
  prompt='Generate a random sentence',
)
print(response)