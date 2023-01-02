import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  //check if user is login and ADMIN
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  return userAuth?.isAdmin ? <Outlet /> : <Navigate to='login' />;
};

export default AdminRoutes;
