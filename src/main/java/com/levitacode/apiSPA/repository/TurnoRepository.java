package com.levitacode.apiSPA.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.levitacode.apiSPA.model.EstadoTurno;
import com.levitacode.apiSPA.model.Turno;

@Repository
public interface TurnoRepository extends JpaRepository<Turno, Long> {
    
    // Buscar turnos por profesional y fecha exacta
    List<Turno> findByProfesionalIdAndFecha(Integer profesionalId, LocalDate fecha);

    // Buscar turnos por estado
    List<Turno> findByEstado(EstadoTurno estado);

    // Buscar turnos por profesional y estado
    List<Turno> findByProfesionalIdAndEstado(Integer profesionalId, EstadoTurno estado);

    // Buscar todos los turnos de un profesional
    List<Turno> findByProfesionalId(Integer profesionalId);

    // Buscar todos los turnos de un cliente
    List<Turno> findByClienteId(Integer clienteId);

    // Buscar turnos de un cliente ordenados por fecha descendente
    List<Turno> findByClienteIdOrderByFechaDesc(Long clienteId);

    // Buscar turnos por profesional y cliente
    List<Turno> findByProfesionalIdAndClienteId(Integer profesionalId, Integer clienteId);

    // Buscar turnos por fecha exacta
    List<Turno> findByFecha(LocalDate fecha);

    // Buscar turnos por fecha entre dos fechas (para reportes)
    List<Turno> findByFechaBetween(LocalDate start, LocalDate end);

    // Buscar turnos de un profesional entre dos fechas (para reportes)
    List<Turno> findByProfesionalIdAndFechaBetween(Long profesionalId, LocalDate start, LocalDate end);
    
    List<Turno> findByProfesionalIdAndFecha(Long profesionalId, LocalDate fecha);

    List<Turno> findByClienteIdAndEstado(Long clienteId, EstadoTurno estado);

}
