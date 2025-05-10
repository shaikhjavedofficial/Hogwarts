import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authenticated = useAuth();
  if (authenticated === null) return <div>Loading...</div>;
  if (!authenticated) return <Navigate to="/login" />;
  return <>{children}</>;
};

export default RequireAuth;
