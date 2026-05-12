import io
import os
import numpy as np
from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from fastapi.responses import JSONResponse
from PIL import Image
import tensorflow as tf

router = APIRouter()

# ─── Model loading ───────────────────────────────────────────────────────────
MODEL_PATH = os.path.join(
    os.path.dirname(__file__),          # routes/
    "..", "..", "..", "..", "..",        # back to project root
    "ml_models", "model.keras"
)
MODEL_PATH = os.path.abspath(MODEL_PATH)

_model = None  # lazy-loaded once


def get_model():
    global _model
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"Model file not found at: {MODEL_PATH}")
        print(f"[MedAssist] Loading model from {MODEL_PATH} …")
        _model = tf.keras.models.load_model(MODEL_PATH)
        print("[MedAssist] Model loaded successfully.")
        print(f"[MedAssist] Input shape: {_model.input_shape}")
        print(f"[MedAssist] Output shape: {_model.output_shape}")
    return _model


# ─── Class labels ─────────────────────────────────────────────────────────────
# Generic labels – adjust these to match what the model was trained on
DEFAULT_LABELS = {
    1: ["Normal", "Pneumonia"],
    2: ["Normal", "Pneumonia"],
    3: ["Normal", "Bacterial Pneumonia", "Viral Pneumonia"],
    4: ["Glioma", "Meningioma", "No Tumor", "Pituitary"],
    7: [
        "Akiec (Actinic Keratoses)",
        "Bcc (Basal Cell Carcinoma)",
        "Bkl (Benign Keratosis)",
        "Df (Dermatofibroma)",
        "Mel (Melanoma)",
        "Nv (Melanocytic Nevi)",
        "Vasc (Vascular Lesions)",
    ],
}


def get_labels(num_classes: int):
    return DEFAULT_LABELS.get(num_classes, [f"Class {i}" for i in range(num_classes)])


# ─── Endpoints ────────────────────────────────────────────────────────────────

@router.get("/model-info")
def model_info():
    """Return model metadata (input/output shapes, classes)."""
    try:
        model = get_model()
        num_classes = model.output_shape[-1]
        labels = get_labels(num_classes)
        return {
            "status": "loaded",
            "model_path": MODEL_PATH,
            "input_shape": list(model.input_shape),
            "output_shape": list(model.output_shape),
            "num_classes": num_classes,
            "labels": labels,
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"status": "error", "detail": str(e)})


@router.post("/predict")
async def predict(
    file: UploadFile = File(...),
    analysis_type: str = Form(default="auto"),
):
    """
    Upload a medical image (JPG / PNG / DICOM) and get an AI prediction.
    """
    # ── Validate file type ────────────────────────────────────────────────
    allowed = {"image/jpeg", "image/png", "image/jpg", "application/dicom"}
    if file.content_type and file.content_type not in allowed:
        # Accept anything image-like even if mime is wrong
        if not file.filename.lower().endswith((".jpg", ".jpeg", ".png", ".dcm")):
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type: {file.content_type}. Use JPG, PNG or DICOM.",
            )

    # ── Read image ────────────────────────────────────────────────────────
    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="Empty file uploaded.")

    try:
        img = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Cannot open image. Make sure the file is a valid image.")

    # ── Load model & derive expected input ────────────────────────────────
    try:
        model = get_model()
    except FileNotFoundError as e:
        raise HTTPException(status_code=503, detail=str(e))

    input_shape = model.input_shape  # e.g. (None, 224, 224, 3)
    target_h = input_shape[1] if input_shape[1] else 224
    target_w = input_shape[2] if input_shape[2] else 224

    # ── Preprocess ────────────────────────────────────────────────────────
    img_resized = img.resize((target_w, target_h))
    img_array = np.array(img_resized, dtype=np.float32) / 255.0
    img_batch = np.expand_dims(img_array, axis=0)  # (1, H, W, 3)

    # ── Inference ─────────────────────────────────────────────────────────
    try:
        preds = model.predict(img_batch, verbose=0)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model inference error: {str(e)}")

    probs = preds[0].tolist()
    num_classes = len(probs)
    labels = get_labels(num_classes)

    # Build results list sorted by confidence
    results = sorted(
        [
            {
                "label": labels[i] if i < len(labels) else f"Class {i}",
                "confidence": round(float(probs[i]) * 100, 2),
            }
            for i in range(num_classes)
        ],
        key=lambda x: x["confidence"],
        reverse=True,
    )

    top = results[0]
    return {
        "success": True,
        "filename": file.filename,
        "analysis_type": analysis_type,
        "prediction": {
            "label": top["label"],
            "confidence": top["confidence"],
        },
        "all_classes": results,
        "model_input_shape": [target_h, target_w],
    }
