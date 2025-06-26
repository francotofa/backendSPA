import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';
import backgroundImage from '../../assets/images/photo-1544161515-4ab6ce6db874.jpg';

const Profile = () => {
  const navigate = useNavigate();

  const nombre = localStorage.getItem('userName');
  const email = localStorage.getItem('userEmail');
  const dni = localStorage.getItem('userDni');
  const telefono = localStorage.getItem('userPhone');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div 
      className={styles.profilePage}
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})` }}
    >
      

      {/* Contenido del perfil */}
      <div className={styles.profileContainer}>
        <div className={styles.profileBox}>
          <h2>Mi Perfil</h2>
          <p><strong>Nombre:</strong> <span>{nombre}</span></p>
          <p><strong>Email:</strong> <span>{email}</span></p>
          <p><strong>DNI:</strong> <span>{dni}</span></p>
          <p><strong>Teléfono:</strong> <span>{telefono || 'No disponible'}</span></p>

          <button 
            onClick={handleLogout} 
            className={`${styles.submitBtn} ${styles.logoutBtn}`}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
