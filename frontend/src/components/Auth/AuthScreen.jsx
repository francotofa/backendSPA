import React, { useState } from 'react';
import Header from '../Header/Header';
import Carousel from '../Header/Carousel';  // Nueva ruta correcta
import styles from './AuthScreen.module.css';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticación
    console.log('Credenciales:', { email, password });
  };

  return (
    <div className={styles.authContainer}>
      {/* Mantenemos el header y carrusel existentes */}
   
      <Carousel />
      
      {/* Formulario centrado */}
      <div className={styles.authFormContainer}>
        <div className={styles.authForm}>
          <h2 className={styles.authTitle}>Acceso a Mi Perfil</h2>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="auth-email">Correo Electrónico</label>
              <input
                type="email"
                id="auth-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="auth-password">Contraseña</label>
              <input
                type="password"
                id="auth-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>
            
            <button type="submit" className={styles.submitAuth}>
              Ingresar a Mi Cuenta
            </button>
          </form>
          
          <div className={styles.authLinks}>
            <a href="/registro">Crear nueva cuenta</a>
            <a href="/recuperar">¿Olvidaste tu contraseña?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;