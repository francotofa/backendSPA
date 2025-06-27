package com.levitacode.apiSPA.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.levitacode.apiSPA.Dto.TurnoDTO;
import com.levitacode.apiSPA.model.EstadoTurno;
import com.levitacode.apiSPA.model.Turno;
import com.levitacode.apiSPA.service.TurnoService;

@RestController
@RequestMapping("/api/turnos")
//@CrossOrigin("*")
public class TurnoController {

    @Autowired
    private TurnoService turnoService;

    @GetMapping
    public List<Turno> listarTurnos() {
        return turnoService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Turno obtenerTurno(@PathVariable Long id) {
        return turnoService.obtenerPorId(id);
    }

    @GetMapping("/fecha/{fecha}")
    public List<Turno> obtenerTurnosPorFecha(@PathVariable String fecha) {
        return turnoService.obtenerPorFecha(fecha);
    }

    // Nuevo endpoint para filtrar turnos por fechas, profesional y estado
    @GetMapping("/reportes")
    public ResponseEntity<List<Turno>> obtenerTurnosFiltrados(
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam(required = false) Long profesionalId,
            @RequestParam(required = false) String estado) {
        try {
            List<Turno> turnos = turnoService.obtenerTurnosFiltrados(startDate, endDate, profesionalId, estado);
            return ResponseEntity.ok(turnos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> crearTurno(@RequestBody TurnoDTO turnoDTO) {
        try {
            Turno turno = turnoService.crearDesdeDTO(turnoDTO);
            return ResponseEntity.ok(turno);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error al crear turno: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error interno: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public Turno actualizarTurno(@PathVariable Long id, @RequestBody Turno turno) {
        return turnoService.actualizar(id, turno);
    }

    @DeleteMapping("/{id}")
    public void eliminarTurno(@PathVariable Long id) {
        turnoService.eliminar(id);
    }
    // Obtener los turnos del día siguiente para un profesional
@GetMapping("/profesional/{id}/turnos")
public List<TurnoDTO> getTurnosDelProfesional(@PathVariable Long id) {
    return turnoService.obtenerTurnosPorProfesional(id);
}

// Confirmar un turno
@PutMapping("/turnos/{id}/confirmar")
public ResponseEntity<?> confirmarTurno(@PathVariable Long id) {
    turnoService.cambiarEstadoTurno(id, EstadoTurno.CONFIRMADO);
    return ResponseEntity.ok().build();
}

// Finalizar un turno
@PutMapping("/turnos/{id}/finalizar")
public ResponseEntity<?> finalizarTurno(@PathVariable Long id) {
    turnoService.cambiarEstadoTurno(id, EstadoTurno.FINALIZADO);
    return ResponseEntity.ok().build();
}

// Obtener turnos por profesional y fecha
@GetMapping("/profesional/{id}/fecha/{fecha}")
public List<Turno> obtenerTurnosPorProfesionalYFecha(@PathVariable Long id, @PathVariable String fecha) {
    return turnoService.obtenerPorProfesionalYFecha(id, fecha);
}
    @GetMapping("/cliente/{clienteId}/historial")
    public ResponseEntity<List<Turno>> obtenerHistorialPorCliente(@PathVariable Long clienteId) {
        List<Turno> historial = turnoService.obtenerHistorialPorCliente(clienteId);
        return ResponseEntity.ok(historial);
    }

}
