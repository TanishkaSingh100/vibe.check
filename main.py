from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import chromadb
from sentence_transformers import SentenceTransformer
import os
import json

app = FastAPI()

# SECURITY: Allow our future React frontend to talk to this API

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows any local frontend to connect
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. --- INITIALIZE AI AND VECTOR DB ---

CHROMA_PATH = os.path.join("data", "chroma_db")
chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)
collection = chroma_client.get_collection(name="city_personalities")
print("Loading Local Embedding Model...")
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
print("AI Engine Ready!")

# 2. --- DEFINE DATA STRUCTURE ---

class UserPreferences(BaseModel):
    vibe: str
    crowd: str
    activity: str

# 3. --- CREATE THE API ENDPOINT ---

@app.post("/api/match")
def get_match(prefs: UserPreferences):
    # Synthesize the DNA string from React frontend inputs
    user_dna = f"I want a {prefs.vibe} vibe. I prefer {prefs.crowd}. I enjoy {prefs.activity}."
    
    # Convert to vector and search ChromaDB
    user_vector = embedding_model.encode(user_dna).tolist()
    results = collection.query(
        query_embeddings=[user_vector],
        n_results=1
    )
    
    # Extract the winning city and send it back as JSON
    if results['metadatas'] and results['metadatas'][0]:
        best_match = results['metadatas'][0][0]
        return {
            "matched_city": best_match['city_name'],
            "vibe_summary": best_match['vibe_summary'],
            "famous_for": json.loads(best_match['famous_for']),
            "hidden_gems": json.loads(best_match['hidden_gems']),
            "lifestyle": best_match['local_lifestyle_analysis']
        }
    
    return {"error": "No match found"}