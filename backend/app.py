from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import cv2
import numpy as np
from datetime import datetime
import re
import pytesseract
from deepface import DeepFace
from mtcnn import MTCNN

# ------------------- Flask Setup -------------------

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ------------------- Utility Functions -------------------

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_age_from_id(image_path):
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 120, 255, cv2.THRESH_BINARY)
    text = pytesseract.image_to_string(thresh)

    dob_match = re.search(r'(\d{2}[-/.\s]\d{2}[-/.\s]\d{4})', text)
    if dob_match:
        dob_str = dob_match.group(1).replace(" ", "/").replace("-", "/").replace(".", "/")
        try:
            dob = datetime.strptime(dob_str, "%d/%m/%Y")
            today = datetime.today()
            age = (today - dob).days // 365
            return age if 0 <= age <= 130 else None
        except ValueError:
            return None
    return None

def preprocess_image(image):
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    channels = cv2.split(image)
    return cv2.merge([clahe.apply(ch) for ch in channels])

detector = MTCNN()
def extract_face(image_path, output_path, size=(160, 160)):
    image = cv2.imread(image_path)
    image = preprocess_image(image)
    faces = detector.detect_faces(image)
    if faces:
        x, y, w, h = faces[0]['box']
        x, y = max(0, x), max(0, y)
        face = image[y:y + h, x:x + w]
        face = cv2.resize(face, size)
        cv2.imwrite(output_path, face)
        return True
    return False

# ------------------- API Endpoint -------------------

@app.route('/verify', methods=['POST'])
def verify_identity():
    try:
        if 'id_image' not in request.files or 'selfie_image' not in request.files:
            return jsonify({'error': 'Both ID image and selfie are required'}), 400

        id_image = request.files['id_image']
        selfie_image = request.files['selfie_image']

        if not allowed_file(id_image.filename) or not allowed_file(selfie_image.filename):
            return jsonify({'error': 'Only image files are allowed (.jpg, .jpeg, .png, .bmp)'}), 400

        # Save images
        id_path = os.path.join(UPLOAD_FOLDER, 'id_image.jpg')
        selfie_path = os.path.join(UPLOAD_FOLDER, 'selfie_image.jpg')
        id_image.save(id_path)
        selfie_image.save(selfie_path)

        # Extract age
        age = extract_age_from_id(id_path)
        if age is None:
            return jsonify({'error': 'Could not extract valid age from ID'}), 400
        age_verified = age >= 18

        # Extract faces
        id_face_path = os.path.join(UPLOAD_FOLDER, 'id_face.jpg')
        selfie_face_path = os.path.join(UPLOAD_FOLDER, 'selfie_face.jpg')

        id_face_found = extract_face(id_path, id_face_path)
        selfie_face_found = extract_face(selfie_path, selfie_face_path)

        if not id_face_found or not selfie_face_found:
            return jsonify({'error': 'Face not detected in one or both images'}), 400

        # Verify face
        result = DeepFace.verify(
            img1_path=id_face_path,
            img2_path=selfie_face_path,
            model_name="ArcFace",
            enforce_detection=False,
            distance_metric="cosine"
        )

        distance = result['distance']
        threshold = 0.6
        min_confidence = 70
        is_verified = distance < threshold
        confidence = round(max(0, 1 - distance) * 100, 2)
        face_ok = is_verified and confidence >= min_confidence

        return jsonify({
            'match': face_ok,
            'distance': round(distance, 4),
            'confidence': confidence,
            'age': age,
            'age_verified': age_verified
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ------------------ Run App -------------------

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
