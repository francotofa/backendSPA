import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faCheck, faHistory, faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../Context/UserContext';
import styles from './AppointmentsCard.module.css';

const AppointmentsCard = ({
  title,
  date,
  showNavigation,
  showPrint,
  showActions,
  onDateChange,
  onConfirmSession,
  onCompleteSession,
  onCancelSession,
  onViewHistory,
}) => {
  const { user } = useUser();
  const [appointments, setAppointments] = useState([]);

  const formatDate = (date) => {
    const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options);
  };

  const formatTime = (hora) => {
    if (!hora) return '';
    const [hour, minute] = hora.split(':');
    return `${hour}:${minute}`;
  };

  useEffect(() => {
    if (!user?.id || !date) return;

    const fechaISO = new Date(date).toISOString().split('T')[0];

    axios
      .get(`http://localhost:8080/api/turnos/profesional/${user.id}/fecha/${fechaISO}`)
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error('Error al obtener turnos del backend:', err));
  }, [user.id, date]);

  const actualizarEstadoLocal = (id, nuevoEstado) => {
    setAppointments((prev) => prev.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t)));
  };

const handleConfirm = async (turno) => {
  try {
    await onConfirmSession(turno);
    actualizarEstadoLocal(turno.id, 'CONFIRMADO');
  } catch (error) {
    console.error('Error al confirmar turno:', error);
    alert('No se pudo confirmar el turno.');
  }
};

const handleCancel = async (turno) => {
  try {
    await onCancelSession(turno);
    actualizarEstadoLocal(turno.id, 'CANCELADO');
  } catch (error) {
    console.error('Error al cancelar turno:', error);
    alert('No se pudo cancelar el turno.');
  }
};


  const handleComplete = async (turno) => {
    if (typeof onCompleteSession !== 'function') return;

    try {
      await onCompleteSession(turno);
      actualizarEstadoLocal(turno.id, 'FINALIZADO');
    } catch (error) {
      console.error('Error al completar turno:', error);
      alert('No se pudo completar el turno.');
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{title}</h3>
        <p className={styles.cardDate}>{formatDate(date)}</p>
        {showNavigation && (
          <div className={styles.navigation}>
            <button onClick={() => onDateChange?.(-1)}>←</button>
            <button onClick={() => onDateChange?.(1)}>→</button>
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
              {appointments.map((t) => (
                <tr key={t.id}>
                  <td>{formatTime(t.horaInicio)}</td>
                  <td>{t.cliente?.nombre || 'Desconocido'}</td>
                  <td>{t.detalle}</td>
                  <td>{(t.servicios?.length || 1) * 60} min</td>
                  <td>
                    <span className={`${styles.status} ${styles[t.estado?.toLowerCase()]}`}>
                      {{
                        CONFIRMADO: 'Confirmado',
                        PENDIENTE: 'Pendiente',
                        FINALIZADO: 'Finalizado',
                        CANCELADO: 'Cancelado',
                      }[t.estado] || 'Desconocido'}
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
                          {t.estado === 'PENDIENTE' && (
                            <button
                              className={`${styles.actionButton} ${styles.confirmButton}`}
                              onClick={() => handleConfirm(t)}
                            >
                              <FontAwesomeIcon icon={faCheckCircle} />
                              <span>Confirmar</span>
                            </button>
                          )}
                          {t.estado === 'CONFIRMADO' && (
                            <button
                              className={`${styles.actionButton} ${styles.completeButton}`}
                              onClick={() => handleComplete(t)}
                            >
                              <FontAwesomeIcon icon={faCheck} />
                              <span>Completar</span>
                            </button>
                          )}
                          {(t.estado === 'PENDIENTE' || t.estado === 'CONFIRMADO') && (
                            <button
                              className={`${styles.actionButton} ${styles.cancelButton}`}
                              onClick={() => handleCancel(t)}
                            >
                              <FontAwesomeIcon icon={faBan} />
                              <span>Cancelar</span>
                            </button>
                          )}
                          {typeof onViewHistory === 'function' && (
                            <button
                              className={`${styles.actionButton} ${styles.historyButton}`}
                              onClick={() => onViewHistory(t)}
                            >
                              <FontAwesomeIcon icon={faHistory} />
                              <span>Historial</span>
                            </button>
                          )}
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
