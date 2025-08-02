import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './componets/ProductList';
import ProductDetail from './componets/ProductDetail';
import AdminPanel from './componets/Admin/AdminPanel'; // Tu panel de admin
import Login from './componets/Login/Login'; // Tu componente de login
import ProtectedRoute from './componets/ProtectedRoute/ProtectedRoute'; // Tu componente de ruta protegida


function App() {
  return (
    <>
      <Routes>
        {/* Rutas de la tienda */}
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Rutas de la administración */}
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;