import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, barberOnly = false }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (barberOnly && role !== 'barber') {
        return <Navigate to="/" />;
    }

    return children;
}

export default PrivateRoute;
