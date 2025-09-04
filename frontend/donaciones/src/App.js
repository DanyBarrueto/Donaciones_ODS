import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaPrincipal from './components/PaginaPrincipal';
import Login from './components/Login';
import Register from './components/Register';
import Explorador from './components/Explorador';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explorador" element={<Explorador />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
