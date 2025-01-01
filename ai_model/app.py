from flask import Flask, render_template, request
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import os

# Initialize the Flask app
app = Flask(__name__)

# Load the trained model
MODEL_PATH = 'animal_classifier_model-2.h5'
model = load_model(MODEL_PATH)

# Define class labels
CLASS_LABELS = ['Cat', 'Dog', 'Snake']

# Define a route for the homepage
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Check if the file was uploaded
        if 'file' not in request.files or request.files['file'].filename == '':
            return render_template('index.html', error="Please upload an image.")

        # Get the uploaded file
        file = request.files['file']

        # Save the file to a temporary location
        file_path = os.path.join('static', file.filename)
        file.save(file_path)

        # Preprocess the image
        image = load_img(file_path, target_size=(150, 150))  # Resize to match training dimensions
        image_array = img_to_array(image)  # Convert to array
        image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension
        image_array /= 255.0  # Normalize

        # Make a prediction
        predictions = model.predict(image_array)
        predicted_class = CLASS_LABELS[np.argmax(predictions)]

        return render_template(
            'index.html',
            prediction=predicted_class,
            image_path=file_path
        )

    return render_template('index.html')

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
