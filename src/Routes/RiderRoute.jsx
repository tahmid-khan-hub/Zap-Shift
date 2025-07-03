import React from "react";
import UseAuth from "../hooks/UseAuth";
import UseUserRole from "../hooks/UseUserRole";
import { useLocation } from "react-router";

const RiderRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, roleLoading } = UseUserRole();
  const location = useLocation();

  if (loading || roleLoading)
    return <span className="loading loading-ring loading-xl"></span>;

  if (!user || role !== "rider")
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    );
  return children;
};

export default RiderRoute;
