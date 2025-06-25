import React from 'react';
import styles from './ResumenReserva.module.css';

const ResumenReserva = ({ cart, paymentMethod, date }) => {
  const calculateTotal = () => {
    if (cart.length === 0) return { subtotal: 0, discount: 0, total: 0 };

    const subtotal = cart.reduce((sum, item) => {
      const price = parseFloat(item.precio.toString().replace('$', '').replace('.', '').replace(',', '.'));
      return sum + (isNaN(price) ? 0 : price);
    }, 0);

    let discount = 0;
    if (paymentMethod === 'now' && date) {
      const selectedDate = new Date(date);
      const now = new Date();
      const diffTime = selectedDate - now;
      const diffHours = diffTime / (1000 * 60 * 60);

      if (diffHours > 48) {
        discount = subtotal * 0.15;
      }
    }

    const total = subtotal - discount;

    return {
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const { subtotal, discount, total } = calculateTotal();

  return (
    <div className={styles.priceSummary}>
      <div className={styles.summaryRow}>
        <span>Subtotal:</span>
        <span>${subtotal}</span>
      </div>
      <div className={styles.summaryRow}>
        <span>Descuento (15%):</span>
        <span>-${discount}</span>
      </div>
      <div className={`${styles.summaryRow} ${styles.totalRow}`}>
        <span>Total a Pagar:</span>
        <span>${total}</span>
      </div>
    </div>
  );
};

export default ResumenReserva;