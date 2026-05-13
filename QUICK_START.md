# 🚀 Quick Start - Get Running in 5 Minutes!

## ⚡ Super Fast Setup

### 1️⃣ Get Your Gemini API Key (2 minutes)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2️⃣ Install & Configure (1 minute)

**Windows Users:**
```cmd
# Install dependencies
pip install -r requirements.txt

# Set your API key (replace with your actual key)
set GEMINI_API_KEY=your_api_key_here
```

**Mac/Linux Users:**
```bash
# Install dependencies
pip install -r requirements.txt

# Set your API key (replace with your actual key)
export GEMINI_API_KEY=your_api_key_here
```

### 3️⃣ Start the Server (30 seconds)

**Option A: Using Python directly**
```bash
python app.py
```

**Option B: Using the batch file (Windows only)**
```cmd
start_server.bat
```

You should see:
```
🚀 Starting MedAssist AI FastAPI Server...
📍 Server will run at: http://localhost:8000
📚 API Documentation: http://localhost:8000/docs
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### 4️⃣ Open the Frontend (30 seconds)

**Option A: Direct file open**
- Double-click `new-diagnosis.html`

**Option B: Using a local server (recommended)**
```bash
# Python 3
python -m http.server 8080

# Then open in browser: http://localhost:8080/new-diagnosis.html
```

### 5️⃣ Test It! (1 minute)

1. In the textarea, type:
   ```
   I have a persistent headache for 3 days, fever around 38.5°C, 
   fatigue, and body aches. I also have difficulty sleeping.
   ```

2. Click **"Analyze Symptoms"**

3. Wait a few seconds for AI analysis

4. See your results! 🎉

---

## ✅ Verify Everything Works

Run the test script:
```bash
python test_api.py
```

You should see:
```
🧪 MedAssist AI API Test Suite
✅ Health check passed!
✅ Symptom analysis successful!
🎉 All tests passed!
```

---

## 🎯 What You Get

### Backend Features:
- ✅ FastAPI server on port 8000
- ✅ Gemini AI integration
- ✅ Structured JSON responses
- ✅ Auto-generated API docs

### Frontend Features:
- ✅ Beautiful dark/light mode UI
- ✅ Easy symptom input
- ✅ Real-time AI analysis
- ✅ Detailed results display

---

## 📱 Usage Example

### Input:
```
Severe sore throat, difficulty swallowing, 
fever of 39°C, swollen lymph nodes in neck
```

### Output:
```json
{
  "disease_name": "Strep Throat (Streptococcal Pharyngitis)",
  "severity": "Moderate",
  "causes": [
    "Group A Streptococcus bacteria",
    "Close contact with infected person",
    "Weakened immune system"
  ],
  "treatments": [
    "Antibiotics (penicillin or amoxicillin)",
    "Pain relievers",
    "Warm salt water gargles",
    "Rest and hydration"
  ]
}
```

---

## 🔗 Important URLs

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | `new-diagnosis.html` | Main user interface |
| **API Server** | `http://localhost:8000` | Backend API |
| **API Docs** | `http://localhost:8000/docs` | Interactive API documentation |
| **Health Check** | `http://localhost:8000/health` | Server status |

---

## 🆘 Common Issues & Fixes

### ❌ "Cannot connect to API"
**Fix:** Make sure the backend server is running
```bash
python app.py
```

### ❌ "Module not found"
**Fix:** Install dependencies
```bash
pip install -r requirements.txt
```

### ❌ "Please configure GEMINI_API_KEY"
**Fix:** Set your API key
```bash
# Windows
set GEMINI_API_KEY=your_key_here

# Mac/Linux
export GEMINI_API_KEY=your_key_here
```

### ❌ "Port 8000 already in use"
**Fix:** Kill the process or use a different port
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <process_id> /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
```

---

## 📚 Next Steps

1. ✅ **Read the full documentation:**
   - `SETUP_GUIDE.md` - Detailed setup instructions
   - `API_EXAMPLES.md` - API usage examples
   - `IMPLEMENTATION_SUMMARY.md` - Technical overview

2. ✅ **Explore the API:**
   - Visit `http://localhost:8000/docs`
   - Try different symptom inputs
   - Test with Postman or cURL

3. ✅ **Customize:**
   - Modify the UI in `new-diagnosis.html`
   - Add new features to `app.py`
   - Integrate with your existing system

---

## 🎨 UI Preview

```
┌─────────────────────────────────────────────────────────┐
│  ClinicalMind                                           │
│  AI Medical Intelligence                                │
│                                                         │
│  ┌─────────────────┐  ┌─────────────────┐             │
│  │ Enter Symptoms  │  │  AI Analysis    │             │
│  │                 │  │                 │             │
│  │ [Text Area]     │  │  Disease: Flu   │             │
│  │                 │  │  Severity: Mod  │             │
│  │                 │  │                 │             │
│  │                 │  │  Causes: 4      │             │
│  │ [Analyze Btn]   │  │  Treatments: 5  │             │
│  └─────────────────┘  └─────────────────┘             │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  Detailed Analysis                                │ │
│  │  • Causes        • Treatments                     │ │
│  │  • Disclaimer                                     │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 💡 Pro Tips

1. **Be Specific:** More detailed symptoms = better analysis
2. **Include Duration:** "3 days" is better than "recently"
3. **Mention Severity:** "Severe pain" vs "mild discomfort"
4. **List Everything:** Include all relevant symptoms
5. **Use the Docs:** Explore `http://localhost:8000/docs`

---

## ⚕️ Important Reminder

**This is NOT a replacement for professional medical advice!**

Always consult with qualified healthcare providers for:
- Accurate diagnosis
- Treatment plans
- Medical emergencies
- Prescription medications

---

## 🎉 You're Ready!

Your medical diagnosis system is now up and running. Start analyzing symptoms with AI! 🚀

**Need help?** Check the documentation files or run `python test_api.py` to diagnose issues.

---

**Happy Coding! 💻⚕️**
