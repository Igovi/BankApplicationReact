import React from 'react';
import { Navigate } from "react-router-dom";
import ExtractPage from "../pages/ExtractsPage/ExtractsPage";

const PrivateRoutes = () => {
  
    const token = localStorage.getItem('token');
    
  
    if (!token) {
      return <Navigate to="/login" />;
    } else {
      return <ExtractPage />;
    }
  };
  export default PrivateRoutes;
  