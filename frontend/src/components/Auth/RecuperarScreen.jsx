import React, { useState } from 'react';
import styles from './AuthScreen.module.css'; // Reutilizamos los estilos del login

const RecuperarScreen = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulamos el envío del email
    setTimeout(() => {
      setIsLoading(false);
      setMessage('Si el correo existe, recibirás un enlace para restablecer tu contraseña.');
    }, 1500);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBackground}></div>

      <div className={styles.authFormContainer}>
        <div className={styles.authForm}>
          <h2 className={styles.authTitle}>Recuperar Contraseña</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="recovery-email">Correo Electrónico</label>
              <input
                type="email"
                id="recovery-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.inputField}
                placeholder="Ingresa tu email registrado"
              />
            </div>

            {message && (
              <div className={styles.successMessage}>
                {message}
              </div>
            )}

            <button 
              type="submit" 
              className={styles.submitAuth}
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Enviar Enlace'}
            </button>
          </form>

          <div className={styles.authLinks}>
            <a href="/perfil" className={styles.authLink}>Volver al Inicio de Sesión</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecuperarScreen;