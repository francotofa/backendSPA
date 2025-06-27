import React from 'react';
import styles from './CarritoReserva.module.css';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCarrito } from '../Context/CarritoContext'; // Asegurate que el path esté bien

const CarritoReserva = () => {
  const { carrito, removerDelCarrito } = useCarrito();

  const total = carrito.reduce((acc, item) => acc + item.precio, 0).toLocaleString();

  if (carrito.length === 0) {
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
        {carrito.map((item, index) => (
          <div key={index} className={styles.cartItem}>
            <div className={styles.itemInfo}>
              <h3>{item.nombre}</h3>
              <p>{item.duracion}</p>
            </div>
            <div className={styles.itemPrice}>${item.precio}</div>
            <div className={styles.removeItem} onClick={() => removerDelCarrito(index)}>
              <FaTrash />
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className={styles.cartTotal}>
        <h3>Total: ${total}</h3>
      </div>
    </div>
  );
};

export default CarritoReserva;
