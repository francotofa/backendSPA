import React, { useState, useEffect } from 'react';
import styles from './FormularioReserva.module.css';
import ResumenReserva from './ResumenReserva';
import MetodoPago from './MetodoPago';

const FormularioReserva = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'now'
  });

  const [errors, setErrors] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Cargar datos del usuario y carrito
    const storedName = localStorage.getItem('userName') || '';
    const storedEmail = localStorage.getItem('userEmail') || '';
    const storedPhone = localStorage.getItem('userPhone') || '';
    
    setFormData(prev => ({
      ...prev,
      name: storedName,
      email: storedEmail,
      phone: storedPhone
    }));

    // Cargar carrito
    const cartData = localStorage.getItem('carrito');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación y envío del formulario
    // ...
  };

  return (
    <div className={styles.cartSummary}>
      <h2>Resumen de Reserva</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="appointment-date">Fecha del Turno</label>
          <input
            type="date"
            id="appointment-date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="appointment-time">Hora del Turno</label>
          <select
            id="appointment-time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una hora</option>
            <option value="09:00">09:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:00">01:00 PM</option>
            <option value="14:00">02:00 PM</option>
            <option value="15:00">03:00 PM</option>
            <option value="16:00">04:00 PM</option>
            <option value="17:00">05:00 PM</option>
          </select>
          {errors.time && <div className={styles.errorMessage}>{errors.time}</div>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="client-name">Nombre Completo</label>
          <input
            type="text"
            id="client-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingrese su nombre"
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="client-email">Correo Electrónico</label>
          <input
            type="email"
            id="client-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingrese su email"
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="client-phone">Teléfono</label>
          <input
            type="tel"
            id="client-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Ingrese su teléfono"
            required
          />
        </div>
        
        <MetodoPago 
          paymentMethod={formData.paymentMethod}
          handleChange={handleChange}
        />
        
        <ResumenReserva 
          cart={cart}
          paymentMethod={formData.paymentMethod}
          date={formData.date}
        />
        
        <button type="submit" className={styles.btn}>
          Confirmar Reserva
        </button>
        {errors.reservation && (
          <div className={styles.errorMessage}>{errors.reservation}</div>
        )}
      </form>
    </div>
  );
};

export default FormularioReserva;