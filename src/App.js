import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Game from './components/game.js';
import Login from './components/loginandregister.js';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const url = "https://waffles-backend-666679246883.us-central1.run.app"
  return (
    <Router>
      <Routes>
        {/* Default route redirects to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;