import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, isAdmin, ...rest }) => {
  // Render the element if user is admin, otherwise redirect to login
  return (
    <Route {...rest} element={isAdmin ? element : <Navigate to="/login" />} />
  );
};

export default ProtectedRoute;
