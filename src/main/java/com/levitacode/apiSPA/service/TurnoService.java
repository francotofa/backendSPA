package com.levitacode.apiSPA.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.levitacode.apiSPA.Dto.TurnoDTO;
import com.levitacode.apiSPA.exceptions.TurnoNotFoundException;
import com.levitacode.apiSPA.model.EstadoTurno;
import com.levitacode.apiSPA.model.MetodoPago;
import com.levitacode.apiSPA.model.Servicio;
import com.levitacode.apiSPA.model.Turno;
import com.levitacode.apiSPA.model.Usuario;
import com.levitacode.apiSPA.repository.ServicioRepository;
import com.levitacode.apiSPA.repository.TurnoRepository;
import com.levitacode.apiSPA.repository.UsuarioRepository;

@Service
public class TurnoService {

    @Autowired
    private TurnoRepository turnoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ServicioRepository servicioRepository;

    public List<Turno> obtenerPorFecha(String fecha) {
        LocalDate fechaConsulta = LocalDate.parse(fecha);
        return turnoRepository.findByFecha(fechaConsulta);
    }

    public List<Turno> obtenerTodos() {
        return turnoRepository.findAll();
    }

    public Turno obtenerPorId(Long id) {
        return turnoRepository.findById(id)
                .orElseThrow(() -> new TurnoNotFoundException("Turno no encontrado con ID: " + id));
    }

    public Turno crear(Turno turno) {
        return turnoRepository.save(turno);
    }

    public Turno crearDesdeDTO(TurnoDTO dto) {
        try {
            Turno turno = new Turno();

            // Fecha y hora
            turno.setFecha(dto.getFecha());
            turno.setHoraInicio(dto.getHoraInicio());

            // Cliente
            Usuario cliente = usuarioRepository.findById(dto.getClienteId().longValue())
                    .orElseThrow(() -> new RuntimeException("Cliente no encontrado con ID: " + dto.getClienteId()));
            turno.setCliente(cliente);

            // Profesional
            Usuario profesional = usuarioRepository.findById(dto.getProfesionalId().longValue())
                    .orElseThrow(() -> new RuntimeException("Profesional no encontrado con ID: " + dto.getProfesionalId()));
            turno.setProfesional(profesional);

            // Servicios
            List<Servicio> servicios = dto.getServicioIds().stream()
                    .map(id -> servicioRepository.findById(id.longValue())
                            .orElseThrow(() -> new RuntimeException("Servicio no encontrado con ID: " + id)))
                    .collect(Collectors.toList());
            turno.setServicios(servicios);

            // Calcular hora fin
            int totalMinutos = servicios.size() * 60;
            turno.setHoraFin(dto.getHoraInicio().plusMinutes(totalMinutos));

            // Enums (con manejo de mayúsculas)
            EstadoTurno estado = EstadoTurno.valueOf(dto.getEstado().toUpperCase());
            MetodoPago metodoPago = MetodoPago.valueOf(dto.getMetodoPago().toUpperCase());

            turno.setEstado(estado);
            turno.setMetodoPago(metodoPago);

            // Otros campos
            turno.setPagado(dto.isPagado());
            turno.setPagoWeb(dto.isPagoWeb());
            turno.setMonto(dto.getMonto());

            // Detalle
            String detalle = servicios.stream()
                    .map(Servicio::getNombre)
                    .collect(Collectors.joining(", "));
            turno.setDetalle(detalle);

            return turnoRepository.save(turno);

        } catch (Exception e) {
            throw new RuntimeException("Error al crear turno: " + e.getMessage(), e);
        }
    }

    public Turno actualizar(Long id, Turno turnoActualizado) {
        Turno existente = obtenerPorId(id);
        existente.setFecha(turnoActualizado.getFecha());
        existente.setHoraInicio(turnoActualizado.getHoraInicio());
        existente.setHoraFin(turnoActualizado.getHoraFin());
        existente.setEstado(turnoActualizado.getEstado());
        existente.setServicios(turnoActualizado.getServicios());
        existente.setCliente(turnoActualizado.getCliente());
        existente.setProfesional(turnoActualizado.getProfesional());
        existente.setMetodoPago(turnoActualizado.getMetodoPago());
        existente.setPagado(turnoActualizado.isPagado());
        existente.setPagoWeb(turnoActualizado.isPagoWeb());
        existente.setMonto(turnoActualizado.getMonto());
        existente.setDetalle(turnoActualizado.getDetalle());

        return turnoRepository.save(existente);
    }

