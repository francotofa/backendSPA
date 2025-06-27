import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfessionalHeader.module.css';

const ProfessionalHeader = ({ professionalName }) => {
  return (
    <header className={styles.header}>
      <div className={`${styles.menu} ${styles.container}`}>
        <Link to="/" className={styles.logo}>SPA "Sentirse Bien"</Link>
        <nav className={styles.navbar}>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/professional" className={styles.active}>Mis Turnos</Link></li>
            <li><Link to="/perfil">Mi Perfil</Link></li>
            <li><Link to="#"><i className="fas fa-sign-out-alt"></i> Cerrar Sesión</Link></li>
          </ul>
        </nav>
      </div>
      <div className={styles.headerContent}>
        <h1>Panel Profesional</h1>
        <p>Bienvenido/a {professionalName}</p>
      </div>
    </header>
  );
};

export default ProfessionalHeader;