from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from typing import Optional
import json
from pathlib import Path
import requests

# Load .env file if exists
env_file = Path(__file__).parent / '.env'
if env_file.exists():
    with open(env_file, 'r') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                os.environ[key.strip()] = value.strip()

# Initialize FastAPI app
app = FastAPI(title="MedAssist AI API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "YOUR_API_KEY_HERE")
if GEMINI_API_KEY == "YOUR_API_KEY_HERE":
    print("⚠️  WARNING: GEMINI_API_KEY not set!")
else:
    print(f"✅ Gemini API Key loaded: {GEMINI_API_KEY[:10]}...")

# Pydantic models for request/response validation
class SymptomsRequest(BaseModel):
    symptoms: str
    language: Optional[str] = "en"

class DiagnosisResponse(BaseModel):
    disease_name: str
    severity: str
    causes: list[str]
    treatments: list[str]
    status: str = "success"

# Endpoint: Analyze symptoms using Gemini API
@app.post("/analyze-symptoms", response_model=DiagnosisResponse)
async def analyze_symptoms(request: SymptomsRequest):
    """
    Analyze patient symptoms using Google Gemini AI.
    Returns structured JSON with disease name, severity, causes, and treatments.
    """
    try:
        if not request.symptoms or len(request.symptoms.strip()) < 5:
            raise HTTPException(
                status_code=400, 
                detail="Please provide valid symptoms (at least 5 characters)"
            )
        
        # Construct the prompt for Gemini
        prompt = f"""You are an expert medical AI assistant. Analyze the following symptoms and provide a structured medical assessment.

Symptoms: {request.symptoms}

IMPORTANT INSTRUCTIONS:
1. Detect the language of the symptoms provided above
2. Respond in the SAME language as the symptoms
3. If symptoms are in Arabic, respond in Arabic
4. If symptoms are in English, respond in English
5. You must respond with ONLY a valid JSON object (no markdown, no code blocks, no extra text)

JSON format with exactly these keys:
- disease_name: The most likely condition or disease name (in the same language as symptoms)
- severity: One of "خفيف", "متوسط", "شديد", "حرج" (if Arabic) OR "Mild", "Moderate", "Severe", "Critical" (if English)
- causes: An array of 3-5 possible causes or risk factors (in the same language as symptoms)
- treatments: An array of 3-5 recommended treatments (in the same language as symptoms)

Example format (English):
{{
  "disease_name": "Common Cold",
  "severity": "Mild",
  "causes": ["Viral infection", "Weakened immune system", "Exposure to cold weather"],
  "treatments": ["Rest and hydration", "Over-the-counter pain relievers", "Warm fluids"]
}}

Example format (Arabic):
{{
  "disease_name": "نزلة برد",
  "severity": "خفيف",
  "causes": ["عدوى فيروسية", "ضعف جهاز المناعة", "التعرض للطقس البارد"],
  "treatments": ["الراحة والترطيب", "مسكنات الألم", "السوائل الدافئة"]
}}

CRITICAL: Return ONLY the JSON object, nothing else. Match the language of the symptoms exactly."""

        # Call Gemini API using REST (v1 API with gemini-2.5-flash)
        url = f"https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
        
        headers = {
            'Content-Type': 'application/json'
        }
        
        data = {
            "contents": [{
                "parts": [{
                    "text": prompt
                }]
            }]
        }
        
        response = requests.post(url, headers=headers, json=data, timeout=30)
        
        if response.status_code != 200:
            print(f"API Error: {response.status_code} - {response.text}")
            raise HTTPException(
                status_code=500,
                detail=f"Gemini API error: {response.status_code}"
            )
        
        result = response.json()
        
        # Extract text from response
        try:
            response_text = result['candidates'][0]['content']['parts'][0]['text'].strip()
        except (KeyError, IndexError) as e:
            print(f"Response parsing error: {e}")
            print(f"Full response: {result}")
            raise HTTPException(
                status_code=500,
                detail="Failed to parse Gemini response"
            )
        
        # Remove markdown code blocks if present
        if response_text.startswith("```json"):
            response_text = response_text.replace("```json", "").replace("```", "").strip()
        elif response_text.startswith("```"):
            response_text = response_text.replace("```", "").strip()
        
        # Parse JSON response
        try:
            diagnosis_data = json.loads(response_text)
        except json.JSONDecodeError as e:
            print(f"JSON Parse Error: {e}")
            print(f"Response text: {response_text}")
            raise HTTPException(
                status_code=500,
                detail="Failed to parse AI response. Please try again."
            )
        
        # Validate required fields
        required_fields = ["disease_name", "severity", "causes", "treatments"]
        for field in required_fields:
            if field not in diagnosis_data:
                raise HTTPException(
                    status_code=500,
                    detail=f"AI response missing required field: {field}"
                )
        
        # Return structured response
        return DiagnosisResponse(
            disease_name=diagnosis_data["disease_name"],
            severity=diagnosis_data["severity"],
            causes=diagnosis_data["causes"],
            treatments=diagnosis_data["treatments"],
            status="success"
        )
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in analyze_symptoms: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred during analysis: {str(e)}"
        )

# Health check endpoint
@app.get("/health")
async def health_check():
    """Check if the API is running and Gemini is configured"""
    gemini_configured = GEMINI_API_KEY != "YOUR_API_KEY_HERE"
    return {
        "status": "healthy",
        "gemini_configured": gemini_configured,
        "message": "MedAssist AI API is running" if gemini_configured else "Please configure GEMINI_API_KEY"
    }

# Root endpoint
@app.get("/")
async def root():
    """API information"""
    return {
        "name": "MedAssist AI API",
        "version": "1.0.0",
        "endpoints": {
            "/analyze-symptoms": "POST - Analyze patient symptoms",
            "/health": "GET - Health check",
            "/docs": "GET - API documentation"
        }
    }

# Run the application
if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting MedAssist AI FastAPI Server...")
    print("📍 Server will run at: http://localhost:8000")
    print("📚 API Documentation: http://localhost:8000/docs")
    print("⚠️  Make sure to set GEMINI_API_KEY environment variable!")
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
