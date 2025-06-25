import React from 'react';
import styles from './MetodoPago.module.css';

const MetodoPago = ({ paymentMethod, handleChange }) => {
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
    </div>
  );
};

export default MetodoPago;