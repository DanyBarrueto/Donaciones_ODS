import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaPrincipal from './components/PaginaPrincipal';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
