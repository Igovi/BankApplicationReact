import React from 'react'
import ReactDOM from 'react-dom'
import { Navigate, useLocation } from "react-router-dom";
import useUsuarioStore from "../store/usuarioStore";
import ExtractsPage from '../pages/ExtractsPage/ExtractsPage';

const PrivateRoutes = () => {

    const usuarioLogado = useUsuarioStore((s) => s.usuarioLogado);
    const location = useLocation();

    if (usuarioLogado.length === 0) {
        return <Navigate to="/login" state={{ from: location.pathname }} />;
    } else {
        return <ExtractsPage />;
    }
};
export default PrivateRoutes;
