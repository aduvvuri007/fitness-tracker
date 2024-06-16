import json
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load the JSON data from the file
with open('exercises.json', 'r') as f:
    data = json.load(f)

name, force, level, equipment, primary_muscles, secondary_muscles, category = [], [], [], [], [], [], []
equipment_filter = ['barbell', 'dumbbell', 'machine', "e-z curl bar", "cable"]

# Iterate over each muscle group and each exercise within that group
for muscle_group in data:
    for exercise in data[muscle_group]:
        if exercise.get('equipment') in equipment_filter:
            name.append(exercise['name'])
            level.append(exercise.get('level', 'N/A'))  # Assuming 'level' corresponds to 'difficulty'
            equipment.append(exercise.get('equipment', 'N/A'))
            primary_muscles.append(exercise.get('primaryMuscles'))
            secondary_muscles.append(exercise.get('secondaryMuscles'))
            category.append(exercise.get('category'))

# Create a DataFrame
df = pd.DataFrame({'name': name, 'level': level, 'equipment': equipment, 'primary_muscles': primary_muscles, 'secondary_muscles': secondary_muscles, 'category': category})

weights = {
    'primary_muscles': 3,
    'secondary_muscles': 2,
    'category': 3,
    'name': 1
}

# Create the weighted features column
df['features'] = df.apply(lambda x: ' '.join(x['primary_muscles'] * weights['primary_muscles'] +
                                             x['secondary_muscles'] * weights['secondary_muscles'] +
                                             [x['category']] * weights['category'] +
                                             [x['name']] * weights['name']), axis=1)

# Create a TF-IDF Vectorizer
vectorizer = TfidfVectorizer()

# Fit and transform the features
tfidf_matrix = vectorizer.fit_transform(df['features'])

# Compute cosine similarity
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

def get_recommendations(name, selected_exercises=[], num_exercises=2, cosine_sim=cosine_sim):
    # Get the index of the exercise
    idx = df[df['name'] == name].index[0]

    # Get the pairwise similarity scores
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sort the exercises based on similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the scores of the most similar exercises
    sim_scores = sim_scores[1:num_exercises+1]

    # Get the exercise indices
    exercise_indices = [i[0] for i in sim_scores]

    exercise_indices = [idx for idx in exercise_indices if df['name'].iloc[idx] not in selected_exercises]

    # Return the most similar exercises
    return df['name'].iloc[exercise_indices].tolist()

# Muscle groups for workout routines
push_muscles = ['chest', 'shoulders', 'triceps']
pull_muscles = ['middle back', 'biceps', 'forearms', 'lower back', 'lats', 'traps']
legs_muscles = ['quadriceps', 'hamstrings', 'calves', 'glutes']

arnold_day_1 = ['chest', 'chest', 'middle back', 'lower back', 'lats', 'traps']
arnold_day_2 = ['shoulders', 'biceps', 'forearms', 'triceps']
arnold_day_3 = ['quadriceps', 'hamstrings', 'calves', 'glutes']

def select_exercises_from_muscle_group(muscles, num_exercises_per_muscle=2):
    strength_df = df[df['category'] == 'strength']
    selected_exercises = []
    for muscle in muscles:
        # Filter the DataFrame for exercises targeting the current muscle
        filtered_df = strength_df[strength_df['primary_muscles'].apply(lambda x: muscle in x)].copy()
        
        # Select the specified number of random exercises for the current muscle
        exercises = filtered_df.sample(n=num_exercises_per_muscle)['name'].tolist()
        selected_exercises.extend(exercises)
    
    return selected_exercises

def generate_ppl_workout():
    # Select exercises for push muscles
    selected_exercises = select_exercises_from_muscle_group(push_muscles, num_exercises_per_muscle=2)

    # Get recommendations for each selected exercise
    push_recommendations = []
    for exercise in selected_exercises:
        push_recommendations.extend(get_recommendations(exercise, push_recommendations))

    # Select exercises for pull muscles
    selected_exercises = select_exercises_from_muscle_group(pull_muscles, num_exercises_per_muscle=1)

    # Get recommendations for each selected exercise
    pull_recommendations = []
    for exercise in selected_exercises:
        pull_recommendations.extend(get_recommendations(exercise, pull_recommendations))

    # Select exercises for leg muscles
    selected_exercises = select_exercises_from_muscle_group(legs_muscles, num_exercises_per_muscle=1)

    # Get recommendations for each selected exercise
    legs_recommendations = []
    for exercise in selected_exercises:
        legs_recommendations.extend(get_recommendations(exercise, legs_recommendations))

    workout = {
        'push': push_recommendations,
        'pull': pull_recommendations,
        'legs': legs_recommendations
    }

    return workout

def generate_arnold_workout():
    # Select exercises for Arnold's day 1 muscles
    selected_exercises = select_exercises_from_muscle_group(arnold_day_1, num_exercises_per_muscle=1)

    # Get recommendations for each selected exercise
    day_1_recommendations = []
    for exercise in selected_exercises:
        day_1_recommendations.extend(get_recommendations(exercise, day_1_recommendations))

    # Select exercises for Arnold's day 2 muscles
    selected_exercises = select_exercises_from_muscle_group(arnold_day_2, num_exercises_per_muscle=2)

    # Get recommendations for each selected exercise
    day_2_recommendations = []
    for exercise in selected_exercises:
        day_2_recommendations.extend(get_recommendations(exercise, day_2_recommendations))

    # Select exercises for Arnold's day 3 muscles
    selected_exercises = select_exercises_from_muscle_group(arnold_day_3, num_exercises_per_muscle=2)

    # Get recommendations for each selected exercise
    day_3_recommendations = []
    for exercise in selected_exercises:
        day_3_recommendations.extend(get_recommendations(exercise, day_3_recommendations))

    workout = {
        'day_1': day_1_recommendations,
        'day_2': day_2_recommendations,
        'day_3': day_3_recommendations
    }

    return workout

def generate_other_exercises(exercise):
    return get_recommendations(exercise, [exercise], num_exercises=15)
