import React, { useEffect, useState } from 'react';
import styles from './ClientHistoryModal.module.css';
import axios from 'axios';

const ClientHistoryModal = ({ client, clientId, onClose }) => {
  const [clientHistory, setClientHistory] = useState([]);

  useEffect(() => {
    if (!clientId) return;

    axios.get(`http://localhost:8080/api/turnos/cliente/${clientId}/historial`)
      .then(res => setClientHistory(res.data))
      .catch(err => console.error('Error al obtener historial:', err));
  }, [clientId]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Historial de {client}</h3>
          <button onClick={onClose} className={styles.closeButton}>&times;</button>
        </div>

        {clientHistory.length === 0 ? (
          <p className={styles.noHistory}>No hay historial registrado</p>
        ) : (
          <div className={styles.historyList}>
            {clientHistory.map((session, index) => (
              <div key={index} className={styles.historyItem}>
                <div className={styles.sessionHeader}>
                  <span className={styles.sessionDate}>
                    {new Date(session.fecha).toLocaleDateString()}
                  </span>
                  <span className={styles.sessionService}>{session.detalle}</span>
                  <span className={styles.sessionDuration}>
                    {(session.servicios?.length || 1) * 60} min
                  </span>
                </div>
                <p className={styles.sessionProfessional}>
                  Profesional: {session.profesional?.nombre || 'No disponible'}
                </p>
                {session.notas && (
                  <p className={styles.sessionNotes}>
                    <strong>Notas:</strong> {session.notas}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientHistoryModal;
