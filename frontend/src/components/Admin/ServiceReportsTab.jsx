import React, { useState, useEffect } from 'react';
import styles from './AdminTabs.module.css';

const ServiceReportsTab = () => {
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [filters, setFilters] = useState({
    startDate: new Date(new Date().setDate(1)).toISOString().split('T')[0],
    endDate: new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).toISOString().split('T')[0],
    serviceCategory: ''
  });

  // Categorías de servicios disponibles para filtrar
  const serviceCategories = [
    { value: '', label: 'Todos los servicios' },
    { value: 'masajes', label: 'Masajes' },
    { value: 'belleza', label: 'Belleza' },
    { value: 'faciales', label: 'Tratamientos Faciales' },
    { value: 'corporales', label: 'Tratamientos Corporales' },
    { value: 'hidromasajes', label: 'Hidromasajes' },
    { value: 'yoga', label: 'Yoga Grupal' }
  ];

  // Datos mock - en una app real vendrían de una API
  useEffect(() => {
    const mockServices = [
      { id: 1, name: "Masaje relajante", category: "masajes", professional: "Profesional 1", price: 5000 },
      { id: 2, name: "Facial rejuvenecedor", category: "faciales", professional: "Profesional 2", price: 4000 },
      { id: 3, name: "Depilación completa", category: "belleza", professional: "Profesional 3", price: 3500 },
      { id: 4, name: "Hidromasaje relajante", category: "hidromasajes", professional: "Profesional 1", price: 4500 },
      { id: 5, name: "Yoga Terapéutico", category: "yoga", professional: "Profesional 4", price: 3000 }
    ];
    
    const mockAppointments = [
      { id: 1, serviceId: 1, date: new Date().toISOString().split('T')[0], status: "confirmed", payment: 5000 },
      { id: 2, serviceId: 2, date: new Date().toISOString().split('T')[0], status: "confirmed", payment: 4000 },
      { id: 3, serviceId: 1, date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0], status: "confirmed", payment: 5000 },
      { id: 4, serviceId: 3, date: new Date().toISOString().split('T')[0], status: "confirmed", payment: 3500 },
      { id: 5, serviceId: 4, date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0], status: "confirmed", payment: 4500 },
      { id: 6, serviceId: 5, date: new Date().toISOString().split('T')[0], status: "confirmed", payment: 3000 }
    ];

    setServices(mockServices);
    setAppointments(mockAppointments);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const generateReport = () => {
    if (!filters.startDate || !filters.endDate) {
      alert('Por favor seleccione ambas fechas');
      return;
    }

    // Filtrar turnos confirmados en el rango de fechas
    let filteredAppointments = appointments.filter(
      app => app.status === 'confirmed' && 
            app.date >= filters.startDate && 
            app.date <= filters.endDate
    );

    // Filtrar por categoría de servicio si se seleccionó alguna
    if (filters.serviceCategory) {
      const servicesInCategory = services.filter(
        svc => svc.category === filters.serviceCategory
      ).map(svc => svc.id);
      
      filteredAppointments = filteredAppointments.filter(
        app => servicesInCategory.includes(app.serviceId)
      );
    }

    // Agrupar por servicio
    const report = {};
    filteredAppointments.forEach(app => {
      const service = services.find(s => s.id === app.serviceId);
      if (!service) return;
      
      const serviceName = service.name;
      const serviceCategory = serviceCategories.find(cat => cat.value === service.category)?.label || service.category;
      
      const displayName = `${serviceName} (${serviceCategory})`;
      
      if (!report[displayName]) {
        report[displayName] = { count: 0, total: 0, category: serviceCategory };
      }
      
      report[displayName].count++;
      report[displayName].total += app.payment;
    });

    setReportData(report);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', { 
      style: 'currency', 
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Calcular totales por categoría
  const getCategoryTotals = () => {
    if (!reportData) return null;
    
    const categories = {};
    Object.values(reportData).forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = { count: 0, total: 0 };
      }
      categories[item.category].count += item.count;
      categories[item.category].total += item.total;
    });
    
    return categories;
  };

  const categoryTotals = getCategoryTotals();

  return (
    <div className={styles.adminCard}>
      <h3>Reportes por Servicio</h3>
      <div className={styles.dateFilter}>
        <div className={styles.formGroup}>
          <label htmlFor="startDate">Fecha Inicio</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="endDate">Fecha Fin</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="serviceCategory">Categoría de Servicio</label>
          <select
            id="serviceCategory"
            name="serviceCategory"
            value={filters.serviceCategory}
            onChange={handleFilterChange}
          >
            {serviceCategories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>&nbsp;</label>
          <button onClick={generateReport} className={styles.btn}>
            Generar Reporte
          </button>
        </div>
      </div>

      <div className={styles.reportResults}>
        {reportData ? (
          <>
            <h4>Reporte del {filters.startDate} al {filters.endDate}</h4>
            {filters.serviceCategory && (
              <p className={styles.filterInfo}>
                Mostrando solo: <strong>{
                  serviceCategories.find(c => c.value === filters.serviceCategory)?.label
                }</strong>
              </p>
            )}
            
            <table className={styles.reportTable}>
              <thead>
                <tr>
                  <th>Servicio (Categoría)</th>
                  <th>Cantidad de Turnos</th>
                  <th>Total Recaudado</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(reportData).map(([service, data]) => (
                  <tr key={service}>
                    <td>{service}</td>
                    <td>{data.count}</td>
                    <td>{formatCurrency(data.total)}</td>
                  </tr>
                ))}
                <tr className={styles.reportTotal}>
                  <td>TOTAL GENERAL</td>
                  <td>{Object.values(reportData).reduce((sum, data) => sum + data.count, 0)}</td>
                  <td>{formatCurrency(Object.values(reportData).reduce((sum, data) => sum + data.total, 0))}</td>
                </tr>
              </tbody>
            </table>

            {/* Resumen por categorías (solo cuando no hay filtro por categoría) */}
            {!filters.serviceCategory && categoryTotals && (
              <>
                <h5 style={{ marginTop: '2rem' }}>Resumen por Categorías</h5>
                <table className={styles.reportTable}>
                  <thead>
                    <tr>
                      <th>Categoría</th>
                      <th>Cantidad de Turnos</th>
                      <th>Total Recaudado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(categoryTotals).map(([category, data]) => (
                      <tr key={category}>
                        <td>{category}</td>
                        <td>{data.count}</td>
                        <td>{formatCurrency(data.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            <div style={{ marginTop: '20px' }}>
              <button className={styles.btn} onClick={() => window.print()}>
                <i className="fas fa-print"></i> Imprimir Reporte
              </button>
            </div>
          </>
        ) : (
          <p style={{ textAlign: 'center', color: '#666' }}>
            Seleccione un rango de fechas y haga clic en "Generar Reporte"
          </p>
        )}
      </div>
    </div>
  );
};

export default ServiceReportsTab;