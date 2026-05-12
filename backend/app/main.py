import sys
import os

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import predict

app = FastAPI(
    title="MedAssist AI API",
    description="AI-powered medical image analysis backend",
    version="1.0.0"
)

# Allow frontend to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict.router, prefix="/api/v1", tags=["predict"])


@app.get("/")
def root():
    return {"status": "ok", "message": "MedAssist AI Backend is running"}


@app.get("/health")
def health():
    return {"status": "healthy"}
