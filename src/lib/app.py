from flask import Flask, jsonify, request
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3001"}})

tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")
model = AutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn")

@app.route('/process_text', methods=['POST'])
def process_text():
    data = request.get_json()
    text = data['text']

    inputs = tokenizer(text, return_tensors="pt", max_length=1024, truncation=True)
    summary_ids = model.generate(inputs['input_ids'], max_length=150, min_length=40, length_penalty=2.0, num_beams=4, early_stopping=True)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

    return jsonify({'processed_text': summary})

if __name__ == '__main__':
    app.run(debug=True)
