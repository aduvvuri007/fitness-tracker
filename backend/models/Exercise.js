const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['cardio', 'sports', 'weightlifting'], required: true },
    duration: { type: Number, required: true }, // duration in minutes
    caloriesBurned: { type: Number, required: true }, // estimated calories burned
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);
module.exports = Exercise;