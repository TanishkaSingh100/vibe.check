import pandas as pd
import json
import os

# Defining the file paths
DATA_PATH = os.path.join("data", "indian_tourist_places_dataset.csv")
OUTPUT_PATH = os.path.join("data", "city_profiles_baseline.json")

print("Starting Data Aggregation Pipeline...")

# 1. Loading dataset
if not os.path.exists(DATA_PATH):
    print(f"Error: Could not find dataset at {DATA_PATH}")
    exit()

df = pd.read_csv(DATA_PATH)

# Cleaning missing values in critical columns
df['review_text'] = df['review_text'].fillna('')
df['category'] = df['category'].fillna('General')
df['travel_type'] = df['travel_type'].fillna('All')
df['crowd_level'] = df['crowd_level'].fillna('Medium')

# 2. Getting unique cities
cities = df['city'].unique()
print(f"Found {len(cities)} unique cities to process.")

city_profiles = {}

# 3. Aggregating the data per city
for city in cities:
    city_df = df[df['city'] == city]
    
    # Combining reviews into a single text block for the NLP layer
    all_reviews = " ".join(city_df['review_text'].tolist()[:50]) # Limiting to top 50 reviews to save token sizes later
    
    # Getting the top categories for this city
    top_categories = city_df['category'].value_counts().index.tolist()[:3]
    
    # Calculating the average rating
    avg_rating = round(city_df['user_rating'].mean(), 2)
    
    # Determining the local lifestyle features
    primary_travel_type = city_df['travel_type'].mode()[0] if not city_df['travel_type'].empty else "General"
    typical_crowd = city_df['crowd_level'].mode()[0] if not city_df['crowd_level'].empty else "Medium"
    
    # Saving into structured baseline dictionary
    city_profiles[city] = {
        "city_name": city,
        "state": city_df['state'].iloc[0],
        "top_categories": top_categories,
        "average_rating": float(avg_rating) if not pd.isna(avg_rating) else 4.0,
        "primary_travel_vibe": primary_travel_type,
        "typical_crowd_level": typical_crowd,
        "raw_reviews_combined": all_reviews[:4000] # Cap character length for smooth processing
    }

# 4. Saving the baseline data structure
with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    json.dump(city_profiles, f, indent=4, ensure_ascii=False)

print(f"Success! Generated baseline profiles for {len(city_profiles)} cities.")
print(f"Saved file directly to: {OUTPUT_PATH}")