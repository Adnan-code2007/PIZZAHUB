import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { usePizzaHub } from '../context/PizzaHubContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = usePizzaHub();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
