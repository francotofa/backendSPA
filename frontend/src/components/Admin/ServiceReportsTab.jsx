import React, { useState } from 'react';
import axios from 'axios';
import styles from './AdminTabs.module.css';

const ServiceReportsTab = () => {
  const [reportData, setReportData] = useState(null);
  const [filters, setFilters] = useState({
    startDate: new Date(new Date().setDate(1)).toISOString().split('T')[0],
    endDate: new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).toISOString().split('T')[0],
    serviceCategory: ''
  });

  const serviceCategories = [
    { value: '', label: 'Todos los servicios' },
    { value: 'masajes', label: 'Masajes' },
    { value: 'belleza', label: 'Belleza' },
    { value: 'faciales', label: 'Tratamientos Faciales' },
    { value: 'corporales', label: 'Tratamientos Corporales' },
    { value: 'hidromasajes', label: 'Hidromasajes' },
    { value: 'yoga', label: 'Yoga Grupal' }
  ];

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
      const res = await axios.get('http://localhost:8080/api/reportes/servicios', {
        params: {
          startDate: filters.startDate,
          endDate: filters.endDate,
          categoria: filters.serviceCategory
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setReportData(res.data);
    } catch (err) {
      console.error("Error al obtener el reporte del backend:", err);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getCategoryTotals = () => {
    if (!reportData) return null;

    const categories = {};
    Object.values(reportData).forEach(item => {
      const cat = item.categoria || 'Sin categoría';
      if (!categories[cat]) categories[cat] = { count: 0, total: 0 };
      categories[cat].count += item.count;
      categories[cat].total += item.total;
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
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="endDate">Fecha Fin</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="serviceCategory">Categoría</label>
          <select
            name="serviceCategory"
            value={filters.serviceCategory}
            onChange={handleFilterChange}
          >
            {serviceCategories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>&nbsp;</label>
          <button onClick={generateReport} className={styles.btn}>Generar Reporte</button>
        </div>
      </div>

      <div className={styles.reportResults}>
        {reportData ? (
          <>
            <h4>Reporte del {filters.startDate} al {filters.endDate}</h4>

            <table className={styles.reportTable}>
              <thead>
                <tr>
                  <th>Servicio (Categoría)</th>
                  <th>Cantidad de Turnos</th>
                  <th>Total Recaudado</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(reportData).map(([key, data]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{data.count}</td>
                    <td>{formatCurrency(data.total)}</td>
                  </tr>
                ))}
                <tr className={styles.reportTotal}>
                  <td>TOTAL GENERAL</td>
                  <td>{Object.values(reportData).reduce((sum, d) => sum + d.count, 0)}</td>
                  <td>{formatCurrency(Object.values(reportData).reduce((sum, d) => sum + d.total, 0))}</td>
                </tr>
              </tbody>
            </table>

            {!filters.serviceCategory && categoryTotals && (
              <>
                <h5 style={{ marginTop: '2rem' }}>Resumen por Categoría</h5>
                <table className={styles.reportTable}>
                  <thead>
                    <tr>
                      <th>Categoría</th>
                      <th>Turnos</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(categoryTotals).map(([cat, d]) => (
                      <tr key={cat}>
                        <td>{cat}</td>
                        <td>{d.count}</td>
                        <td>{formatCurrency(d.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            <div style={{ marginTop: '20px' }}>
              <button className={styles.btn} onClick={() => window.print()}>
                Imprimir Reporte
              </button>
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                style={{ marginLeft: '10px' }}
                onClick={() => {
                  setReportData(null);
                }}
              >
                Limpiar
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
