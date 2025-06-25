import React, { useState, useEffect } from 'react';
import styles from './CarritoReserva.module.css';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CarritoReserva = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Cargar carrito desde localStorage
    const loadCart = () => {
      try {
        const cartData = localStorage.getItem('carrito');
        if (cartData) {
          setCart(JSON.parse(cartData));
        }
      } catch (e) {
        console.error('Error al cargar carrito:', e);
      }
    };
    loadCart();
  }, []);

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('carrito', JSON.stringify(newCart));
  };

  if (cart.length === 0) {
    return (
      <div className={styles.cartItems}>
        <h2>Servicios Seleccionados</h2>
        <div className={styles.emptyCart}>
          <FaShoppingCart className={styles.cartIcon} />
          <p>No hay servicios en tu carrito</p>
          <Link to="/servicios" className={styles.btn}>
            Ver Servicios
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartItems}>
      <h2>Servicios Seleccionados</h2>
      <div className={styles.cartItemsList}>
        {cart.map((item, index) => (
          <div key={index} className={styles.cartItem}>
            <div className={styles.itemInfo}>
              <h3>{item.nombre}</h3>
              <p>{item.duracion}</p>
            </div>
            <div className={styles.itemPrice}>
              ${item.precio}
            </div>
            <div 
              className={styles.removeItem} 
              onClick={() => removeItem(index)}
            >
              <FaTrash />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarritoReserva;