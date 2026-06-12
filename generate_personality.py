import os
import json
import time
from google import genai
from google.genai import types

# Initializing Gemini client

api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print("Error: GEMINI_API_KEY environment variable not found.")
    exit()

client = genai.Client(api_key=api_key)

# Defining file paths

INPUT_PATH = os.path.join("data", "city_profiles_baseline.json")
OUTPUT_PATH = os.path.join("data", "city_final_personalities.json")

print("Waking up the Resilient Gemini Engine...")

# Loading baseline requirements

with open(INPUT_PATH, "r", encoding="utf-8") as f:
    city_profiles = json.load(f)

# CHECKPOINT: Loading the existing progress if file exists, otherwise start clean

final_enriched_profiles = {}
if os.path.exists(OUTPUT_PATH):
    try:
        with open(OUTPUT_PATH, "r", encoding="utf-8") as f:
            final_enriched_profiles = json.load(f)
        print(f"Found existing checkpoint dataset. {len(final_enriched_profiles)} cities already processed.")
    except Exception:
        print("Checkpoint file was empty or corrupted, starting fresh.")

SYSTEM_PROMPT = """
You are an expert cultural geographer and data analyst. Your job is to analyze raw tourist reviews and metadata for a specific city and synthesize it into a structured, highly accurate 'Place Personality Report'.

You must return your output ONLY as a valid JSON object. Do not include any markdown styling (like ```json), backticks, or extra conversational text outside the JSON.

Expected JSON schema output structure:
{
    "city_name": "Name of City",
    "personality_traits": ["Trait1", "Trait2", "Trait3"],
    "vibe_summary": "A 2-sentence highly cinematic description of what it actually feels like to stand there.",
    "famous_for": ["Reason 1", "Reason 2"],
    "hidden_gems": ["Lesser known spot 1", "Lesser known spot 2"],
    "safety_insights": {
        "female_safety_score": 8.5,
        "night_travel_suitability": "High/Moderate/Low",
        "crowd_intensity": "High/Medium/Low",
        "context": "Brief 1-sentence sentence explaining safety conditions based on reviews."
    },
    "local_lifestyle_analysis": "Brief analysis answering if it is fast-paced, friendly, or best suited for families/students/solo travelers."
}
"""

# Iterating through the cities

for city_name, data in city_profiles.items():
    # SKIP if we already have this city documented from the previous run
    if city_name in final_enriched_profiles:
        print(f"Skipping {city_name} (Already processed in checkpoint).")
        continue
        
    print(f"Generating AI Personality Report for missing city: {city_name}...")
    
    user_prompt = f"""
    City: {data['city_name']}
    State: {data['state']}
    Primary Travel Type: {data['primary_travel_vibe']}
    Typical Crowd Level: {data['typical_crowd_level']}
    Dominant Categories: {', '.join(data['top_categories'])}
    
    Raw Review Snippets to analyze:
    "{data['raw_reviews_combined']}"
    
    Synthesize this data perfectly into the required JSON layout structure.
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[SYSTEM_PROMPT, user_prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        
        parsed_json = json.loads(response.text.strip())
        final_enriched_profiles[city_name] = parsed_json
        
        # Save IMMEDIATELY after each successful city so we never lose data again
        with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
            json.dump(final_enriched_profiles, f, indent=4, ensure_ascii=False)
            
        print(f"Successfully profiled {city_name} and updated database!")
        time.sleep(3)  # Slightly higher pause buffer to let the API cool down
        
    except Exception as e:
        print(f"Failed to process {city_name}. Error: {e}")
        continue

print(f"\nVerification Complete! Complete database active at: {OUTPUT_PATH}")