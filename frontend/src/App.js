import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import "./App.css";
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Workout from './pages/Workout';
import ExerciseList from './pages/ExerciseList';
import ExerciseDetails from './pages/ExerciseDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/exercises" element={<ExerciseList />} />
        <Route path="/exercises/:name" element={<ExerciseDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;