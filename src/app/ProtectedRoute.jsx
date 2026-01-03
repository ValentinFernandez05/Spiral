import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, permission }) => {
  const { session, permissions } = useAuth();

  if (!session) return <Navigate to="/" replace />;

  if (permission && !permissions.includes(permission)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
