import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isLoggedIn: false, role: '' });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        if (token) {
            setAuth({ isLoggedIn: true, role: userRole });
        } else {
            setAuth({ isLoggedIn: false, role: '' });
        }
    }, []); 

    const login = (role,token) => {
        localStorage.setItem('token', token); 
        localStorage.setItem('role', role);
        setAuth({ isLoggedIn: true, role }); 
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setAuth({ isLoggedIn: false, role: '' }); 
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
