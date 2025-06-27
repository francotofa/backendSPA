import React, { useState, useEffect } from 'react';
import styles from './AdminTabs.module.css';

const AppointmentsTab = () => {
  // Estados del componente
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [formData, setFormData] = useState({
    serviceId: '',
    professional: '',
    client: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    status: 'confirmed',
    phone: '',
    email: '',
    notes: ''
  });
  const [serviceFilter, setServiceFilter] = useState('');

  // Categorías de servicios permitidas
  const allowedCategories = [
    "Masajes", 
    "Belleza", 
    "Tratamientos Faciales", 
    "Tratamientos Corporales", 
    "Hidromasajes", 
    "Yoga Grupal"
  ];

  // Datos de servicios disponibles (filtrados por categorías permitidas)
  const serviceCategories = [
    { id: 1, name: "Masaje Relajante", category: "Masajes", duration: 60, price: 5000 },
    { id: 2, name: "Masaje Descontracturante", category: "Masajes", duration: 60, price: 5500 },
    { id: 3, name: "Depilación Completa", category: "Belleza", duration: 45, price: 3500 },
    { id: 4, name: "Manicuría y Pedicuría", category: "Belleza", duration: 60, price: 2800 },
    { id: 5, name: "Facial Rejuvenecedor", category: "Tratamientos Faciales", duration: 45, price: 4000 },
    { id: 6, name: "Limpieza Facial Profunda", category: "Tratamientos Faciales", duration: 60, price: 4500 },
    { id: 7, name: "Drenaje Linfático", category: "Tratamientos Corporales", duration: 50, price: 4800 },
    { id: 8, name: "Reducción de Medidas", category: "Tratamientos Corporales", duration: 60, price: 5200 },
    { id: 9, name: "Hidromasaje Relajante", category: "Hidromasajes", duration: 30, price: 4500 },
    { id: 10, name: "Hidromasaje con Aromaterapia", category: "Hidromasajes", duration: 45, price: 5500 },
    { id: 11, name: "Yoga Terapéutico", category: "Yoga Grupal", duration: 60, price: 3000 },
    { id: 12, name: "Yoga para Principiantes", category: "Yoga Grupal", duration: 60, price: 2500 }
  ].filter(service => allowedCategories.includes(service.category));

  // Profesionales disponibles
  const availableProfessionals = [
    "Dra. Ana Felicidad",
    "Dr. Carlos Bienestar",
    "Lic. María Relajación",
    "Téc. Juan Armonía",
    "Lic. Laura Equilibrio"
  ];

  // Horarios disponibles
  const availableTimes = [
    '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // Cargar datos iniciales
  useEffect(() => {
    setServices(serviceCategories);
    setProfessionals(availableProfessionals);
    
    // Datos mock de turnos existentes
    const mockAppointments = [
      { 
        id: 1, 
        serviceId: 1, 
        serviceName: "Masaje Relajante",
        professional: "Dra. Ana Felicidad",
        client: "Cliente Ejemplo", 
        date: new Date().toISOString().split('T')[0], 
        time: "10:00", 
        status: "confirmed", 
        phone: "3624123456", 
        email: "cliente@ejemplo.com",
        notes: ""
      }
    ];
    setAppointments(mockAppointments);
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Cuando se selecciona un servicio, asignar automáticamente el profesional común
  const handleServiceChange = (e) => {
    const serviceId = parseInt(e.target.value);
    const selectedService = services.find(s => s.id === serviceId);
    
    setFormData(prev => ({
      ...prev,
      serviceId,
      professional: selectedService?.professional || ''
    }));
  };

  // Validar formulario
  const validateForm = () => {
    if (!formData.serviceId) {
      alert('Por favor seleccione un servicio');
      return false;
    }
    if (!formData.professional) {
      alert('Por favor seleccione un profesional');
      return false;
    }
    if (!formData.client.trim()) {
      alert('El nombre del cliente es requerido');
      return false;
    }
    if (!formData.date) {
      alert('La fecha es requerida');
      return false;
    }
    if (!formData.time) {
      alert('La hora es requerida');
      return false;
    }
    return true;
  };

  // Crear nuevo turno
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const selectedService = services.find(s => s.id === parseInt(formData.serviceId));
    
    const newAppointment = {
      id: appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1,
      serviceId: parseInt(formData.serviceId),
      serviceName: selectedService.name,
      professional: formData.professional,
      client: formData.client,
      date: formData.date,
      time: formData.time,
      status: formData.status,
      phone: formData.phone,
      email: formData.email,
      notes: formData.notes,
      payment: selectedService.price
    };

    setAppointments([...appointments, newAppointment]);
    
    // Limpiar formulario (excepto fecha y profesional)
    setFormData(prev => ({
      ...prev,
      serviceId: '',
      client: '',
      time: '',
      phone: '',
      email: '',
      notes: ''
    }));

    alert('Turno creado exitosamente!');
  };

  // Filtrar turnos por fecha y servicio seleccionado
  const filteredAppointments = appointments
    .filter(app => app.date === formData.date)
    .filter(app => {
      if (!serviceFilter) return true;
      const selectedService = services.find(s => s.id === app.serviceId);
      return selectedService?.category === serviceFilter;
    });

  // Formatear hora para mostrar
  const formatTimeDisplay = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    return hour > 12 
      ? `${hour - 12}:${minutes} PM` 
      : `${hour}:${minutes} AM`;
  };

  // Obtener categorías únicas para el filtro
  const uniqueCategories = [...new Set(services.map(service => service.category))];

  return (
    <>
      <div className={styles.adminCard}>
        <h3>Crear Nuevo Turno</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="serviceId">Servicio</label>
              <select
                id="serviceId"
                name="serviceId"
                value={formData.serviceId}
                onChange={handleServiceChange}
                required
              >
                <option value="">Seleccionar servicio</option>
                {uniqueCategories.map(category => (
                  <optgroup key={category} label={category}>
                    {services
                      .filter(s => s.category === category)
                      .map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name} ({service.duration} min) - ${service.price}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="professional">Profesional</label>
              <select
                id="professional"
                name="professional"
                value={formData.professional}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar profesional</option>
                {professionals.map(prof => (
                  <option key={prof} value={prof}>
                    {prof}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="client">Cliente</label>
              <input
                type="text"
                id="client"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="date">Fecha</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="time">Hora</label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar hora</option>
                {availableTimes.map(time => (
                  <option key={time} value={time}>
                    {formatTimeDisplay(time)}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="status">Estado</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="confirmed">Confirmado</option>
                <option value="pending">Pendiente</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="notes">Notas</label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Indicaciones especiales, alergias, etc."
            />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.btn}>
              Guardar Turno
            </button>
            <button 
              type="button" 
              onClick={() => setFormData({
                serviceId: '',
                professional: '',
                client: '',
                date: new Date().toISOString().split('T')[0],
                time: '',
                status: 'confirmed',
                phone: '',
                email: '',
                notes: ''
              })}
              className={`${styles.btn} ${styles.btnSecondary}`}
            >
              Limpiar Formulario
            </button>
          </div>
        </form>
      </div>

      <div className={styles.adminCard}>
        <h3>Turnos del Día</h3>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="filter-date">Filtrar por fecha:</label>
            <input
              type="date"
              id="filter-date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="filter-service">Filtrar por servicio:</label>
            <select
              id="filter-service"
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
            >
              <option value="">Todos los servicios</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        {filteredAppointments.length === 0 ? (
          <p className={styles.noResults}>No hay turnos para esta fecha{serviceFilter ? ` y servicio (${serviceFilter})` : ''}</p>
        ) : (
          <table className={styles.appointmentsList}>
            <thead>
              <tr>
                <th>Hora</th>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Profesional</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{formatTimeDisplay(appointment.time)}</td>
                  <td>{appointment.client}</td>
                  <td>{appointment.serviceName}</td>
                  <td>{appointment.professional}</td>
                  <td>
                    <span className={`${styles.badge} ${
                      styles[`badge${
                        appointment.status.charAt(0).toUpperCase() + 
                        appointment.status.slice(1)
                      }`]
                    }`}>
                      {appointment.status === 'confirmed' ? 'Confirmado' : 
                       appointment.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                    </span>
                  </td>
                  <td>
                    <button className={styles.actionBtn}>
                      <i className="fas fa-edit"></i> Editar
                    </button>
                    <button className={`${styles.actionBtn} ${styles.dangerBtn}`}>
                      <i className="fas fa-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AppointmentsTab;