import React from 'react';
import styles from './MetodoPago.module.css';

const MetodoPago = ({ paymentMethod, handleChange, onCardDataChange }) => {
  const handleCardInput = (e) => {
    const { name, value } = e.target;
    onCardDataChange(name, value);
  };

  return (
    <div className={styles.paymentMethods}>
      <h3>Método de Pago</h3>
      <div className={styles.paymentOption}>
        <input
          type="radio"
          id="pay-now"
          name="paymentMethod"
          value="now"
          checked={paymentMethod === 'now'}
          onChange={handleChange}
        />
        <label htmlFor="pay-now">Pagar ahora (15% de descuento)</label>
      </div>
      <div className={styles.paymentOption}>
        <input
          type="radio"
          id="pay-later"
          name="paymentMethod"
          value="later"
          checked={paymentMethod === 'later'}
          onChange={handleChange}
        />
        <label htmlFor="pay-later">Pagar en el spa (precio normal)</label>
      </div>

      {paymentMethod === 'now' && (
        <div className={styles.cardForm}>
          <h4>Datos de Tarjeta</h4>
          <input type="text" name="numero" placeholder="Número de tarjeta" onChange={handleCardInput} required />
          <input type="text" name="nombre" placeholder="Nombre en la tarjeta" onChange={handleCardInput} required />
          <input type="text" name="fecha" placeholder="MM/AA" onChange={handleCardInput} required />
          <input type="text" name="cvv" placeholder="CVV" onChange={handleCardInput} required />
        </div>
      )}
    </div>
  );
};

export default MetodoPago;
