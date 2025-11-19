import { useEffect } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { applyLeafletDefaultIcon } from '@/lib/leafletIcons';
import Layout from './Layout';

import HomePage from '@/pages/Home';
import AccountPage from '@/pages/AccountPage';
import FavoritesPage from '@/pages/FavoritesPage';


export default function App() {
  useEffect(() => { applyLeafletDefaultIcon(); }, []);

  const routes = useRoutes([
    {
      path: '/',
      element: <Layout />,             // 👈 Navbar persistente
      children: [
        { index: true, element: <HomePage /> },       // "/"
        { path: 'account', element: <AccountPage /> },// "/account"
        { path: 'favorites', element: <FavoritesPage /> }, // "/favorites"
        { path: '*', element: <Navigate to="/" replace /> },
      ],
    },
  ]);

  return <div className="h-full">{routes}</div>;
}
