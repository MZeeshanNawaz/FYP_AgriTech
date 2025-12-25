from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import logging

# ================= APP SETUP =================
app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)

# ================= LOAD MODELS =================
crop_model = tf.keras.models.load_model(
    "models/crop_identifier.h5",
    compile=False
)

wheat_model = tf.keras.models.load_model(
    "models/wheat_disease_model.h5",
    compile=False
)
rice_model = tf.keras.models.load_model(
    "models/rice_disease_model.h5",
    compile=False
)
corn_model = tf.keras.models.load_model(
    "models/corn_disease_model.h5",
    compile=False
)

# ================= CLASS LABELS =================
# ⚠️ MUST MATCH train_gen.class_indices EXACTLY
CROP_CLASSES = ["Corn", "Rice", "Wheat"]

WHEAT_DISEASE_CLASSES = [
    "Aphid",
    "Black Rust",
    "Blast",
    "Brown Rust",
    "Common Root Rot",
    "Fusarium Head Blight",
    "Healthy",
    "Leaf Blight",
    "Mildew",
    "Mite",
    "Septoria",
    "Smut",
    "Stem Fly",
    "Tan Spot",
    "Yellow Rust"
]

RICE_DISEASE_CLASSES = [
    "Bacterial Blight",
    "Blast",
    "Brown Spot",
    "Tungro"
]

CORN_DISEASE_CLASSES = [
    "Common Rust",
    "Gray Leaf Spot",
    "Blight",
    "Healthy"
]

# ================= IMAGE PREPROCESS =================
def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    return img

# ================= PREDICTION ROUTE =================
@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image_bytes = request.files["image"].read()
    img_tensor = preprocess_image(image_bytes)

    # -------- Crop Prediction --------
    crop_preds = crop_model.predict(img_tensor)
    crop_index = int(np.argmax(crop_preds))
    crop_conf = float(np.max(crop_preds))

    crop_name = CROP_CLASSES[crop_index]

    logging.info(f"CROP PREDICTION: {crop_name} | confidence={crop_conf:.3f}")

    # -------- FALLBACK IF LOW CONFIDENCE --------
    if crop_conf < 0.60:
        return jsonify({
            "crop": "Uncertain",
            "crop_confidence": round(crop_conf * 100, 2),
            "disease": "Please upload a clearer leaf image"
        })

    # -------- Disease Prediction --------
    if crop_name == "Wheat":
        preds = wheat_model.predict(img_tensor)
        classes = WHEAT_DISEASE_CLASSES

    elif crop_name == "Rice":
        preds = rice_model.predict(img_tensor)
        classes = RICE_DISEASE_CLASSES

    else:  # Corn
        preds = corn_model.predict(img_tensor)
        classes = CORN_DISEASE_CLASSES

    disease_index = int(np.argmax(preds))
    disease_conf = float(np.max(preds))
    disease_name = classes[disease_index]

    logging.info(
        f"DISEASE PREDICTION: {disease_name} | confidence={disease_conf:.3f}"
    )

    return jsonify({
        "crop": crop_name,
        "crop_confidence": round(crop_conf * 100, 2),
        "disease": disease_name,
        "disease_confidence": round(disease_conf * 100, 2)
    })

# ================= RUN =================
if __name__ == "__main__":
    app.run(debug=True)