    public void eliminar(Long id) {
        turnoRepository.deleteById(id);
    }

    // NUEVO MÉTODO: Obtener reporte por profesional, filtrado por fechas y profesional opcional
    public Map<String, Map<String, Object>> obtenerReportePorProfesional(String startDateStr, String endDateStr, Long profesionalId) {
        LocalDate startDate = LocalDate.parse(startDateStr);
        LocalDate endDate = LocalDate.parse(endDateStr);

        List<Turno> turnosFiltrados = turnoRepository.findAll().stream()
            .filter(t -> {
                LocalDate fecha = t.getFecha();
                boolean enRango = (fecha.isEqual(startDate) || fecha.isAfter(startDate)) &&
                    (fecha.isEqual(endDate) || fecha.isBefore(endDate));
                boolean profesionalOk = (profesionalId == null) || (t.getProfesional() != null && t.getProfesional().getId().equals(profesionalId));
                boolean estadoConfirmado = t.getEstado() != null && t.getEstado() == EstadoTurno.CONFIRMADO;
                return enRango && profesionalOk && estadoConfirmado;
            })
            .collect(Collectors.toList());

        Map<String, Map<String, Object>> reporte = new HashMap<>();

        for (Turno t : turnosFiltrados) {
            String nombreProfesional = t.getProfesional().getNombre() + " " + t.getProfesional().getApellido();
            Map<String, Object> datos = reporte.getOrDefault(nombreProfesional, new HashMap<>());

            int count = datos.getOrDefault("count", 0) instanceof Integer ? (Integer) datos.get("count") : 0;
            double total = datos.getOrDefault("total", 0.0) instanceof Double ? (Double) datos.get("total") : 0.0;

            datos.put("count", count + 1);
            datos.put("total", total + t.getMonto());
            reporte.put(nombreProfesional, datos);
        }

        return reporte;
    }

    public List<Turno> obtenerTurnosFiltrados(String startDate, String endDate, Long profesionalId, String estado) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'obtenerTurnosFiltrados'");
    }


    public List<Turno> obtenerPorProfesionalYFecha(Long profesionalId, String fecha) {
    LocalDate fechaLocalDate = LocalDate.parse(fecha, DateTimeFormatter.ISO_DATE); // asumiendo "yyyy-MM-dd"
    return turnoRepository.findByProfesionalIdAndFecha(profesionalId, fechaLocalDate);
}


    public List<TurnoDTO> obtenerTurnosPorProfesional(Long id) {
    LocalDate manana = LocalDate.now().plusDays(1);
    List<Turno> turnos = turnoRepository.findByProfesionalIdAndFecha(id, manana);

    return turnos.stream().map(turno -> {
        TurnoDTO dto = new TurnoDTO();
        dto.setClienteId(turno.getCliente() != null ? Math.toIntExact(turno.getCliente().getId()) : null);
        dto.setProfesionalId(Math.toIntExact(turno.getProfesional().getId()));
        dto.setServicioIds(turno.getServicios().stream()
            .map(s -> Math.toIntExact(s.getId()))
            .collect(Collectors.toList()));
        dto.setFecha(turno.getFecha());
        dto.setHoraInicio(turno.getHoraInicio());
        dto.setHoraFin(turno.getHoraFin());
        dto.setEstado(turno.getEstado().name());
        dto.setMetodoPago(turno.getMetodoPago().name());
        dto.setPagado(turno.isPagado());
        dto.setPagoWeb(turno.isPagoWeb());
        dto.setMonto(turno.getMonto());
        dto.setDetalle(turno.getDetalle());

        return dto;
    }).collect(Collectors.toList());
}
    public void cambiarEstadoTurno(Long id, EstadoTurno nuevoEstado) {
    Turno turno = turnoRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Turno no encontrado"));
    turno.setEstado(nuevoEstado);
    turnoRepository.save(turno);
}

}
