import React from 'react'
import {createBrowserRouter} from 'react-router-dom';
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ClientPage from "../pages/ClientPage/ClientPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ExtractsPage from "../pages/ExtractsPage/ExtractsPage";
import TransactionsPage from "../pages/TransactionsPage/TransactionsPage";
import PrivateRoutes from './PrivateRoutes';

interface LoginPageProps {
    setToken: (token: string) => void; 
  }

const router = createBrowserRouter([
    {
        path: "/",
        element: <ClientPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/clients",
        element: <ClientPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/transactions",
        element: <TransactionsPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '/login',
        element: <LoginPage setToken={(token: string) => console.log('Token recebido:', token)} />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/",
        element: <PrivateRoutes />,
        errorElement: <ErrorPage />,
        children: [
          { path: "extracts", element: <ExtractsPage /> },
          { path: "extracts/:clientId", element: <ExtractsPage /> },
        ],
      },

]);
export default router;
