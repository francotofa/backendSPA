import React, { useState, useEffect } from 'react';
import styles from './FormularioReserva.module.css';
import ResumenReserva from './ResumenReserva';
import MetodoPago from './MetodoPago';
import { useCarrito } from '../Context/CarritoContext';
import axios from 'axios';

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
  const [horariosOcupados, setHorariosOcupados] = useState([]);
  const { carrito: cart } = useCarrito();

  useEffect(() => {
    const storedName = localStorage.getItem('userName') || '';
    const storedEmail = localStorage.getItem('userEmail') || '';
    const storedPhone = localStorage.getItem('userPhone') || '';

    setFormData(prev => ({
      ...prev,
      name: storedName,
      email: storedEmail,
      phone: storedPhone
    }));
  }, []);

  useEffect(() => {
    const fetchHorariosOcupados = async () => {
      if (!formData.date) return;
      try {
        const res = await axios.get(`http://localhost:8080/api/turnos/fecha/${formData.date}`);
        const horas = res.data.map(t => t.horaInicio);
        setHorariosOcupados(horas);
      } catch (err) {
        console.error('Error al obtener horarios ocupados:', err);
        setHorariosOcupados([]);
      }
    };

    fetchHorariosOcupados();
  }, [formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'date') {
      const [year, month, day] = value.split('-').map(Number);
      const selectedDate = new Date(year, month - 1, day);

      if (selectedDate.getDay() === 0) {
        setErrors(prev => ({ ...prev, date: 'No se puede reservar los domingos' }));
        return;
      } else {
        setErrors(prev => ({ ...prev, date: null }));
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const disableSunday = (e) => {
    const value = e.target.value;
    if (!value) {
      e.target.setCustomValidity('');
      return;
    }

    const [year, month, day] = value.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);

    if (selectedDate.getDay() === 0) {
      e.target.setCustomValidity('No se puede reservar los domingos');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setErrors({ reservation: 'Debe seleccionar al menos un servicio' });
      return;
    }

    try {
      const payload = {
        nombre: formData.name,
        email: formData.email,
        telefono: formData.phone,
        fecha: formData.date,
        hora: formData.time,
        metodoPago: formData.paymentMethod,
        servicios: cart.map(s => s.nombre)
      };

      await axios.post('http://localhost:8080/api/turnos', payload);
      alert('Reserva confirmada');
    } catch (error) {
      console.error('Error al guardar turno:', error);
      setErrors({ reservation: 'Error al guardar la reserva' });
    }
  };

  const horariosDisponibles = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

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
            onInput={disableSunday}
            min={new Date().toISOString().split('T')[0]}
            required
          />
          {errors.date && <div className={styles.errorMessage}>{errors.date}</div>}
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
            {horariosDisponibles.map(hora => (
              <option key={hora} value={hora} disabled={horariosOcupados.includes(hora)}>
                {hora}
              </option>
            ))}
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
