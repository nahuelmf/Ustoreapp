import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './componets/ProductList';
import ProductDetail from './componets/ProductDetail';
import Admin from './componets/Admin/Admin';
import Login from './componets/Login/Login';
import ProtectedRoute from './componets/ProtectedRoute/ProtectedRoute';


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
              <Admin />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;