from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)

# ================= LOAD MODELS =================
crop_model = tf.keras.models.load_model("models/crop_identifier.h5", compile=False)
wheat_model = tf.keras.models.load_model("models/wheat_disease_model.h5", compile=False)
rice_model  = tf.keras.models.load_model("models/rice_disease_model.h5", compile=False)
corn_model  = tf.keras.models.load_model("models/corn_disease_model.h5", compile=False)

# ================= CLASSES =================
CROP_CLASSES = ["Wheat", "Rice", "Corn"]

WHEAT_CLASSES = [
    "Aphid","Black Rust","Blast","Brown Rust","Common Root Rot",
    "Fusarium Head Blight","Healthy","Leaf Blight","Mildew",
    "Mite","Septoria","Smut","Stem Fly","Tan Spot","Yellow Rust"
]

RICE_CLASSES = ["Bacterial Blight", "Blast", "Brown Spot", "Tungro"]

CORN_CLASSES = ["Common Rust", "Gray Leaf Spot", "Blight", "Healthy"]

# ================= TREATMENT DATA =================
TREATMENT_DB = {

    # ---- Wheat ----
    "Aphid": {
        "spray": "Imidacloprid / Neem Oil",
        "fertilizer": "Potassium-rich fertilizer",
        "advice": "Avoid excessive nitrogen (زیادہ نائٹروجن کے استعمال سے گریز کریں)"
    },
    "Black Rust": {
        "spray": "Propiconazole / Tebuconazole",
        "fertilizer": "Balanced NPK",
        "advice": "Use resistant wheat varieties (زنگ سے محفوظ اقسام کاشت کریں)"
    },
    "Blast": {
        "spray": "Tricyclazole",
        "fertilizer": "Silicon-based fertilizer",
        "advice": "Avoid excess nitrogen (نائٹروجن کی زیادتی سے بچیں)"
    },
    "Brown Rust": {
        "spray": "Mancozeb",
        "fertilizer": "Balanced NPK",
        "advice": "Early fungicide application (ابتدائی مرحلے پر سپرے کریں)"
    },
    "Common Root Rot": {
        "spray": "Carbendazim",
        "fertilizer": "Organic compost",
        "advice": "Improve drainage (پانی کے نکاس کو بہتر بنائیں)"
    },
    "Fusarium Head Blight": {
        "spray": "Tebuconazole",
        "fertilizer": "Potassium fertilizer",
        "advice": "Avoid late irrigation (آخری مرحلے پر پانی نہ لگائیں)"
    },
    "Leaf Blight": {
        "spray": "Chlorothalonil",
        "fertilizer": "Phosphorus-rich",
        "advice": "Remove infected residue (متاثرہ باقیات کو ہٹا دیں)"
    },
    "Mildew": {
        "spray": "Sulfur fungicide",
        "fertilizer": "Balanced nutrients",
        "advice": "Improve air circulation (ہوا کے گزر کو بہتر بنائیں)"
    },
    "Mite": {
        "spray": "Abamectin",
        "fertilizer": "Potassium",
        "advice": "Avoid water stress (پانی کی کمی سے بچائیں)"
    },
    "Septoria": {
        "spray": "Azoxystrobin",
        "fertilizer": "Nitrogen in moderation",
        "advice": "Crop rotation (فصلوں کی تبدیلی کریں)"
    },
    "Smut": {
        "spray": "Seed treatment fungicide",
        "fertilizer": "Organic compost",
        "advice": "Use certified seeds (تصدیق شدہ بیج استعمال کریں)"
    },
    "Stem Fly": {
        "spray": "Lambda-cyhalothrin",
        "fertilizer": "Nitrogen balanced",
        "advice": "Early sowing (جلدی کاشت کریں)"
    },
    "Tan Spot": {
        "spray": "Mancozeb",
        "fertilizer": "Potassium-rich",
        "advice": "Residue management (کھیت کی صفائی رکھیں)"
    },
    "Yellow Rust": {
        "spray": "Propiconazole",
        "fertilizer": "Balanced NPK",
        "advice": "Resistant varieties (مزاحم اقسام لگائیں)"
    },

    # ---- Rice ----
    "Bacterial Blight": {
        "spray": "Streptocycline + Copper",
        "fertilizer": "Potassium",
        "advice": "Avoid standing water (کھیت میں پانی کھڑا نہ ہونے دیں)"
    },
    "Brown Spot": {
        "spray": "Mancozeb",
        "fertilizer": "Nitrogen balanced",
        "advice": "Soil nutrient correction (مٹی کی غذائیت درست کریں)"
    },
    "Tungro": {
        "spray": "Imidacloprid",
        "fertilizer": "Balanced nutrients",
        "advice": "Control leafhoppers (لیفسوپر کیڑے پر قابو رکھیں)"
    },

    # ---- Corn ----
    "Common Rust": {
        "spray": "Propiconazole",
        "fertilizer": "Potassium-rich",
        "advice": "Early fungicide spray (ابتدائی سپرے کریں)"
    },
    "Gray Leaf Spot": {
        "spray": "Azoxystrobin",
        "fertilizer": "Nitrogen balanced",
        "advice": "Crop rotation (فصلوں کی تبدیلی کریں)"
    },
    "Blight": {
        "spray": "Mancozeb",
        "fertilizer": "Phosphorus-rich",
        "advice": "Avoid overhead irrigation (اوپر سے پانی دینے سے گریز کریں)"
    },

    # ---- Healthy ----
    "Healthy": {
        "spray": "Not required",
        "fertilizer": "As per soil test",
        "advice": "Continue monitoring (فصل کی نگرانی جاری رکھیں)"
    }
}


# ================= IMAGE PREPROCESS =================
def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))
    img = np.array(img) / 255.0
    return np.expand_dims(img, axis=0)

# ================= PREDICT =================
@app.route("/predict", methods=["POST"])
def predict():
    img_tensor = preprocess_image(request.files["image"].read())

    crop_probs = crop_model.predict(img_tensor)[0]
    crop_idx = np.argmax(crop_probs)
    crop = CROP_CLASSES[crop_idx]

    model, classes = (
        (wheat_model, WHEAT_CLASSES) if crop == "Wheat" else
        (rice_model, RICE_CLASSES) if crop == "Rice" else
        (corn_model, CORN_CLASSES)
    )

    probs = model.predict(img_tensor)[0]
    top_idx = np.argsort(probs)[-3:][::-1]

    top3 = [{
        "disease": classes[i],
        "confidence": round(float(probs[i]) * 100, 2)
    } for i in top_idx]

    best = top3[0]
    disease = best["disease"] if best["confidence"] >= 60 else "Healthy"

    return jsonify({
        "crop": crop,
        "disease": disease,
        "top3": top3,
        "treatment": TREATMENT_DB.get(disease)
    })

if __name__ == "__main__":
    app.run(debug=True)
