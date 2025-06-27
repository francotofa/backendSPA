import React, { useState } from 'react';
import Header from '../Header/Header';
import Carousel from '../Header/Carousel';
import styles from './AuthScreen.module.css';
import axios from 'axios';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes('@') || password.length < 4) {
      setErrorMessage('Por favor ingresá un correo válido y una contraseña mayor a 3 caracteres.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      });

      if (
        response.status === 200 &&
        response.data.token &&
        typeof response.data.token === 'string' &&
        response.data.token.length > 10
      ) {
        const {
          token,
          id,
          nombre,
          apellido,
          email: userEmail,
          telefono,
          dni,
          rol
        } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('userRol', rol); // 👈 GUARDAMOS EL ROL

        const userData = {
          id,
          nombre: `${nombre} ${apellido}`,
          email: userEmail,
          telefono,
          dni
        };

        localStorage.setItem('user', JSON.stringify(userData));

        alert('Inicio de sesión exitoso');
        window.location.href = '/reserva';
      } else {
        setErrorMessage('Credenciales inválidas. Por favor, intentá de nuevo.');
      }
    } catch (error) {
      console.error('Error en login:', error);
      if (error.response && error.response.status === 401) {
        setErrorMessage('Correo o contraseña incorrectos.');
      } else {
        setErrorMessage('Error al conectar con el servidor.');
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <Carousel />

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

            {errorMessage && (
              <div className={styles.errorMessage}>
                {errorMessage}
              </div>
            )}

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
