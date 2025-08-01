import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;