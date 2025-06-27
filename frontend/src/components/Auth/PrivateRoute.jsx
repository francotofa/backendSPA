import React from 'react';
import { Navigate } from 'react-router-dom';

    const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
    };

export default PrivateRoute;
//Este componente va a verificar si hay un token guardado. 
// Si hay token, renderiza el componente que le pasás; si no hay token, te redirige a /login.        