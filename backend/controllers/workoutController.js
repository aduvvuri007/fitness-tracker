const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

const createWorkout = async (req, res) => {
    const { days } = req.body;

    try {
        const userId = req.user._id;
        const workout = await Workout.create({ userId, days });

        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getWorkouts = async (req, res) => {
    const userId = req.user._id;

    try {
        const workouts = await Workout.find({ userId });

        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}

const deleteWorkout = async (req, res) => {
    const { workoutId } = req.params;

    try {
        await Workout.findOneAndDelete(workoutId);

        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' });
    }

    res.status(200).json(workout);
};

module.exports = { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout };