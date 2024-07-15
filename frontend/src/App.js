import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import "./App.css";
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Workout from './pages/Workout';
import ExerciseList from './pages/ExerciseList';
import ExerciseDetails from './pages/ExerciseDetails';
import CustomWorkout from './pages/CustomWorkout';
import WorkoutList from './pages/WorkoutList';
import WorkoutDetails from './pages/WorkoutDetails';
import Navbar from './components/Navbar';

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={!user ? <Home /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/workout" element={user ? <Workout /> : <Home />} />
        <Route path="/exercises" element={user ? <ExerciseList /> : <Home />} />
        <Route path="/exercises/:name" element={user ? <ExerciseDetails /> : <Home />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Home />} />
        <Route path="/custom-workout" element={user ? <CustomWorkout /> : <Home />} />
        <Route path="/workouts" element={user ? <WorkoutList /> : <Home />} />
        <Route path="/workout/:id" element={user ? <WorkoutDetails /> : <Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;