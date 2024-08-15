import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated } = useAuth();

  // If authentication is required and the user is not authenticated, redirect to /auth
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  // Otherwise, render the children components
  return children;
};

export default ProtectedRoute;