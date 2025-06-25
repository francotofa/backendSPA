import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Profile.module.css';
import backgroundImage from '../../assets/images/photo-1544161515-4ab6ce6db874.jpg';

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    if (rememberMe) {
      localStorage.setItem('spaUser', JSON.stringify({ email }));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('spaUser');
  };

  return (
    <div 
      className={styles.profilePage}
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})` }}
    >
      {/* Header */}
      <header className={styles.header}>
        <div className={`${styles.menu} ${styles.container}`}>
          <Link to="/" className={styles.logo}>SPA "Sentirse Bien"</Link>
          <nav className={styles.navbar}>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/servicios">Servicios</Link></li>
              <li><Link to="/reserva">Reserva</Link></li>
              <li><Link to="/perfil" className={styles.active}>Perfil</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Contenido del perfil */}
      <div className={styles.profileContainer}>
        {!isLoggedIn ? (
          /* Formulario de login */
          <div className={styles.formBox}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Correo Electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Contraseña</label>
                <input 
                  type="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>

              <div className={styles.rememberMe}>
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember">Recordarme</label>
              </div>

              <button type="submit" className={styles.submitBtn}>Iniciar Sesión</button>

              <div className={styles.formFooter}>
                <p>¿No tenés cuenta? <Link to="/registro">Registrate</Link></p>
                <p><Link to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link></p>
              </div>
            </form>
          </div>
        ) : (
          /* Información del perfil */
          <div className={styles.profileBox}>
            <h2>Perfil</h2>
            <p><strong>Correo:</strong> <span>{email}</span></p>

            <div className={styles.extraInfo}>
              {/* Aquí podrías agregar más información del usuario */}
            </div>

            <button 
              onClick={handleLogout} 
              className={`${styles.submitBtn} ${styles.logoutBtn}`}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;