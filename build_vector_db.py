import os
import json
import chromadb
from sentence_transformers import SentenceTransformer

# 1. Defining folder and file paths

INPUT_PATH = os.path.join("data", "city_final_personalities.json")
CHROMA_PATH = os.path.join("data", "chroma_db")

print("Initializing Vector Search Database Engine...")

if not os.path.exists(INPUT_PATH):
    print(f"Error: Missing required profile dataset at {INPUT_PATH}")
    exit()

with open(INPUT_PATH, "r", encoding="utf-8") as f:
    city_personalities = json.load(f)

# 2. Init ChromaDB Persistent Client (Saves vector indices locally as local files)

chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)

# Creating or extracting our targeted collection

collection = chroma_client.get_or_create_collection(name="city_personalities")

# 3. Loading local light-weight embedding model

# This runs locally completely free without needing any network tokens
print("Loading Local Embedding Model (all-MiniLM-L6-v2)...")
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

print("Vectorizing and indexing city blueprints into ChromaDB...")

for city_key, data in city_personalities.items():
    # Synthesizing a highly descriptive semantic string representing the city's unique DNA

    traits_str = ", ".join(data['personality_traits'])
    city_dna_text = (
        f"City: {data['city_name']}. "
        f"Traits: {traits_str}. "
        f"Vibe: {data['vibe_summary']} "
        f"Lifestyle Analysis: {data['local_lifestyle_analysis']}"
    )
    
    # Calculaing a mathematical embedding vector

    vector = embedding_model.encode(city_dna_text).tolist()
    
    # ChromaDB metadata can only accept primitive types (str, int, float, bool).
    # We json.dumps() lists to prevent type errors.

    metadata = {
        "city_name": data['city_name'],
        "vibe_summary": data['vibe_summary'],
        "personality_traits": json.dumps(data['personality_traits']),
        "famous_for": json.dumps(data['famous_for']),
        "hidden_gems": json.dumps(data['hidden_gems']),
        "female_safety_score": float(data['safety_insights']['female_safety_score']),
        "night_travel_suitability": data['safety_insights']['night_travel_suitability'],
        "crowd_intensity": data['safety_insights']['crowd_intensity'],
        "safety_context": data['safety_insights']['context'],
        "local_lifestyle_analysis": data['local_lifestyle_analysis']
    }
    
    # upsert ensures entries update cleanly if executed multiple times

    collection.upsert(
        ids=[city_key],
        embeddings=[vector],
        documents=[city_dna_text],
        metadatas=[metadata]
    )
    print(f"Indexed Vector Blueprint for: {data['city_name']}")

print(f"\nSuccess! Vector Knowledge Base built and persistent at: {CHROMA_PATH}")