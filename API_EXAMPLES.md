# MedAssist AI - API Usage Examples

## 📚 Complete API Reference with Examples

---

## 🔗 Base URL
```
http://localhost:8000
```

---

## 1️⃣ Analyze Symptoms Endpoint

### Endpoint Details
- **Method:** `POST`
- **URL:** `/analyze-symptoms`
- **Content-Type:** `application/json`

### Request Schema

```json
{
  "symptoms": "string (required, min 5 characters)",
  "language": "string (optional, default: 'en')"
}
```

### Example 1: Basic Symptom Analysis

**Request:**
```bash
curl -X POST "http://localhost:8000/analyze-symptoms" \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms": "I have a severe headache, high fever of 39°C, and extreme fatigue for the past 2 days",
    "language": "en"
  }'
```

**Response:**
```json
{
  "disease_name": "Influenza (Flu)",
  "severity": "Moderate",
  "causes": [
    "Influenza virus infection",
    "Weakened immune system",
    "Exposure to infected individuals",
    "Seasonal factors"
  ],
  "treatments": [
    "Rest and adequate sleep",
    "Antiviral medications (if prescribed)",
    "Fever reducers (acetaminophen or ibuprofen)",
    "Increased fluid intake",
    "Isolation to prevent spread"
  ],
  "status": "success"
}
```

### Example 2: Respiratory Symptoms

**Request:**
```javascript
// JavaScript fetch example
fetch('http://localhost:8000/analyze-symptoms', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    symptoms: "Persistent dry cough for 5 days, shortness of breath, chest tightness, and wheezing",
    language: "en"
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

**Response:**
```json
{
  "disease_name": "Asthma Exacerbation",
  "severity": "Moderate",
  "causes": [
    "Allergen exposure",
    "Respiratory infection",
    "Air pollution or irritants",
    "Exercise-induced triggers",
    "Medication non-compliance"
  ],
  "treatments": [
    "Bronchodilator inhaler (rescue inhaler)",
    "Corticosteroid medications",
    "Avoid known triggers",
    "Breathing exercises",
    "Emergency medical care if severe"
  ],
  "status": "success"
}
```

### Example 3: Digestive Issues

**Request (Python):**
```python
import requests

response = requests.post(
    'http://localhost:8000/analyze-symptoms',
    json={
        'symptoms': 'Severe abdominal pain, nausea, vomiting, and diarrhea for 24 hours',
        'language': 'en'
    }
)

print(response.json())
```

**Response:**
```json
{
  "disease_name": "Acute Gastroenteritis",
  "severity": "Moderate",
  "causes": [
    "Viral infection (norovirus, rotavirus)",
    "Bacterial infection (E. coli, Salmonella)",
    "Food poisoning",
    "Contaminated water",
    "Poor hygiene"
  ],
  "treatments": [
    "Oral rehydration solutions",
    "BRAT diet (bananas, rice, applesauce, toast)",
    "Anti-nausea medications",
    "Probiotics",
    "Medical attention if symptoms persist"
  ],
  "status": "success"
}
```

### Example 4: Skin Conditions

**Request:**
```json
{
  "symptoms": "Red, itchy rash on arms and legs, small bumps, worsens at night",
  "language": "en"
}
```

**Response:**
```json
{
  "disease_name": "Allergic Dermatitis",
  "severity": "Mild",
  "causes": [
    "Contact with allergens",
    "Insect bites",
    "Certain fabrics or materials",
    "Cosmetics or skincare products",
    "Environmental factors"
  ],
  "treatments": [
    "Topical corticosteroid cream",
    "Antihistamine medications",
    "Cool compresses",
    "Avoid scratching",
    "Identify and avoid triggers"
  ],
  "status": "success"
}
```

---

## 2️⃣ Health Check Endpoint

### Endpoint Details
- **Method:** `GET`
- **URL:** `/health`

### Example Request

**cURL:**
```bash
curl http://localhost:8000/health
```

**JavaScript:**
```javascript
fetch('http://localhost:8000/health')
  .then(response => response.json())
  .then(data => console.log(data));
```

**Response:**
```json
{
  "status": "healthy",
  "gemini_configured": true,
  "message": "MedAssist AI API is running"
}
```

---

## 3️⃣ Root Endpoint (API Info)

### Endpoint Details
- **Method:** `GET`
- **URL:** `/`

### Example Request

**Browser:** Navigate to `http://localhost:8000`

