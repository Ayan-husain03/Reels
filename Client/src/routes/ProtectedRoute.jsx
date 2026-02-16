import React, { useEffect } from "react";
import useAuthStore from "../store/userAuthStore";
import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
  const { loading, user } = useAuthStore();
  if (loading) return <div>loading..</div>;
  if (!user) {
    return <Navigate to="/user-login" replace />;
  }
  return children;
}

export default ProtectedRoute;
