import React, { useState } from 'react';
import styles from './Header.module.css';
import Carousel from './Carousel';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Carousel />
      
      <div className={`${styles.menu} ${styles.container}`}>
        <a href="/" className={styles.logo}>SPA "Sentirse Bien"</a>
        
        <nav className={`${styles.navbar} ${menuOpen ? styles.active : ''}`}>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/servicios">Servicios</a></li>
            <li><a href="/reserva">Reserva</a></li>
            <li><a href="/perfil">Perfil</a></li>
          </ul>
        </nav>
      </div>

      <div className={styles.headerContent}>
        <h1>SPA SENTIRSE BIEN</h1>
        <p>Un oasis dedicado a tu bienestar y relajación...</p>
      </div>
    </header>
  );
};

export default Header;