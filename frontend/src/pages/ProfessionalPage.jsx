import React, { useState, useEffect } from 'react';
import ProfessionalHeader from '../components/Professional/ProfessionalHeader';
import AppointmentsCard from '../components/Professional/AppointmentsCard';
import ClientHistoryModal from '../components/Professional/ClientHistoryModal';
import Footer from '../components/Footer/Footer';
import styles from './ProfessionalPage.module.css';

const ProfessionalPage = () => {
  const [professionalName, setProfessionalName] = useState("Profesional 1");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [sessionNotes, setSessionNotes] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  
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

  const handleCompleteSession = (appointment) => {
    setSelectedAppointment(appointment);
    setSessionNotes('');
  };

  const handleSaveSession = () => {
    // Aquí iría la lógica para guardar en tu backend
    console.log('Notas guardadas:', {
      appointmentId: selectedAppointment.id,
      notes: sessionNotes
    });
    
    // Limpiar el estado
    setSelectedAppointment(null);
    setSessionNotes('');
  };

  const handleViewHistory = (appointment) => {
    setSelectedAppointment(appointment);
    setShowHistoryModal(true);
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
          onCompleteSession={handleCompleteSession}
          onViewHistory={handleViewHistory}
        />
      </div>

      {/* Modal para completar sesión */}
      {selectedAppointment && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Registrar sesión con {selectedAppointment.client}</h3>
            <p>Servicio: {selectedAppointment.service}</p>
            
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
                onClick={() => setSelectedAppointment(null)}
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
      {showHistoryModal && selectedAppointment && (
        <ClientHistoryModal
          client={selectedAppointment.client}
          onClose={() => setShowHistoryModal(false)}
        />
      )}
      
    </div>
  );
};

export default ProfessionalPage;