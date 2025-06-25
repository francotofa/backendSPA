import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegistroScreen.module.css';

const RegistroScreen = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    telefono: '',
    password: '',
    confirm_password: '',
    terms: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terms) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("https://backendspa-2.onrender.com/api/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          dni: formData.dni,
          email: formData.email,
          telefono: formData.telefono,
          password: formData.password
        })
      });

      if (response.ok) {
        alert("Registro exitoso");
        navigate('/perfil'); // Redirige a perfil o login
      } else {
        const error = await response.json();
        alert("Error en el registro: " + (error.message || JSON.stringify(error)));
      }
    } catch (error) {
      alert("Error de red o servidor: " + error.message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.formBox}>
        <h2>Crear Cuenta</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="dni">DNI</label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="confirm_password">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.terms}>
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            <label htmlFor="terms">Acepto los <a href="/terminos">Términos y Condiciones</a></label>
          </div>
          
          <button type="submit" className={styles.submitBtn}>Registrarse</button>
          
          <div className={styles.formFooter}>
            <p>¿Ya tienes una cuenta? <a href="/perfil">Inicia Sesión</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroScreen;