from flask import Flask, request, jsonify
from exercise_suggestor import generate_ppl_workout, generate_arnold_workout, generate_other_exercises
from flask_cors import CORS


app = Flask(__name__)
CORS(app) 

@app.route('/api/generate_ppl_workout', methods=['GET'])
def generate_ppl():
    workout = generate_ppl_workout()
    return jsonify(workout)

@app.route('/api/generate_arnold_workout', methods=['GET'])
def generate_arnold():
    workout = generate_arnold_workout()
    return jsonify(workout)

@app.route('/api/generate_other_exercises', methods=['POST'])
def generate_other():
    exercise = request.json.get('exercise')
    if not exercise:
        return jsonify({'error': 'Exercise not provided'}), 400
    recommendations = generate_other_exercises(exercise)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(port=5000)
