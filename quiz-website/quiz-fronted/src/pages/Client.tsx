import React from 'react';
import { useIsFetching } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

import LoadingMiddleware from '../components/LoadingMiddleware';
import ClientHeader from '../components/ClientHeader';
import ClientFooter from '../components/ClientFooter';

function Client() {
  const isLoading = useIsFetching();

  return (
    <LoadingMiddleware isLoading={!!isLoading}>
      <ClientHeader/>
      <Outlet/>
      <ClientFooter/>
    </LoadingMiddleware>
  );
}

export default Client;