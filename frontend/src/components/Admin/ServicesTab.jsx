import React, { useState, useEffect } from 'react';
import styles from './AdminTabs.module.css';

const ServicesTab = () => {
  // Estados para el formulario y listado
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    category: '',
    duration: '',
    price: '',
    professional: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Categorías disponibles
  const categories = [
    { value: 'masajes', label: 'Masajes' },
    { value: 'belleza', label: 'Belleza' },
    { value: 'faciales', label: 'Tratamientos Faciales' },
    { value: 'corporales', label: 'Tratamientos Corporales' },
    { value: 'grupales', label: 'Servicios Grupales' }
  ];

  // Profesionales disponibles
  const professionals = [
    'Profesional 1',
    'Profesional 2',
    'Profesional 3',
    'Profesional 4'
  ];

  // Cargar datos iniciales (en una app real sería una API)
  useEffect(() => {
    const mockServices = [
      {
        id: 1,
        name: "Masaje relajante",
        category: "masajes",
        duration: 60,
        price: 5000,
        professional: "Profesional 1",
        description: "Alivia la tensión y promueve la relajación profunda"
      },
      {
        id: 2,
        name: "Facial rejuvenecedor",
        category: "faciales",
        duration: 45,
        price: 4000,
        professional: "Profesional 2",
        description: "Tratamiento facial para rejuvenecer la piel"
      }
    ];
    setServices(mockServices);
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validar formulario
  const validateForm = () => {
    if (!formData.name.trim()) {
      alert('El nombre del servicio es requerido');
      return false;
    }
    if (!formData.category) {
      alert('La categoría es requerida');
      return false;
    }
    if (!formData.duration || isNaN(formData.duration)) {
      alert('Duración inválida');
      return false;
    }
    if (!formData.price || isNaN(formData.price)) {
      alert('Precio inválido');
      return false;
    }
    if (!formData.professional) {
      alert('Profesional es requerido');
      return false;
    }
    return true;
  };

  // Enviar formulario (crear o actualizar)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const serviceData = {
      ...formData,
      duration: parseInt(formData.duration),
      price: parseFloat(formData.price)
    };

    if (isEditing) {
      // Actualizar servicio existente
      setServices(services.map(svc => 
        svc.id === formData.id ? serviceData : svc
      ));
    } else {
      // Crear nuevo servicio
      const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
      setServices([...services, { ...serviceData, id: newId }]);
    }

    // Resetear formulario
    resetForm();
  };

  // Editar servicio
  const handleEdit = (service) => {
    setFormData({
      id: service.id,
      name: service.name,
      category: service.category,
      duration: service.duration.toString(),
      price: service.price.toString(),
      professional: service.professional,
      description: service.description
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Eliminar servicio
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este servicio?')) {
      setServices(services.filter(svc => svc.id !== id));
      if (isEditing && formData.id === id) {
        resetForm();
      }
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      category: '',
      duration: '',
      price: '',
      professional: '',
      description: ''
    });
    setIsEditing(false);
  };

  // Formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  return (
    <>
      <div className={styles.adminCard}>
        <h3>{isEditing ? 'Editar Servicio' : 'Crear Nuevo Servicio'}</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="service-name">Nombre del Servicio</label>
              <input
                type="text"
                id="service-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="service-category">Categoría</label>
              <select
                id="service-category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="service-duration">Duración (minutos)</label>
              <input
                type="number"
                id="service-duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="15"
                max="240"
                step="15"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="service-price">Precio ($)</label>
              <input
                type="number"
                id="service-price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="service-professional">Profesional Asignado</label>
              <select
                id="service-professional"
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

          <div className={styles.formGroup}>
            <label htmlFor="service-description">Descripción</label>
            <textarea
              id="service-description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.btn}>
              {isEditing ? 'Actualizar Servicio' : 'Guardar Servicio'}
            </button>
            {isEditing && (
              <button 
                type="button" 
                onClick={resetForm}
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className={styles.adminCard}>
        <h3>Listado de Servicios</h3>
        {services.length === 0 ? (
          <p className={styles.noResults}>No hay servicios registrados</p>
        ) : (
          <table className={styles.appointmentsList}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Duración</th>
                <th>Precio</th>
                <th>Profesional</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => {
                const category = categories.find(cat => cat.value === service.category);
                return (
                  <tr key={service.id}>
                    <td>{service.name}</td>
                    <td>{category?.label || service.category}</td>
                    <td>{service.duration} min</td>
                    <td>{formatPrice(service.price)}</td>
                    <td>{service.professional}</td>
                    <td>
                      <button 
                        onClick={() => handleEdit(service)}
                        className={styles.actionBtn}
                      >
                        <i className="fas fa-edit"></i> Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(service.id)}
                        className={`${styles.actionBtn} ${styles.dangerBtn}`}
                      >
                        <i className="fas fa-trash"></i> Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ServicesTab;