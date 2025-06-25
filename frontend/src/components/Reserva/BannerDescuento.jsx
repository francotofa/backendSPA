import React from 'react';
import styles from './BannerDescuento.module.css';

const BannerDescuento = () => {
  return (
    <div className={styles.infiniteMarquee}>
      <div className={styles.marqueeTrack}>
        <div className={styles.marqueeContent}>
          <span>🎉 15% DE DESCUENTO PAGANDO POR LA PÁGINA 🎉</span>
          <span>🎉 15% DE DESCUENTO PAGANDO POR LA PÁGINA 🎉</span>
          <span>🎉 15% DE DESCUENTO PAGANDO POR LA PÁGINA 🎉</span>
          <span>🎉 15% DE DESCUENTO PAGANDO POR LA PÁGINA 🎉</span>
        </div>
      </div>
    </div>
  );
};

export default BannerDescuento;