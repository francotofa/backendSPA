import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './AdminHeader.module.css';

const AdminHeader = ({ professionalName }) => {
  return (
    <header className={styles.header}>
      <div className={`${styles.menu} ${styles.container}`}>
        <Link to="/" className={styles.logo}>SPA "Sentirse Bien"</Link>
        <nav className={styles.navbar}>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/admin" className={styles.active}>Administración</Link></li>
            <li><Link to="/perfil">Mi Perfil</Link></li>
            <li><Link to="#"><FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión</Link></li>
          </ul>
        </nav>
      </div>
      <div className={styles.headerContent}>
        <h1>Panel Administrativo</h1>
        <p>Bienvenida Dra. {professionalName}</p>
      </div>
    </header>
  );
};

export default AdminHeader;