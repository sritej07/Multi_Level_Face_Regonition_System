# Multi-Level Face Recognition

A comprehensive face recognition system designed for individual and group authentication. This project combines advanced deep learning techniques with a MERN stack application to ensure secure access control, identity verification, and attendance tracking.

---

## 🚀 Features

### 👤 Individual Authentication
- Captures and stores multiple images of individuals for robust recognition.
- Uses CNN-based face recognition for handling variations in expressions, lighting, and angles.
- Secure storage of face embeddings and user data in MongoDB.

### 👥 Group Authentication
- Real-time face detection using MTCNN.
- Feature extraction with a pre-trained model (e.g., FaceNet or ArcFace).
- Face embeddings stored in MongoDB for efficient comparison and verification.
- Identity verification and attendance tracking in gatherings.

### 📈 Scalable Crowd Counting
- Real-time face detection with YOLO for large gatherings.
- High-density crowd counting with MCNN.

---

## 🛠️ Technologies Used

### Frontend
- **React**: User-friendly and dynamic interface.
- **React Router**: Efficient navigation and routing.

### Backend
- **Flask**: Backend logic for processing face embeddings and predictions.
- **Express.js**: API integration with the frontend.

### Database
- **MongoDB**: Secure storage for face embeddings and user data.

### Deep Learning
- **Keras-Facenet**: For generating face embeddings.
- **MTCNN**: Multi-task Cascaded Convolutional Networks for face detection.
- **YOLO**: Real-time object detection for face counting.
- **MCNN**: High-density crowd counting.

---

## ⚙️ Running the Application

To run the application locally, follow these instructions:

### 🖥️ Frontend
npm run dev
🔙 Backend
-For single-face detection and crowd counting:
python app.py
-For multi-face detection and group authentication:
nodemon server.js
