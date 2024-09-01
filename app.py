from flask import Flask, request, jsonify, send_from_directory
from huggingface_hub import hf_hub_download
import joblib
import os

app = Flask(__name__)

# Load the model and vectorizer using Hugging Face Hub
model = joblib.load(hf_hub_download("dattu145/Email-spam-classifier", "model.pkl"))
vectorizer = joblib.load(hf_hub_download("dattu145/Email-spam-classifier", "vectorizer.pkl"))

@app.route('/classify', methods=['POST'])
def classify_text():
    data = request.json
    message = data['message']
    vectorized_message = vectorizer.transform([message])
    prediction = model.predict(vectorized_message)[0]
    probability = model.predict_proba(vectorized_message)[0]

    return jsonify({
        'category': 'spam' if prediction == 1 else 'ham',
        'probability': {
            'spam': probability[1],
            'ham': probability[0]
        }
    })

@app.route('/')
def serve_html():
    return send_from_directory(os.path.dirname(__file__), 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
