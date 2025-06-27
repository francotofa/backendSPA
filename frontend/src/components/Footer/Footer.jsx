import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTiktok, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        
        {/* Columna izquierda - SPA Sentirse Bien */}
        <div className={styles.leftSection}>
          <h3 className={styles.spaTitle}>SPA Sentirse Bien</h3>
          <p className={styles.spaSubtitle}>Tu espacio de relajación y bienestar</p>
          <div className={styles.copyright}>
            <p>Hecho por Tofanelli Franco y Frias Luciano</p>
            <p>© 2025 Sentirse Bien SPA</p>
          </div>
        </div>

        {/* Columna central - Síguenos */}
        <div className={styles.centerSection}>
          <h3 className={styles.sectionTitle}>Síguenos</h3>
          <div className={styles.socialIcons}>
            <a href="https://www.tiktok.com/" aria-label="TikTok"><FaTiktok /></a>
            <a href="https://www.instagram.com/" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.Facebook.com/" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://www.youtube.com/" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        {/* Columna derecha - Contáctanos */}
        <div className={styles.rightSection}>
          <h3 className={styles.sectionTitle}>Contáctanos</h3>
          <ul className={styles.contactList}>
            <li><FaPhone className={styles.contactIcon} /> +54 9 3624480883</li>
            <li><FaEnvelope className={styles.contactIcon} /> info@sentirsebien.com</li>
            <li><FaMapMarkerAlt className={styles.contactIcon} /> C. French 414, Resistencia, Chaco</li>
        
          </ul>
        </div>
      </div>

      {/* Footer inferior */}
      <div className={styles.footerBottom}>
        <p>© 2025 SPA Sentirse Bien - Todos los derechos reservados | Términos y condiciones | Política de privacidad</p>
      </div>
    </footer>
  );
};

export default Footer;