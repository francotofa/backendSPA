import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/images/inicio1.png',
    '/images/inicio2.png',
    '/images/inicio3.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.carouselFondo}>
      {images.map((img, index) => (
        <div 
          key={img}
          className={`${styles.carouselSlide} ${index === currentIndex ? styles.active : ''}`}
        >
          <img src={img} alt={`Imagen ${index + 1} del Spa`} />
        </div>
      ))}
      <div className={styles.carouselOverlay}></div>
    </div>
  );
};

export default Carousel;