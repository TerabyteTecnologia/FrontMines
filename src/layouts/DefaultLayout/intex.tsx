import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Header } from '../../components/Header/index';
import { useAuth } from '../../contexts/Auth';

export function PrivateRoutes() {

  const { isAuthentication } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthentication)
      navigate("/");

  }, [isAuthentication]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}