const express = require('express');

const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require user to be authenticated
router.use(requireAuth);

// create a workout
router.post('/create-workout', createWorkout);

// get all workouts
router.get('/get-workouts', getWorkouts);

// get a workout
router.get('/:id', getWorkout);

// update a workout
router.patch('/:id', updateWorkout);

// delete a workout
router.delete('/:id', deleteWorkout);

module.exports = router;