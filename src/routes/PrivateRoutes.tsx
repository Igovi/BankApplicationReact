import React from 'react'
import ReactDOM from 'react-dom'
import { Navigate, useLocation } from "react-router-dom";
import Layout from "./Layout";
import useUsuarioStore from "../store/usuarioStore";

const PrivateRoutes = () => {

    const usuarioLogado = useUsuarioStore((s) => s.usuarioLogado);
    const location = useLocation();

    if (usuarioLogado.length === 0) {
        return <Navigate to="/login" state={{ from: location.pathname }} />;
    } else {
        return <Layout />;
    }
};
export default PrivateRoutes;
