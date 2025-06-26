import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);
export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    // evitar duplicados al agregar
    const agregarAlCarrito = (servicio) => {
        setCarrito((prev) => {
        const yaExiste = prev.some(item => item.nombre === servicio.nombre);
        if (!yaExiste) {
            return [...prev, servicio];
        }
        return prev;
        });
    };

    
    const vaciarCarrito = () => setCarrito([]);

    // remover por índice
    const removerDelCarrito = (index) => {
        setCarrito((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, vaciarCarrito, removerDelCarrito }}>
        {children}
        </CarritoContext.Provider>
    );
};
