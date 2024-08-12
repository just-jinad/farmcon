import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