**Response:**
```json
{
  "name": "MedAssist AI API",
  "version": "1.0.0",
  "endpoints": {
    "/analyze-symptoms": "POST - Analyze patient symptoms",
    "/health": "GET - Health check",
    "/docs": "GET - API documentation"
  }
}
```

---

## 🔍 Interactive API Documentation

FastAPI provides automatic interactive documentation:

### Swagger UI
- **URL:** `http://localhost:8000/docs`
- Features:
  - Try out endpoints directly in browser
  - View request/response schemas
  - See example values
  - Test with different inputs

### ReDoc
- **URL:** `http://localhost:8000/redoc`
- Alternative documentation interface
- Clean, readable format

---

## ⚠️ Error Responses

### 400 Bad Request - Invalid Input
```json
{
  "detail": "Please provide valid symptoms (at least 5 characters)"
}
```

### 500 Internal Server Error - AI Processing Failed
```json
{
  "detail": "Failed to parse AI response. Please try again."
}
```

### 500 Internal Server Error - General Error
```json
{
  "detail": "An error occurred during analysis: [error message]"
}
```

---

## 🧪 Testing with Different Tools

### 1. Using cURL (Command Line)

```bash
# Windows (Command Prompt)
curl -X POST "http://localhost:8000/analyze-symptoms" ^
  -H "Content-Type: application/json" ^
  -d "{\"symptoms\": \"headache and fever\", \"language\": \"en\"}"

# Linux/Mac
curl -X POST "http://localhost:8000/analyze-symptoms" \
  -H "Content-Type: application/json" \
  -d '{"symptoms": "headache and fever", "language": "en"}'
```

### 2. Using Postman

1. Create new POST request
2. URL: `http://localhost:8000/analyze-symptoms`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "symptoms": "your symptoms here",
  "language": "en"
}
```

### 3. Using Python Requests

```python
import requests
import json

def analyze_symptoms(symptoms_text):
    url = "http://localhost:8000/analyze-symptoms"
    payload = {
        "symptoms": symptoms_text,
        "language": "en"
    }
    
    response = requests.post(url, json=payload)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return None

# Example usage
result = analyze_symptoms("I have a headache and fever")
if result:
    print(f"Disease: {result['disease_name']}")
    print(f"Severity: {result['severity']}")
```

### 4. Using JavaScript (Browser/Node.js)

```javascript
async function analyzeSymptoms(symptoms) {
  try {
    const response = await fetch('http://localhost:8000/analyze-symptoms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symptoms: symptoms,
        language: 'en'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Disease:', data.disease_name);
    console.log('Severity:', data.severity);
    console.log('Causes:', data.causes);
    console.log('Treatments:', data.treatments);
    
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example usage
analyzeSymptoms("I have a persistent cough and sore throat");
```

---

## 💡 Best Practices

1. **Be Specific:** Provide detailed symptom descriptions
   - ✅ Good: "Sharp chest pain on the left side, worsens with deep breathing, started 2 hours ago"
   - ❌ Bad: "chest pain"

2. **Include Duration:** Mention how long symptoms have persisted
   - ✅ "Headache for 3 days"
   - ❌ "Headache"

3. **Mention Severity:** Describe intensity when relevant
   - ✅ "Severe abdominal pain, 8/10 intensity"
   - ❌ "Stomach hurts"

4. **List Multiple Symptoms:** Include all relevant symptoms
   - ✅ "Fever (39°C), cough, fatigue, body aches"
   - ❌ "Not feeling well"

5. **Error Handling:** Always implement proper error handling in your code

---

## 🔐 Security Notes

- This API currently has no authentication (for development only)
- In production, implement:
  - API key authentication
  - Rate limiting
  - Input sanitization
  - HTTPS encryption
  - Request logging

---

## 📞 Support

If you encounter issues:
1. Check if server is running: `http://localhost:8000/health`
2. View API docs: `http://localhost:8000/docs`
3. Check server logs in terminal
4. Verify GEMINI_API_KEY is configured

---

## ⚕️ Medical Disclaimer

This API is for **educational and informational purposes only**. It should NOT be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers.
