import React, { useState } from 'react';
import axios from 'axios';
import ProfessionalHeader from '../components/Professional/ProfessionalHeader';
import AppointmentsCard from '../components/Professional/AppointmentsCard';
import ClientHistoryModal from '../components/Professional/ClientHistoryModal';
import Footer from '../components/Footer/Footer';
import styles from './ProfessionalPage.module.css';

const ProfessionalPage = () => {
  const [professionalName, setProfessionalName] = useState("Profesional 1");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSessionAppointment, setSelectedSessionAppointment] = useState(null);
  const [sessionNotes, setSessionNotes] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedHistoryAppointment, setSelectedHistoryAppointment] = useState(null);

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  const handleDateChange = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const handleSaveSession = () => {
    console.log('Notas guardadas:', {
      appointmentId: selectedSessionAppointment.id,
      notes: sessionNotes
    });
    setSelectedSessionAppointment(null);
    setSessionNotes('');
  };

  const handleViewHistory = (appointment) => {
    setSelectedHistoryAppointment(appointment);
    setShowHistoryModal(true);
  };

  const handleCancelSession = async (appointment) => {
    try {
      await axios.delete(`http://localhost:8080/api/turnos/${appointment.id}`);
      alert("Turno cancelado correctamente");
    } catch (error) {
      console.error('Error al cancelar turno:', error);
      alert('No se pudo cancelar el turno');
    }
  };

  const handleConfirmSession = async (appointment) => {
    try {
      await axios.put(`http://localhost:8080/api/turnos/turnos/${appointment.id}/confirmar`);
      alert("Turno confirmado correctamente");
    } catch (error) {
      console.error('Error al confirmar turno:', error);
      alert('No se pudo confirmar el turno');
    }
  };

  const handleCompleteSession = async (appointment) => {
    setSelectedSessionAppointment(appointment); // → esto activa el modal "Registrar sesión"
  };

  return (
    <div className={styles.professionalPage}>
      <ProfessionalHeader professionalName={professionalName} />

      <div className={styles.container}>
        <div className={styles.welcomeSection}>
          <h2>Mis Turnos Asignados</h2>
          <p>Consulta y gestiona tus turnos asignados</p>
        </div>

        <AppointmentsCard
          title="Turnos del Día Siguiente"
          date={getTomorrowDate()}
          showNavigation={false}
          showPrint={true}
          onCompleteSession={handleCompleteSession}
          onViewHistory={handleViewHistory}
        />

        <AppointmentsCard
          title="Turnos por Día"
          date={currentDate}
          showNavigation={true}
          onDateChange={handleDateChange}
          showPrint={true}
          showActions={true}
          onConfirmSession={handleConfirmSession}
          onCompleteSession={handleCompleteSession}
          onCancelSession={handleCancelSession}
          onViewHistory={handleViewHistory}
        />
      </div>

      {/* Modal para completar sesión */}
      {selectedSessionAppointment && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Registrar sesión con {selectedSessionAppointment.cliente?.nombre}</h3>
            <p>Servicio: {selectedSessionAppointment.detalle}</p>

            <textarea
              className={styles.notesTextarea}
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="Describe lo realizado en la sesión..."
              rows={5}
            />

            <div className={styles.modalButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => setSelectedSessionAppointment(null)}
              >
                Cancelar
              </button>
              <button
                className={styles.saveButton}
                onClick={handleSaveSession}
              >
                Guardar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para ver historial */}
      {showHistoryModal && selectedHistoryAppointment && (
        <ClientHistoryModal
          client={selectedHistoryAppointment.cliente?.nombre}
          onClose={() => {
            setShowHistoryModal(false);
            setSelectedHistoryAppointment(null);
          }}
        />
      )}
    </div>
  );
};

export default ProfessionalPage;
