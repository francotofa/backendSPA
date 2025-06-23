// components/Footer/Footer.jsx
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        
        {/* Columna 1: Nombre y copyright */}
        <div className={styles.footerSection}>
          <h3>SPA Sentirse Bien</h3>
          <p>Copyright © 2025 Sentirse Bien SPA</p>
          <p>Hecho por Tofanelli Franco y Frias Luciano</p>
        </div>

        {/* Columna 2: Contacto */}
        <div className={styles.footerSection}>
          <h3>Contáctenos</h3>
          <p>+54 9 3624492683</p>
          <p>info@sentirsebien.com</p>
        </div>

        {/* Columna 3: Redes Sociales */}
        <div className={styles.footerSection}>
          <h3>Síguenos</h3>
          <div className={styles.socialIcons}>
            <a href="https://www.tiktok.com/"><img src="/images/tiktok-icon.png" alt="TikTok" /></a>
            <a href="https://www.instagram.com/"><img src="/images/instagram-icon.png" alt="Instagram" /></a>
            <a href="https://www.facebook.com/"><img src="/images/facebook-icon.png" alt="Facebook" /></a>
            <a href="https://www.youtube.com/"><img src="/images/youtube-icon.png" alt="YouTube" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;