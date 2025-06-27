import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faCheck, faHistory } from '@fortawesome/free-solid-svg-icons';
import styles from './AppointmentsCard.module.css';

const AppointmentsCard = ({ 
  title, 
  date, 
  showNavigation, 
  showPrint, 
  showActions, 
  onDateChange,
  onCompleteSession,
  onViewHistory
}) => {
  // Datos de ejemplo - reemplazar con tus datos reales
  const appointments = [
    {
      id: 1,
      client: "Cliente 1",
      service: "Masaje relajante",
      time: "10:00",
      duration: "60 min",
      status: "confirmed"
    },
    // ... más turnos
  ];

  const formatDate = (date) => {
    const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{title}</h3>
        <p className={styles.cardDate}>{formatDate(date)}</p>
        
        {showNavigation && (
          <div className={styles.navigation}>
            <button onClick={() => onDateChange(-1)}>←</button>
            <button onClick={() => onDateChange(1)}>→</button>
          </div>
        )}
      </div>

      <div className={styles.cardBody}>
        {appointments.length === 0 ? (
          <p className={styles.noAppointments}>No hay turnos programados</p>
        ) : (
          <table className={styles.appointmentsTable}>
            <thead>
              <tr>
                <th>Hora</th>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Duración</th>
                <th>Estado</th>
                {(showPrint || showActions) && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{appointment.time}</td>
                  <td>{appointment.client}</td>
                  <td>{appointment.service}</td>
                  <td>{appointment.duration}</td>
                  <td>
                    <span className={`${styles.status} ${styles[appointment.status]}`}>
                      {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
                    </span>
                  </td>
                  {(showPrint || showActions) && (
                    <td className={styles.actions}>
                      {showPrint && (
                        <button 
                          className={`${styles.actionButton} ${styles.printButton}`}
                          onClick={() => window.print()}
                        >
                          <FontAwesomeIcon icon={faPrint} />
                          <span>Imprimir</span>
                        </button>
                      )}
                      {showActions && (
                        <>
                          <button 
                            className={`${styles.actionButton} ${styles.completeButton}`}
                            onClick={() => onCompleteSession(appointment)}
                          >
                            <FontAwesomeIcon icon={faCheck} />
                            <span>Completar</span>
                          </button>
                          <button 
                            className={`${styles.actionButton} ${styles.historyButton}`}
                            onClick={() => onViewHistory(appointment)}
                          >
                            <FontAwesomeIcon icon={faHistory} />
                            <span>Historial</span>
                          </button>
                        </>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AppointmentsCard;