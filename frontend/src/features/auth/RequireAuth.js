import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRole }) => {
  const location = useLocation();
  const { status } = useAuth();

  let content;
  content =
    status === allowedRole ? (
      <Outlet />
    ) : (
      <Navigate to={"/home"} state={{ from: location }} replace />
    );

  return content;
};

export default RequireAuth;
