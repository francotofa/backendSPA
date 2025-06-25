import React from 'react';
import styles from './ReservaPage.module.css';
import BannerDescuento from '../components/Reserva/BannerDescuento';
import CarritoReserva from '../components/Reserva/CarritoReserva';
import FormularioReserva from '../components/Reserva/FormularioReserva';

const ReservaPage = () => {
  return (
    <div className={styles.reservaPage}>
      <BannerDescuento />
      <div className={styles.container}>
        <div className={styles.cartContainer}>
          <CarritoReserva />
          <FormularioReserva />
        </div>
      </div>
    </div>
  );
};

export default ReservaPage;