import React from 'react';
import { formatTime } from '../../utils/dateUtils';
import styles from './AppointmentsList.module.css';

const AppointmentsList = ({ appointments, showActions = true }) => {
  if (appointments.length === 0) return null;

  return (
    <table className={styles.appointmentsList}>
      <thead>
        <tr>
          <th>Hora</th>
          <th>Cliente</th>
          <th>Servicio</th>
          <th>Duración</th>
          <th>Estado</th>
          {showActions && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {appointments.map(appointment => (
          <tr key={appointment.id}>
            <td>{formatTime(appointment.time)}</td>
            <td>{appointment.client}</td>
            <td>{appointment.service}</td>
            <td>{appointment.duration} min</td>
            <td>
              <span className={`${styles.badge} ${styles[`badge${appointment.status}`]}`}>
                {appointment.status === 'confirmed' ? 'Confirmado' : 
                 appointment.status === 'pending' ? 'Pendiente' : 'Cancelado'}
              </span>
            </td>
            {showActions && (
              <td>
                <button 
                  className={styles.printBtn}
                  onClick={() => window.print()}
                >
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