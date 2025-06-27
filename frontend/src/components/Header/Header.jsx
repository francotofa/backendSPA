import React from 'react';
import styles from './Header.module.css';
import Carousel from './Carousel';
import Navbar from '../Navbar/Navbar'; // Importamos el componente Navbar

const Header = () => {
  return (
    <header className={styles.header}>
      <Carousel />
      
      <div className={`${styles.menu} ${styles.container}`}>
        <a href="/" className={styles.logo}>SPA "Sentirse Bien"</a>
        <Navbar />
      </div>

      <div className={styles.headerContent}>
        <h1>SPA SENTIRSE BIEN</h1>
        <p>Un oasis dedicado a tu bienestar y relajación...</p>
      </div>
    </header>
  );
};

export default Header;