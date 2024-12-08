from flask import Flask, request, jsonify
from pymongo import MongoClient
import numpy as np
from PIL import Image
import io
from keras_facenet import FaceNet
from sklearn.metrics.pairwise import cosine_similarity
from numpy.linalg import norm
from flask_cors import CORS 
from scipy.spatial.distance import euclidean
from mtcnn import MTCNN
from scipy.spatial.distance import cosine
import torch
import cv2

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array




app = Flask(__name__)
CORS(app)  
client = MongoClient('mongodb://localhost:27017/')
db = client['face_recognition_db']
embeddings_collection = db['embeddings']


embedder = FaceNet()
detector = MTCNN()



model_custom = load_model('cnn_embedding_model.h5')

def generate_embeddings(image_array):
    image = np.expand_dims(image_array, axis=0) 
    embeddings = model_custom.predict(image) 
    return embeddings

@app.route('/compare_custom', methods=['POST'])
def compare_faces():
    if 'file' not in request.files or 'phoneNumber' not in request.form:
        return jsonify({'error': 'Missing data'}), 400

    phone_number = request.form['phoneNumber']
    file = request.files['file']

    try:
        image = Image.open(io.BytesIO(file.read())).resize((32, 32))
        image_array = np.array(image) / 255.0
        if image_array.shape != (32, 32, 3):
            return jsonify({'error': 'Invalid image format'}), 400
    except Exception as e:
        return jsonify({'error': f'Error processing image: {str(e)}'}), 400

    try:
        captured_embeddings = generate_embeddings(image_array)
    except Exception as e:
        return jsonify({'error': f'Error generating embeddings: {str(e)}'}), 500
    user_data = embeddings_collection.find_one({'phone_number': phone_number})
    if not user_data:
        return jsonify({'error': 'User not found'}), 404

    stored_embeddings = np.array(user_data['embeddings'])

    try:
        similarity = (1 - cosine(captured_embeddings[0], stored_embeddings[0]))*10
        is_match = similarity > 0.4  # Set similarity threshold
    except Exception as e:
        return jsonify({'error': f'Error comparing embeddings: {str(e)}'}), 500

    return jsonify({'match':bool(is_match), 'similarity': similarity})



if __name__ == '__main__':
    app.run(debug=True)