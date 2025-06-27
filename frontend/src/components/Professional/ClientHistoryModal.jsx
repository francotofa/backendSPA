import React from 'react';
import styles from './ClientHistoryModal.module.css';

const ClientHistoryModal = ({ client, onClose }) => {
  // Datos de ejemplo - en una app real vendrían de una API
  const clientHistory = [
    {
      date: '2025-06-20',
      service: 'Masaje relajante',
      duration: '60 min',
      professional: 'Profesional 1',
      notes: 'El cliente reportó tensión en la espalda baja'
    },
    {
      date: '2025-05-15',
      service: 'Facial rejuvenecedor',
      duration: '45 min',
      professional: 'Profesional 2',
      notes: 'Piel sensible, usar productos suaves'
    }
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Historial de {client}</h3>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </div>
        
        {clientHistory.length === 0 ? (
          <p className={styles.noHistory}>No hay historial registrado</p>
        ) : (
          <div className={styles.historyList}>
            {clientHistory.map((session, index) => (
              <div key={index} className={styles.historyItem}>
                <div className={styles.sessionHeader}>
                  <span className={styles.sessionDate}>
                    {new Date(session.date).toLocaleDateString()}
                  </span>
                  <span className={styles.sessionService}>{session.service}</span>
                  <span className={styles.sessionDuration}>{session.duration}</span>
                </div>
                <p className={styles.sessionProfessional}>
                  Profesional: {session.professional}
                </p>
                {session.notes && (
                  <p className={styles.sessionNotes}>
                    <strong>Notas:</strong> {session.notes}
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