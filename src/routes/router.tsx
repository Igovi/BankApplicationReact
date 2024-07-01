import React from 'react'
import ReactDOM from 'react-dom'
import {createBrowserRouter} from 'react-router-dom';
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Layout from "./Layout";
import Home from "../pages/Home/Home";
import ClientPage from "../pages/ClientPage/ClientPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ExtractsPage from "../pages/ExtractsPage/ExtractsPage";
import TransactionsPage from "../pages/TransactionsPage/TransactionsPage";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "",
                element: <ClientPage/>,
            },
            {
                path: "transactions",
                element: <TransactionsPage/>,
            },
            {path: "login", element: <LoginPage/>},
        ],
    },
    {
        path: "/",
        element: <PrivateRoutes/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "extracts",
                element: <ExtractsPage/>,
            },
        ],
    },
]);
export default router;
