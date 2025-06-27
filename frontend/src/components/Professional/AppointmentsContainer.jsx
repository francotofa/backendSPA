    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import { useUser } from '../Context/UserContext';
    import AppointmentsCard from './AppointmentsCard';

    const AppointmentsContainer = () => {
    const { user } = useUser();
    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (!user?.id) return;

        const fechaISO = date.toISOString().split('T')[0];

        axios.get(`http://localhost:8080/api/turnos/profesional/${user.id}/fecha/${fechaISO}`)
        .then(res => setAppointments(res.data))
        .catch(err => console.error("Error al obtener turnos del backend:", err));
    }, [user?.id, date]);

    const handleDateChange = (offset) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + offset);
        setDate(newDate);
    };

    const handleConfirmSession = async (turno) => {
        try {
        await axios.put(`http://localhost:8080/api/turnos/turnos/${turno.id}/confirmar`);
        setAppointments(prev =>
            prev.map(t => (t.id === turno.id ? { ...t, estado: 'CONFIRMADO' } : t))
        );
        } catch (error) {
        console.error('Error al confirmar turno:', error);
        alert('No se pudo confirmar el turno');
        }
    };

    const handleCompleteSession = async (turno) => {
        try {
        await axios.put(`http://localhost:8080/api/turnos/turnos/${turno.id}/finalizar`);
        setAppointments(prev =>
            prev.map(t => (t.id === turno.id ? { ...t, estado: 'FINALIZADO' } : t))
        );
        } catch (error) {
        console.error('Error al completar turno:', error);
        alert('No se pudo completar el turno');
        }
    };

    const handleCancelSession = async (turno) => {
        try {
        await axios.delete(`http://localhost:8080/api/turnos/${turno.id}`);
        setAppointments(prev => prev.filter(t => t.id !== turno.id));
        } catch (error) {
        console.error('Error al cancelar turno:', error);
        alert('No se pudo cancelar el turno');
        }
    };

    const handleViewHistory = (turno) => {
        alert(`Ver historial del turno ${turno.id} (implementar modal o navegación)`);
    };

    return (
        <AppointmentsCard
        title="Turnos del Profesional"
        date={date}
        showNavigation={true}
        showPrint={true}
        showActions={true}
        appointments={appointments}
        onDateChange={handleDateChange}
        onConfirmSession={handleConfirmSession}
        onCompleteSession={handleCompleteSession}
        onCancelSession={handleCancelSession}
        onViewHistory={handleViewHistory}
        />
    );
    };

    export default AppointmentsContainer;
