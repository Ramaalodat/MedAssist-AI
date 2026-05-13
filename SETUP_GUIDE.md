# MedAssist AI - Symptom Analysis Setup Guide

## 🚀 Complete Setup Instructions

This guide will help you set up the **Symptom Analysis** feature using Google Gemini API with FastAPI backend.

---

## 📋 Prerequisites

1. **Python 3.8+** installed on your system
2. **Google Gemini API Key** (Get it from [Google AI Studio](https://makersuite.google.com/app/apikey))
3. **Modern web browser** (Chrome, Firefox, Edge, Safari)

---

## 🔧 Installation Steps

### Step 1: Install Python Dependencies

Open your terminal/command prompt in the project directory and run:

```bash
pip install -r requirements.txt
```

This will install:
- `fastapi` - Modern web framework for building APIs
- `uvicorn` - ASGI server for running FastAPI
- `google-generativeai` - Google Gemini API client
- `pydantic` - Data validation
- `python-multipart` - For handling form data

### Step 2: Configure Gemini API Key

You have **two options** to set your API key:

#### Option A: Environment Variable (Recommended)

**Windows (Command Prompt):**
```cmd
set GEMINI_API_KEY=your_api_key_here
```

**Windows (PowerShell):**
```powershell
$env:GEMINI_API_KEY="your_api_key_here"
```

**Linux/Mac:**
```bash
export GEMINI_API_KEY=your_api_key_here
```

#### Option B: Direct in Code

Edit `app.py` and replace line 17:
```python
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "YOUR_API_KEY_HERE")
```

Change to:
```python
GEMINI_API_KEY = "your_actual_api_key_here"
```

⚠️ **Security Note:** Never commit your API key to version control!

---

## 🏃 Running the Application

### Step 1: Start the FastAPI Backend

In your terminal, run:

```bash
python app.py
```

You should see:
```
🚀 Starting MedAssist AI FastAPI Server...
📍 Server will run at: http://localhost:8000
📚 API Documentation: http://localhost:8000/docs
⚠️  Make sure to set GEMINI_API_KEY environment variable!
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 2: Open the Frontend

Open `new-diagnosis.html` in your web browser:

**Option 1:** Double-click the file

**Option 2:** Use a local server (recommended):
```bash
# Python 3
python -m http.server 8080

# Then open: http://localhost:8080/new-diagnosis.html
```

---

## 🎯 How to Use

1. **Enter Symptoms**: Type detailed symptoms in the text area
   - Example: "Persistent headache for 3 days, fever (38.5°C), fatigue and body aches"

2. **Click "Analyze Symptoms"**: The AI will process your input

3. **View Results**: 
   - Disease name/diagnosis
   - Severity level (Mild, Moderate, Severe, Critical)
   - Possible causes
   - Recommended treatments

---

## 🔍 API Endpoints

### 1. Analyze Symptoms
- **URL:** `POST http://localhost:8000/analyze-symptoms`
- **Request Body:**
```json
{
  "symptoms": "headache, fever, fatigue",
  "language": "en"
}
```
- **Response:**
```json
{
  "disease_name": "Common Cold",
  "severity": "Mild",
  "causes": ["Viral infection", "Weakened immune system"],
  "treatments": ["Rest", "Hydration", "Pain relievers"],
  "status": "success"
}
```

### 2. Health Check
- **URL:** `GET http://localhost:8000/health`
- **Response:**
```json
{
  "status": "healthy",
  "gemini_configured": true,
  "message": "MedAssist AI API is running"
}
```

### 3. API Documentation
- **URL:** `http://localhost:8000/docs`
- Interactive Swagger UI for testing endpoints

---

## 🛠️ Troubleshooting

### Issue: "Failed to analyze symptoms"
**Solution:** 
- Check if backend is running on port 8000
- Verify GEMINI_API_KEY is set correctly
- Check browser console for CORS errors

### Issue: "Module not found" errors
**Solution:**
```bash
pip install --upgrade -r requirements.txt
```

### Issue: Port 8000 already in use
**Solution:** Change port in `app.py`:
```python
uvicorn.run(app, host="0.0.0.0", port=8001, reload=True)
```
And update `API_URL` in `new-diagnosis.html`:
```javascript
const API_URL = 'http://localhost:8001';
```

### Issue: CORS errors in browser
**Solution:** The backend already has CORS enabled. If issues persist:
1. Use a local server to serve HTML files (not file://)
2. Check browser console for specific error messages

---

## 📁 Project Structure

```
MedAssist-AI/
├── app.py                  # FastAPI backend with Gemini integration
├── new-diagnosis.html      # Symptom analysis frontend
├── requirements.txt        # Python dependencies
├── SETUP_GUIDE.md         # This file
└── ...other files
```

---

## 🔐 Security Best Practices

1. **Never expose your API key** in client-side code
2. **Use environment variables** for sensitive data
3. **Implement rate limiting** in production
4. **Add authentication** for production deployment
5. **Validate all user inputs** on the backend

---

## 🚀 Production Deployment

For production, consider:

1. **Use a production ASGI server:**
```bash
gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker
```

2. **Add authentication middleware**
3. **Implement rate limiting**
4. **Use HTTPS**
5. **Set up proper logging**
6. **Add input sanitization**

---

## 📝 Medical Disclaimer

⚠️ **IMPORTANT:** This AI system is for **informational purposes only** and should NOT replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.

---

## 🤝 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all dependencies are installed
3. Ensure API key is valid and has quota
4. Check terminal/console for error messages

---

## 📄 License

This project is for educational and demonstration purposes.

---

## 🎉 You're All Set!

Your symptom analysis system is now ready to use. Start the backend, open the frontend, and begin analyzing symptoms with AI!
