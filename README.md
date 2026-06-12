# vibe.check

> **An AI-powered, interactive scrapbook that reads your travel DNA and matches you with your soulmate city.**

Ditch the boring travel blogs. **vibe.check** is a full-stack, aesthetic-driven web application that uses Vector Retrieval-Augmented Generation (RAG) to analyze your travel preferences and generate a highly personalized, Pinterest-style digital scrapbook of your perfect destination.

## Features
* **AI Vibe Check:** Take a quick personality quiz to determine your main character energy, crowd tolerance, and side quest preferences.
* **Vector Search Engine:** Uses a local AI embedding model and ChromaDB to mathematically map your answers to the perfect city profile.
* **Dynamic Scrapbooks:** Auto-generates a gorgeous, interactive Polaroid grid featuring secret spots, local lore, stunning views, and must-try local foods.
* **Pinterest Aesthetic:** Built with a premium, vintage, storybook UI featuring custom hover states, layout shifts, and interactive map pins.

## Tech Stack
* **Frontend:** React, Vite, Tailwind CSS, Lucide Icons
* **Backend:** Python, FastAPI
* **AI & Data:** SentenceTransformers (all-MiniLM-L6-v2), ChromaDB (Vector Database), Pandas

## How to Run Locally

You will need two terminal windows open to run the brain (backend) and the face (frontend).

**Terminal 1: Start the AI Backend**

# Activate your virtual environment
venv\Scripts\activate

# Run the FastAPI server
uvicorn main:app --reload
Terminal 2: Start the React Frontend

# Navigate to the frontend directory
cd frontend

# Start the Vite development server
npm run dev
Open http://localhost:5173 in your browser to start your journey!


### Step 3: Push the README to GitHub

Save the file and close Notepad. Now, let's send this beautiful document straight to your GitHub page. 

Run these three quick commands in your terminal:

git add README.md

git commit -m "docs: add gorgeous project README"

git push
