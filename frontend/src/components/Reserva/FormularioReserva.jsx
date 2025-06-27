import React, { useState, useEffect } from 'react';
import styles from './FormularioReserva.module.css';
import ResumenReserva from './ResumenReserva';
import MetodoPago from './MetodoPago';
import { useCarrito } from '../Context/CarritoContext';
import { useUser } from '../Context/UserContext';
import axios from 'axios';

const FormularioReserva = () => {
  const { user } = useUser();
  const { carrito: cart } = useCarrito();

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'now',
    empleadoId: '' // campo para seleccionar profesional
  });

  const [empleados, setEmpleados] = useState([]);
  const [errors, setErrors] = useState({});
  const [horariosOcupados, setHorariosOcupados] = useState([]);

  
  // Configuración de axios con token de autenticación
  const token = localStorage.getItem('token');
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  // Trae los empleados con rol EMPLEADO
useEffect(() => {
  const fetchEmpleados = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/usuarios/empleados', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEmpleados(res.data);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };
  fetchEmpleados();
}, []);

  // Autocompleta datos si hay usuario logueado
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    } else {
      const storedName = localStorage.getItem('userName') || '';
      const storedEmail = localStorage.getItem('userEmail') || '';
      const storedPhone = localStorage.getItem('userPhone') || '';

      setFormData(prev => ({
        ...prev,
        name: storedName,
        email: storedEmail,
        phone: storedPhone
      }));
    }
  }, [user]);

  // Consulta horarios ocupados para la fecha seleccionada
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

  // Maneja cambios en inputs
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

  // Valida que no se pueda seleccionar domingo
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

  // Enviar reserva
const handleSubmit = async (e) => {
  e.preventDefault();
  
    // Validar que se haya seleccionado un horario no ocupado
  if (horariosOcupados.includes(formData.time)) {
    setErrors({ reservation: 'La hora seleccionada ya está ocupada. Por favor, elija otro horario.' });
    return;
  }
  if (cart.length === 0) {
    setErrors({ reservation: 'Debe seleccionar al menos un servicio' });
    return;
  }

  if (!user) {
    setErrors({ reservation: 'Debes estar logueado para reservar.' });
    return;
  }

  if (!formData.empleadoId) {
    setErrors({ reservation: 'Debe seleccionar un profesional' });
    return;
  }

  if (!token) {
    setErrors({ reservation: 'No estás autenticado. Por favor inicia sesión.' });
    return;
  }

  try {
    // Asegurar formato ISO completo para horaInicio con segundos
    const horaInicioISO = formData.time.length === 5 ? formData.time + ':00' : formData.time;

    // Mapear paymentMethod correctamente para que coincida con el enum backend
    let metodoPagoBackend;
    switch (formData.paymentMethod.toLowerCase()) {
      case 'now':
      case 'efectivo':
        metodoPagoBackend = 'EFECTIVO';
        break;
      case 'tarjeta':
      case 'tarjeta_credito':
      case 'tarjeta de credito':
        metodoPagoBackend = 'TARJETA_CREDITO';
        break;
      default:
        metodoPagoBackend = 'EFECTIVO'; // valor por defecto
    }
      console.log('user:', user);
      console.log('user.id:', user?.id);

      console.log('formData.empleadoId:', formData.empleadoId);
      console.log('empleadoId parseado:', parseInt(formData.empleadoId));

      console.log('cart:', cart);
      console.log('servicioIds:', cart.map(s => s.id));
    const payload = {
      clienteId: user.id,
      profesionalId: parseInt(formData.empleadoId),
      servicioIds: cart.map(s => s.id),
      fecha: formData.date, // "YYYY-MM-DD"
      horaInicio: horaInicioISO, // "HH:mm:ss"
      estado: "PENDIENTE",
      metodoPago: metodoPagoBackend,
      pagado: false,
      pagoWeb: metodoPagoBackend !== "EFECTIVO",
      monto: cart.reduce((sum, s) => sum + s.precio, 0),
      detalle: cart.map(s => s.nombre).join(", ")
    };

    console.log('Token:', token);
    console.log('Payload:', payload);

    await axios.post('http://localhost:8080/api/turnos', payload, axiosConfig);

    alert('Reserva confirmada');
    // Limpiar o redirigir...
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

        {/* Profesional */}
        <div className={styles.formGroup}>
          <label htmlFor="empleado">Seleccionar Profesional</label>
          <select
            id="empleado"
            name="empleadoId"
            value={formData.empleadoId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un profesional</option>
            {empleados.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.nombre} {emp.apellido}
              </option>
            ))}
          </select>
        </div>

        {!user && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="client-name">Nombre Completo</label>
              <input
                type="text"
                id="client-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                required
              />
            </div>
          </>
        )}

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
