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
from flask_cors import CORS
from flask_socketio import SocketIO
import base64
import time
import threading


from tensorflow.keras.models import load_model
#from tensorflow.keras.preprocessing.image import img_to_array




app = Flask(__name__)
CORS(app)  
client = MongoClient('mongodb://localhost:27017/')
db = client['MLFR']
embeddings_collection = db['embeddings']


embedder = FaceNet()
detector = MTCNN()

@app.route('/register', methods=['POST'])
def upload_image():
    try:
        data = request.get_json()
        name = data.get('name')
        roll = data.get('roll')
        image_data = data.get('image')

        if not name or not roll or not image_data:
            return jsonify({'error': 'Missing data'}), 400

        image_bytes = base64.b64decode(image_data.split(',')[1])
        image = Image.open(io.BytesIO(image_bytes))
        image = np.array(image)

        embeddings = embedder.embeddings([image])

        embeddings_data = {
            'name': name,
            'roll': roll,
            'embeddings': embeddings.tolist()
        }

        result = embeddings_collection.insert_one(embeddings_data)

        return jsonify({'message': 'Image processed and embeddings saved.', 'id': str(result.inserted_id)})
    
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500


@app.route('/recognize', methods=['POST'])
def compare_face():
    try:
        data = request.get_json()
        base64_image = data.get('image')
        model = data.get('model')
        roll = data.get('roll')

        if not base64_image:
            return jsonify({'success': False, 'message': 'Missing image data'}), 400

        print(f"Received roll: {roll}")
        print(f"Received model: {model}")

        # Decode the base64 image
        image_bytes = base64.b64decode(base64_image)
        image = Image.open(io.BytesIO(image_bytes))
        image = np.array(image)

        print(f"Image shape: {image.shape}")

        if len(image.shape) != 3:
            return jsonify({'success': False, 'message': 'Invalid image format, expected 3D array (H, W, C)'}), 400

        captured_embeddings = embedder.embeddings([image])
        print(f"Captured embeddings: {captured_embeddings}")

        user_data = embeddings_collection.find_one({"roll": roll})
        print(f"User data: {user_data}")

        if not user_data:
            return jsonify({'success': False, 'message': 'User not found'}), 404

        stored_embeddings = np.array(user_data['embeddings'])

        def are_faces_same(embeddings1, embeddings2, threshold=0.8):
            distance = euclidean(embeddings1[0], embeddings2[0])
            print(f"Distance: {distance}")
            return distance < threshold, distance

        is_match, distance = are_faces_same(captured_embeddings, stored_embeddings)

        if is_match:
            return jsonify({'success': True, 'name': user_data['name'], 'roll': user_data['roll']})
        else:
            return jsonify({'success': False, 'message': f'Face not recognized. Distance: {distance:.2f}'})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'success': False, 'message': str(e)}), 500


# model_custom = load_model('cnn_embedding_model.h5')
# def generate_embeddings(image_array):
#     image = np.expand_dims(image_array, axis=0) 
#     embeddings = model_custom.predict(image) 
#     return embeddings

# @app.route('/compare_custom', methods=['POST'])
# def compare_faces():
#     if 'file' not in request.files or 'phoneNumber' not in request.form:
#         return jsonify({'error': 'Missing data'}), 400

#     phone_number = request.form['phoneNumber']
#     file = request.files['file']

#     try:
#         image = Image.open(io.BytesIO(file.read())).resize((32, 32))
#         image_array = np.array(image) / 255.0
#         if image_array.shape != (32, 32, 3):
#             return jsonify({'error': 'Invalid image format'}), 400
#     except Exception as e:
#         return jsonify({'error': f'Error processing image: {str(e)}'}), 400

#     try:
#         captured_embeddings = generate_embeddings(image_array)
#     except Exception as e:
#         return jsonify({'error': f'Error generating embeddings: {str(e)}'}), 500
#     user_data = embeddings_collection.find_one({'phone_number': phone_number})
#     if not user_data:
#         return jsonify({'error': 'User not found'}), 404

#     stored_embeddings = np.array(user_data['embeddings'])

#     try:
#         similarity = (1 - cosine(captured_embeddings[0], stored_embeddings[0]))*10
#         is_match = similarity > 0.4  # Set similarity threshold
#     except Exception as e:
#         return jsonify({'error': f'Error comparing embeddings: {str(e)}'}), 500

#     return jsonify({'match':bool(is_match), 'similarity': similarity})



# ************************************

#crowd counting

socketio = SocketIO(app, cors_allowed_origins="*")


yolo_model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
yolo_model.eval()

# Global variables for webcam streaming
is_capturing = False
cap = None
capture_thread = None

def process_frame(frame):
    results = yolo_model(frame)
    persons = results.pandas().xyxy[0]
    persons = persons[persons['name'] == 'person']
    count = len(persons)
    for _, row in persons.iterrows():
        cv2.rectangle(frame, (int(row['xmin']), int(row['ymin'])), (int(row['xmax']), int(row['ymax'])), (255, 0, 0), 2)
    # cv2.putText(frame, f'Count: {count}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    return frame, count

def capture_frames():
    global is_capturing, cap
    while is_capturing:
        ret, frame = cap.read()
        if ret:
            frame, count = process_frame(frame)
            _, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = base64.b64encode(buffer).decode('utf-8')
            socketio.emit('frame_update', {'frame': frame_bytes, 'count': count})
        time.sleep(1)

@socketio.on('start_stream')
def start_stream():
    global is_capturing, cap, capture_thread
    if not is_capturing:
        cap = cv2.VideoCapture(0)
        is_capturing = True
        capture_thread = threading.Thread(target=capture_frames)
        capture_thread.start()

@socketio.on('stop_stream')
def stop_stream():
    global is_capturing, cap
    is_capturing = False
    if cap:
        cap.release()


if __name__ == '__main__':
    app.run(debug=True)


