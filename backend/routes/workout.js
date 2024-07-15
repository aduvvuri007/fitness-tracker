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

// delete a workout
router.delete('/:id', deleteWorkout);

// update a workout
router.patch('/:id', updateWorkout);


module.exports = router;