import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import React from "react";

const ProtectedRoute = () => {
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate()
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (!isLoggedIn) {
    return () => navigate("/")
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
