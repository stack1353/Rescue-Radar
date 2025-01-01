from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load the animal classifier model
MODEL_PATH = 'animal_classifier_model-2.h5'  # Update this to the actual path of your model
model = tf.keras.models.load_model(MODEL_PATH)

# Define a function to preprocess the image
def preprocess_image(image_bytes):
    try:
        # Open the image
        image = Image.open(io.BytesIO(image_bytes))
        # Resize the image to the input size of your model
        image = image.resize((224, 224))  # Update dimensions if needed
        # Convert to numpy array
        image_array = np.array(image)
        # Normalize pixel values (0 to 1)
        image_array = image_array / 255.0
        # Add batch dimension
        image_array = np.expand_dims(image_array, axis=0)
        return image_array
    except Exception as e:
        print(f"Error in preprocessing: {e}")
        return None

@app.route('/')
def home():
    return "Animal Classifier API is running!"

@app.route('/classify', methods=['POST'])
def classify():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    try:
        # Read the file
        image_bytes = file.read()
        # Preprocess the image
        preprocessed_image = preprocess_image(image_bytes)

        if preprocessed_image is None:
            return jsonify({'error': 'Image preprocessing failed'}), 400

        # Predict using the model
        predictions = model.predict(preprocessed_image)
        # Assuming the model outputs probabilities for each class
        predicted_class = np.argmax(predictions[0])

        # You may want to map the predicted_class to actual labels
        class_labels = ['Cat', 'Dog', 'Horse', 'Elephant']  # Update these labels as per your model
        label = class_labels[predicted_class]

        return jsonify({'predicted_class': label, 'confidence': float(predictions[0][predicted_class])})

    except Exception as e:
        print(f"Error in classification: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
