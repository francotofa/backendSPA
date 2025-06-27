import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import Carousel from './Carousel';
import Navbar from '../Navbar/Navbar';

const Header = () => {
  const location = useLocation();

  const headerTexts = {
    '/': {
      title: 'SPA SENTIRSE BIEN',
      subtitle: 'Un oasis dedicado a tu bienestar y relajación...',
    },
    '/servicios': {
      title: 'Nuestros Servicios',
      subtitle: 'Tratamientos pensados para tu cuerpo y mente',
    },
    '/reserva': {
      title: 'Reservá tu Turno',
      subtitle: 'Elegí tu momento de relax',
    },
    '/perfil': {
      title: 'Tu Perfil',
      subtitle: 'Gestioná tu información personal',
    },
    '/login': {
      title: 'Iniciar Sesión',
      subtitle: 'Accedé a tu cuenta',
    },
    '/registro': {
      title: 'Registro',
      subtitle: 'Creá una cuenta nueva',
    },
    '/recuperar': {
      title: 'Recuperar Contraseña',
      subtitle: 'Te ayudamos a volver',
    },
    '/professional': {
      title: 'Panel Profesional',
      subtitle: 'Acceso exclusivo para profesionales',
    },
    '/admin': {
      title: 'Panel de Administración',
      subtitle: 'Gestión avanzada del sistema',
    },
  };

  const currentText = headerTexts[location.pathname] || {
    title: 'SPA SENTIRSE BIEN',
    subtitle: 'Un oasis dedicado a tu bienestar y relajación...',
  };

  return (
    <header className={styles.header}>
      <Carousel />

      <div className={`${styles.menu} ${styles.container}`}>
        <a href="/" className={styles.logo}>SPA "Sentirse Bien"</a>
        <Navbar />
      </div>

      <div className={styles.headerContent}>
        <h1>{currentText.title}</h1>
        <p>{currentText.subtitle}</p>
      </div>
    </header>
  );
};

export default Header;
