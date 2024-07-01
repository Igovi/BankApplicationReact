import React from 'react'
import {createBrowserRouter} from 'react-router-dom';
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ClientPage from "../pages/ClientPage/ClientPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ExtractsPage from "../pages/ExtractsPage/ExtractsPage";
import TransactionsPage from "../pages/TransactionsPage/TransactionsPage";

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
        path: "/login",
        element: <LoginPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/extracts",
        element: <ExtractsPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/extracts/:clientId",
        element: <ExtractsPage/>,
        errorElement: <ErrorPage/>,
    },
]);
export default router;
