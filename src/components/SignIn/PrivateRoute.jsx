// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../SignIn/AuthContext'; // Adjust path as per your context setup

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth(); // Assuming isAuthenticated state is available from context

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
