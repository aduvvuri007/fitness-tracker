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
import Navbar from './components/Navbar';

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={!user ? <Home /> : <Dashboard />} />
        <Route path="/register" element={!user ? <Register /> : <Dashboard />} />
        <Route path="/login" element={!user ? <Login /> : <Dashboard />} />
        <Route path="/workout" element={user ? <Workout /> : <Home />} />
        <Route path="/exercises" element={user ? <ExerciseList /> : <Home />} />
        <Route path="/exercises/:name" element={user ? <ExerciseDetails /> : <Home />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;