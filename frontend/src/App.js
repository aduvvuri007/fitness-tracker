import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import "./App.css";
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Workout from './pages/Workout';
import ExerciseList from './pages/ExerciseList';
import ExerciseDetails from './pages/ExerciseDetails';

const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Check if token exists in localStorage
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={!isAuthenticated() ? <Home /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated() ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!isAuthenticated() ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/workout" element={isAuthenticated() ? <Workout /> : <Navigate to="/login" />} />
        <Route path="/exercises" element={isAuthenticated() ? <ExerciseList /> : <Navigate to="/login" />} />
        <Route path="/exercises/:name" element={isAuthenticated() ? <ExerciseDetails /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;