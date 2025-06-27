import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';


const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const rol = localStorage.getItem('userRol'); // Podría ser 'ADMIN', 'EMPLEADO' o 'CLIENTE'

  const nombre = user.nombre || 'No disponible';
  const email = user.email || 'No disponible';
  const dni = user.dni || 'No disponible';
  const telefono = user.telefono || 'No disponible';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleGoToPanel = () => {
    if (rol === 'ADMIN') navigate('/admin');
    if (rol === 'EMPLEADO') navigate('/professional');
  };

  return (
    <div 
      className={styles.profilePage}
      style={{
        backgroundColor: '#bbccd4'
      }}
    >
      <div className={styles.profileContainer}>
        <div className={styles.profileBox}>
          <h2>Mi Perfil</h2>
          <p><strong>Nombre:</strong> <span>{nombre}</span></p>
          <p><strong>Email:</strong> <span>{email}</span></p>
          <p><strong>DNI:</strong> <span>{dni}</span></p>
          <p><strong>Teléfono:</strong> <span>{telefono}</span></p>

          {/* Mostrar solo si el rol es ADMIN o EMPLEADO */}
          {rol === 'ADMIN' || rol === 'EMPLEADO' ? (
            <button 
              onClick={handleGoToPanel} 
              className={`${styles.submitBtn} ${styles.goPanelBtn}`}
            >
              Ir al Panel de {rol}
            </button>
          ) : null}

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
