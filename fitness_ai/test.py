import json
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def load_data(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

def filter_data(data, equipment_filter=['barbell', 'dumbbell', 'machine', "e-z curl bar", "cable"]):
    name, level, equipment, primary_muscles, secondary_muscles, category = [], [], [], [], [], []
    
    for muscle_group in data:
        for exercise in data[muscle_group]:
            if exercise.get('equipment') in equipment_filter:
                name.append(exercise['name'])
                level.append(exercise.get('level', 'N/A'))
                equipment.append(exercise.get('equipment', 'N/A'))
                primary_muscles.append(exercise.get('primaryMuscles'))
                secondary_muscles.append(exercise.get('secondaryMuscles'))
                category.append(exercise.get('category'))

    df = pd.DataFrame({'name': name, 'level': level, 'equipment': equipment, 'primary_muscles': primary_muscles, 'secondary_muscles': secondary_muscles, 'category': category})
    return df

def select_exercises_from_muscle_groups(df):
    strength_df = df[df['category'] == 'strength']
    selected_exercises = {}

    muscles = ["chest", "shoulders", "triceps", "biceps", "forearms", "middle back", "lats", "lower back", "quadriceps", "hamstrings", "calves", "glutes", "traps"]

    for muscle in muscles:
        filtered_df = strength_df[strength_df['primary_muscles'].apply(lambda x: muscle in x)].copy()
        exercises = filtered_df['name'].tolist()
        selected_exercises[muscle] = exercises

    return selected_exercises

