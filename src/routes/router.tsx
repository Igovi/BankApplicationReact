import React from 'react'
import ReactDOM from 'react-dom'
import {createBrowserRouter} from 'react-router-dom';
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import ClientPage from "../pages/ClientPage/ClientPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ExtractsPage from "../pages/ExtractsPage/ExtractsPage";
import TransactionsPage from "../pages/TransactionsPage/TransactionsPage";
import PrivateRoutes from "./PrivateRoutes";

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
]);
export default router;
