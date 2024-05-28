const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');
const auth = require('../middleware/auth'); // Middleware to protect routes

// Add a new exercise
router.post('/', auth, async (req, res) => {
    const { name, category, duration, caloriesBurned } = req.body;
    try {
        const exercise = new Exercise({
            name,
            category,
            duration,
            caloriesBurned,
            user: req.user.id
        });

        await exercise.save();
        res.status(201).json(exercise);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all exercises for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const exercises = await Exercise.find({ user: req.user.id });
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get exercises by category for the logged-in user
router.get('/:category', auth, async (req, res) => {
    try {
        const exercises = await Exercise.find({ user: req.user.id, category: req.params.category });
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update an exercise
router.put('/:id', auth, async (req, res) => {
    const { name, category, duration, caloriesBurned } = req.body;
    try {
        let exercise = await Exercise.findById(req.params.id);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        // Ensure the user owns the exercise
        if (exercise.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        exercise = await Exercise.findByIdAndUpdate(
            req.params.id,
            { $set: { name, category, duration, caloriesBurned } },
            { new: true }
        );

        res.json(exercise);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete an exercise
router.delete('/:id', auth, async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        // Ensure the user owns the exercise
        if (exercise.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await exercise.remove();
        res.json({ message: 'Exercise removed' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;