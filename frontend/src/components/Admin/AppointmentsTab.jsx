import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminTabs.module.css';

const mockServices = [
  { id: 1, nombre: "Masajes", categoria: "Masajes", duracion: 60, precio: 4500 },
  { id: 2, nombre: "Belleza", categoria: "Belleza", duracion: 60, precio: 3800 },
  { id: 3, nombre: "Tratamientos Faciales", categoria: "Tratamientos Faciales", duracion: 60, precio: 5200 },
  { id: 4, nombre: "Tratamientos Corporales", categoria: "Tratamientos Corporales", duracion: 60, precio: 6800 },
  { id: 5, nombre: "Hidromasajes", categoria: "Hidromasajes", duracion: 60, precio: 8500 },
  { id: 6, nombre: "Yoga Grupal", categoria: "Yoga Grupal", duracion: 60, precio: 7200 }
];

const AppointmentsTab = () => {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    serviceId: '',
    professionalId: '',
    clientId: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    status: 'CONFIRMADO',
    phone: '',
    email: '',
    notes: ''
  });

  const allowedCategories = ["Masajes", "Belleza", "Tratamientos Faciales", "Tratamientos Corporales", "Hidromasajes", "Yoga Grupal"];
  const availableTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  useEffect(() => {
    // Simulamos servicios directamente
    setServices(mockServices.filter(s => allowedCategories.includes(s.categoria)));

    axios.get('/api/usuarios/empleados')
      .then(res => setProfessionals(res.data))
      .catch(err => console.error('Error al obtener profesionales', err));

    axios.get('/api/usuarios/clientes')
      .then(res => setClients(res.data))
      .catch(err => console.error('Error al obtener clientes', err));
  }, []);

  useEffect(() => {
    if (formData.date) {
      axios.get(`/api/turnos/fecha/${formData.date}`)
        .then(res => setAppointments(res.data))
        .catch(err => console.error('Error al obtener turnos', err));
    }
  }, [formData.date]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e) => {
    setFormData(prev => ({
      ...prev,
      serviceId: e.target.value
    }));
  };

  const validateForm = () => {
    if (!formData.serviceId || !formData.professionalId || !formData.clientId || !formData.date || !formData.time) {
      alert('Completa todos los campos obligatorios');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const selectedService = services.find(s => s.id === parseInt(formData.serviceId));
    const start = formData.time;
    const [h, m] = start.split(':').map(Number);
    const end = new Date(0, 0, 0, h, m + selectedService.duracion);

    const turnoDTO = {
      clienteId: parseInt(formData.clientId),
      profesionalId: parseInt(formData.professionalId),
      servicioIds: [parseInt(formData.serviceId)],
      fecha: formData.date,
      horaInicio: formData.time,
      horaFin: `${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`,
      estado: formData.status.toUpperCase(),
      metodoPago: 'EFECTIVO',
      pagado: false,
      pagoWeb: false,
      monto: selectedService.precio,
      detalle: formData.notes
    };

    try {
      await axios.post('/api/turnos', turnoDTO);
      alert('Turno creado exitosamente');
      setFormData(prev => ({
        ...prev,
        serviceId: '',
        clientId: '',
        time: '',
        phone: '',
        email: '',
        notes: ''
      }));
      const res = await axios.get(`/api/turnos/fecha/${formData.date}`);
      setAppointments(res.data);
    } catch (err) {
      console.error('Error al crear turno', err);
      alert('Error al crear turno');
    }
  };

  const formatTimeDisplay = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    return hour > 12 ? `${hour - 12}:${minutes} PM` : `${hour}:${minutes} AM`;
  };

  const uniqueCategories = [...new Set(services.map(service => service.categoria))];

  return (
    <>
      <div className={styles.adminCard}>
        <h3>Crear Nuevo Turno</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Servicio</label>
              <select name="serviceId" value={formData.serviceId} onChange={handleServiceChange} required>
                <option value="">Seleccionar servicio</option>
                {uniqueCategories.map(category => (
                  <optgroup key={category} label={category}>
                    {services.filter(s => s.categoria === category).map(service => (
                      <option key={service.id} value={service.id}>
                        {service.nombre} ({service.duracion} min) - ${service.precio}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Profesional</label>
              <select name="professionalId" value={formData.professionalId} onChange={handleInputChange} required>
                <option value="">Seleccionar profesional</option>
                {professionals.map(prof => (
                  <option key={prof.id} value={prof.id}>{prof.nombre}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Cliente</label>
              <select name="clientId" value={formData.clientId} onChange={handleInputChange} required>
                <option value="">Seleccionar cliente</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.nombre}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Fecha</label>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} min={new Date().toISOString().split('T')[0]} />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Hora</label>
              <select name="time" value={formData.time} onChange={handleInputChange} required>
                <option value="">Seleccionar hora</option>
                {availableTimes.map(time => (
                  <option key={time} value={time}>{formatTimeDisplay(time)}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Estado</label>
              <select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="CONFIRMADO">Confirmado</option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="CANCELADO">Cancelado</option>
              </select>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Notas</label>
            <textarea name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Indicaciones especiales..." />
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.btn}>Guardar Turno</button>
            <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setFormData({
              serviceId: '', professionalId: '', clientId: '', date: new Date().toISOString().split('T')[0],
              time: '', status: 'CONFIRMADO', phone: '', email: '', notes: ''
            })}>Limpiar</button>
          </div>
        </form>
      </div>

      <div className={styles.adminCard}>
        <h3>Turnos del Día</h3>
        <table className={styles.appointmentsList}>
          <thead>
            <tr>
              <th>Hora</th>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Profesional</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(app => (
              <tr key={app.id}>
                <td>{app.horaInicio}</td>
                <td>{app.cliente.nombre}</td>
                <td>{app.servicios.map(s => s.nombre).join(', ')}</td>
                <td>{app.profesional.nombre}</td>
                <td>{app.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AppointmentsTab;
