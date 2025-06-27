import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminTabs.module.css';

const ProfessionalReportsTab = () => {
  const [professionals, setProfessionals] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [filters, setFilters] = useState({
    startDate: new Date(new Date().setDate(1)).toISOString().split('T')[0],
    endDate: new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).toISOString().split('T')[0],
    professional: ''
  });

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/usuarios/empleados', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProfessionals(res.data); // Esperamos array de objetos con id, nombre, apellido
      } catch (err) {
        console.error('Error al obtener profesionales:', err);
      }
    };

    fetchProfessionals();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const generateReport = async () => {
    if (!filters.startDate || !filters.endDate) {
      alert('Por favor seleccione ambas fechas');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/reportes/profesional', {
        params: {
          id: filters.professional, // suponiendo que el backend espera el id del profesional
          startDate: filters.startDate,
          endDate: filters.endDate
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setReportData(response.data);
    } catch (err) {
      console.error('Error al obtener el reporte del backend:', err);
      alert('Error al generar el reporte. Revisa la consola.');
    }
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
              <option key={prof.id} value={prof.id}>
                {prof.nombre} {prof.apellido}
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
                Mostrando solo: <strong>{professionals.find(p => p.id.toString() === filters.professional)?.nombre} {professionals.find(p => p.id.toString() === filters.professional)?.apellido}</strong>
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
