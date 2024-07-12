const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Exercise schema
const ExerciseSchema = new Schema({
    name: { type: String, required: true },
    sets: { type: Number, default: 0, required: true },
    reps: { type: Number, default: 0, required: true },
});

// Define the Day schema
const DaySchema = new Schema({
    day: { type: Number, required: true },
    exercises: [ExerciseSchema]
});

// Define the Workout schema
const WorkoutSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    days: [DaySchema],
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Create the Workout model
const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;