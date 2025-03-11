import React from 'react';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import LoginContext from '../Context/LoginContext';

const ProtectedRoute = ({ roles }) => {
  const userContext = useContext(LoginContext);
  const { userDetails } = userContext;

  console.log("userDetails in protected",userDetails)
  if (!userDetails) {
    return <Navigate to='/' />;
  }

  if (roles && !roles.includes(userDetails.accountType)) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
