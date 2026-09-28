# TripMate AI Travel Planner

TripMate AI is an intelligent travel itinerary generation platform built with React, TypeScript, and Tailwind CSS. It connects seamlessly with an Express AI backend to generate personalized, day-by-day travel itineraries with computational precision, local food gems, and smart budget saver recommendations.

---

## 1. System Architecture & Features

- **Personalized Travel Form**:
  - Departing city & destination selection with quick presets (Kyoto, Tokyo, Paris, Bali, Rome, Reykjavik).
  - Duration of stay selectors (1 Day, 3 Days, 5 Days, 7 Days, 10+ Days).
  - 3-tier budget calibration: Budget (`$`), Moderate (`$$`), Luxury (`$$$`).
  - Travel style profiles: Solo, Family, Friends, Student.
  - Food & dining filters: Local Street Food, Authentic Cuisine, Vegan / Veg, Fine Dining, Halal, Seafood Lover.
- **Backend Integration**:
  - Connects to the Express backend running at `http://localhost:3002/?trip=<query>`.
  - Generates natural language queries formatted as `Make a 5 day trip from [From] to [To] with a [Budget] budget for [Style]...`.
  - Zero Gemini API key in frontend—API keys remain protected strictly on the backend.
  - Robust offline & error fallbacks with connection retry and sample curation preview.
- **Day-by-Day Curated Layout**:
  - Scenic destination hero card with route, AI match score, budget, and key stats.
  - Horizontal day tab navigation.
  - Detailed daily timeline: Morning walk, cultural immersion, atmospheric twilight strolls.
  - Food recommendation spotlight cards with dishes, price estimates, and dietary tags.
  - AI Smart Saver Tips with localized public transport, early-bird, and pass discounts.
  - Foodie Checklist featuring dessert, street food, fine dining, and comfort bowls.
  - Sticky mobile-ergonomic actions: "Plan Another" & "Save to My Trips" with LocalStorage persistence.

---

## 2. Express Backend Setup (Port 3002)

The frontend communicates with your existing local Express backend at `http://localhost:3002`.

### Sample Express Backend (`server.js`):
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/', async (req, res) => {
  const tripPrompt = req.query.trip;
  if (!tripPrompt) {
    return res.status(400).send('Missing trip query parameter');
  }

  try {
    // Call Gemini API using GEMINI_API_KEY from backend .env
    // Return generated travel itinerary text
    res.setHeader('Content-Type', 'text/plain');
    res.send(`Itinerary generated for: ${tripPrompt}`);
  } catch (error) {
    res.status(500).send('Error generating itinerary: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`TripMate AI backend listening on port ${PORT}`);
});
```

---

## 3. Google Cloud Secret Manager Setup

Store your `GEMINI_API_KEY` securely in Secret Manager rather than hardcoding:

```bash
# 1. Create and populate the secret
gcloud secrets create GEMINI_API_KEY --replication-policy="automatic"
echo -n "YOUR_API_KEY" | gcloud secrets versions add GEMINI_API_KEY --data-file=-

# 2. Grant the Cloud Run runtime service account access
gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
  --member="serviceAccount:YOUR_PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

---

## 4. Cloud Firestore Security Rules

Deploy secure owner-bound rules in `firestore.rules` to enforce zero-leak user data isolation:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User data isolation: only the authenticated user can access their trips
    match /users/{userId}/interactions/{interactionId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /users/{userId}/saved_trips/{tripId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 5. Cloud Run Deployment Flow

Build and deploy the application to Google Cloud Run:

```bash
# 1. Build and deploy container to Cloud Run
gcloud run deploy tripmate-ai \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-secrets=GEMINI_API_KEY=GEMINI_API_KEY:latest

# 2. Apply mandatory challenge verification binding label
gcloud run services update tripmate-ai \
  --update-labels=dev-tutorial=cloud-run-ai-challenge \
  --region=us-central1
```

---

## 6. Running Locally

```bash
# Install dependencies
npm install

# Start Vite frontend dev server (port 3000)
npm run dev

# Start your Express backend on port 3002 in a separate terminal:
# node backend/server.js
```
