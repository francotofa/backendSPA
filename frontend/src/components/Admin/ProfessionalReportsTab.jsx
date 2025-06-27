import React, { useState, useEffect } from 'react';
import styles from './AdminTabs.module.css';

const ProfessionalReportsTab = () => {
  const [appointments, setAppointments] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [filters, setFilters] = useState({
    startDate: new Date(new Date().setDate(1)).toISOString().split('T')[0],
    endDate: new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).toISOString().split('T')[0],
    professional: ''
  });

  // Datos mock - en una app real vendrían de una API
  useEffect(() => {
    const mockProfessionals = [
      'Dra. Ana Felicidad',
      'Dr. Carlos Bienestar',
      'Lic. María Relajación',
      'Téc. Juan Armonía'
    ];

    const mockAppointments = [
      { id: 1, professional: "Dra. Ana Felicidad", date: new Date().toISOString().split('T')[0], status: "confirmed", payment: 5000 },
      { id: 2, professional: "Dr. Carlos Bienestar", date: new Date().toISOString().split('T')[0], status: "confirmed", payment: 4000 },
      { id: 3, professional: "Dra. Ana Felicidad", date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0], status: "confirmed", payment: 5000 },
      { id: 4, professional: "Lic. María Relajación", date: new Date().toISOString().split('T')[0], status: "confirmed", payment: 3500 },
      { id: 5, professional: "Téc. Juan Armonía", date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0], status: "confirmed", payment: 4500 },
      { id: 6, professional: "Dra. Ana Felicidad", date: new Date().toISOString().split('T')[0], status: "confirmed", payment: 3000 }
    ];

    setProfessionals(mockProfessionals);
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

    // Filtrar por profesional si se seleccionó uno
    if (filters.professional) {
      filteredAppointments = filteredAppointments.filter(
        app => app.professional === filters.professional
      );
    }

    // Agrupar por profesional
    const report = {};
    filteredAppointments.forEach(app => {
      if (!report[app.professional]) {
        report[app.professional] = { count: 0, total: 0 };
      }
      
      report[app.professional].count++;
      report[app.professional].total += app.payment;
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

  return (
    <div className={styles.adminCard}>
      <h3>Reportes por Profesional</h3>
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
          <label htmlFor="professional">Profesional</label>
          <select
            id="professional"
            name="professional"
            value={filters.professional}
            onChange={handleFilterChange}
          >
            <option value="">Todos los profesionales</option>
            {professionals.map(prof => (
              <option key={prof} value={prof}>
                {prof}
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
            {filters.professional && (
              <p className={styles.filterInfo}>
                Mostrando solo: <strong>{filters.professional}</strong>
              </p>
            )}
            
            <table className={styles.reportTable}>
              <thead>
                <tr>
                  <th>Profesional</th>
                  <th>Cantidad de Turnos</th>
                  <th>Total Recaudado</th>
                  <th>Promedio por Turno</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(reportData).map(([professional, data]) => (
                  <tr key={professional}>
                    <td>{professional}</td>
                    <td>{data.count}</td>
                    <td>{formatCurrency(data.total)}</td>
                    <td>{formatCurrency(data.total / data.count)}</td>
                  </tr>
                ))}
                <tr className={styles.reportTotal}>
                  <td>TOTAL GENERAL</td>
                  <td>{Object.values(reportData).reduce((sum, data) => sum + data.count, 0)}</td>
                  <td>{formatCurrency(Object.values(reportData).reduce((sum, data) => sum + data.total, 0))}</td>
                  <td>
                    {formatCurrency(
                      Object.values(reportData).reduce((sum, data) => sum + data.total, 0) / 
                      Object.values(reportData).reduce((sum, data) => sum + data.count, 0) || 0
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginTop: '20px' }}>
              <button className={styles.btn} onClick={() => window.print()}>
                <i className="fas fa-print"></i> Imprimir Reporte
              </button>
              <button 
                className={`${styles.btn} ${styles.btnSecondary}`} 
                style={{ marginLeft: '10px' }}
                onClick={() => {
                  setFilters(prev => ({ ...prev, professional: '' }));
                  setReportData(null);
                }}
              >
                Limpiar Filtros
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

export default ProfessionalReportsTab;