import React from 'react';
import { formatTime } from '../../utils/dateUtils';
import styles from './AppointmentsList.module.css';

const AppointmentsList = ({ appointments, showActions = true }) => {
  if (!appointments || appointments.length === 0) return null;

  return (
    <table className={styles.appointmentsList}>
      <thead>
        <tr>
          <th>Hora</th>
          <th>Cliente</th>
          <th>Servicios</th>
          <th>Duración</th>
          <th>Estado</th>
          {showActions && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {appointments.map((t) => (
          <tr key={t.id}>
            <td>{formatTime(t.horaInicio)}</td>
            <td>{t.cliente?.nombre} {t.cliente?.apellido}</td>
            <td>{t.detalle}</td>
            <td>{(t.servicios?.reduce((total, s) => total + s.duracion, 0)) || 60} min</td>
            <td>
              <span className={`${styles.badge} ${styles[`badge${t.estado?.toLowerCase()}`]}`}>
                {t.estado === "CONFIRMADO"
                  ? "Confirmado"
                  : t.estado === "PENDIENTE"
                  ? "Pendiente"
                  : t.estado === "FINALIZADO"
                  ? "Finalizado"
                  : "Desconocido"}
              </span>
            </td>
            {showActions && (
              <td>
                <button className={styles.printBtn} onClick={() => window.print()}>
                  <i className="fas fa-print"></i> Imprimir
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentsList;
