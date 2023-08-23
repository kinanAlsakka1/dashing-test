// PrivateRoute.tsx
import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { useUser } from '../context/user-context';

type PrivateRouteProps = {
  roles: string[];
  page : any
} & RouteProps;

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles, page }) => {
  const {user, isAuth} = useUser();

  // Check if the user has any of the required roles
  const hasRequiredRole = roles.some((role) => user.role.includes(role));
  return (hasRequiredRole && isAuth)  ? page : <Navigate to='/login' />;
};

export default PrivateRoute;
