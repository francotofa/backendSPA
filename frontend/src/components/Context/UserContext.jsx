import React, { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext(null);

    export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: null,
        nombre: '',
        email: ''
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
        setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser({ id: null, nombre: '', email: '' });
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
        {children}
        </UserContext.Provider>
    );
    };

// 👇 Agregá esto al final:
export const useUser = () => useContext(UserContext);
