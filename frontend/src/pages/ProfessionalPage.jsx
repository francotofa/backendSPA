import React, { useState, useEffect } from 'react';

import axios from 'axios';

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


  // Funciones para manejar acciones de los turnos 
  // ACA ESTABAN LOS PROBLEMAS
  // Cancelar, confirmar y completar sesión

  const handleCancelSession = async (appointment) => {
  try {
    await axios.delete(`http://localhost:8080/api/turnos/${appointment.id}`);
    alert("Turno cancelado correctamente");
    // Opcional: recargar lista o actualizar estado local
  } catch (error) {
    console.error('Error al cancelar turno:', error);
    alert('No se pudo cancelar el turno');
  }
};
const handleConfirmSession = async (appointment) => {
  try {
    await axios.put(`http://localhost:8080/api/turnos/turnos/${appointment.id}/confirmar`);
    alert("Turno confirmado correctamente");
    // Si querés actualizar el estado localmente, hacelo acá si manejás appointments
  } catch (error) {
    console.error('Error al confirmar turno:', error);
    alert('No se pudo confirmar el turno');
  }
};
const handleCompleteSession = async (appointment) => {
  try {
    await axios.put(`http://localhost:8080/api/turnos/turnos/${appointment.id}/finalizar`);
    alert("Turno finalizado correctamente");
    // Acá también podés actualizar estado local si querés reflejarlo sin recargar
  } catch (error) {
    console.error('Error al finalizar turno:', error);
    alert('No se pudo finalizar el turno');
  }
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


   {/* onCancelSession={handleCancelSession} */}
  {/* onConfirmSession={handleConfirmSession} AGREGADOS */}
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