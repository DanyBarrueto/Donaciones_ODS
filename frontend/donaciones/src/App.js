import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaPrincipal from './components/PaginaPrincipal';
import Login from './components/Login';
import Register from './components/Register';
import Explorador from './components/Explorador';
import MisPublicaciones from './components/MisPublicaciones';
import Publicar from './components/Publicar'
import ConfiguracionUsuario from './components/ConfiguracionUsuario';
import EditarPublicacion from './components/EditarPublicacion';
import NoExiste from './components/NoExiste';
import SolicitarDonacion from './components/SolicitarDonacion';
import SolicitarCompra from './components/SolicitarCompra';
import Solicitadas from './components/Solicitadas';
import Admin from './components/Admin';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explorador" element={<Explorador />} />
        <Route path="/mis-publicaciones" element={<MisPublicaciones />} />
        <Route path="/publicar" element={<Publicar />} />
        <Route path="/configuracion" element={<ConfiguracionUsuario />} />
        <Route path="/editar-publicacion" element={<EditarPublicacion />} />
        <Route path="/solicitar-donacion" element={<SolicitarDonacion />} />
        <Route path="/solicitar-compra" element={<SolicitarCompra />} />
        <Route path="/solicitadas" element={<Solicitadas />} />
        <Route path="/editar-publicacion" element={<EditarPublicacion />} />
        <Route path='/administrador-spt' element={<Admin />} />

        <Route path="*" element={<NoExiste />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
