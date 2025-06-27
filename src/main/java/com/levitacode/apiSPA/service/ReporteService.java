package com.levitacode.apiSPA.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.levitacode.apiSPA.model.EstadoTurno;
import com.levitacode.apiSPA.model.Servicio;
import com.levitacode.apiSPA.model.Turno;
import com.levitacode.apiSPA.repository.TurnoRepository;

@Service
public class ReporteService {

    @Autowired
    private TurnoRepository turnoRepository;

    public Map<String, Object> generarReportePorProfesional(Long profesionalId, LocalDate startDate, LocalDate endDate) {
        List<Turno> turnos;

        if (profesionalId == null) {
            // Todos los profesionales
            turnos = turnoRepository.findByFechaBetween(startDate, endDate);
        } else {
            // Filtrar por profesional
            turnos = turnoRepository.findByProfesionalIdAndFechaBetween(profesionalId, startDate, endDate);
        }

        Map<String, ReporteData> dataMap = new HashMap<>();

        for (Turno turno : turnos) {
            String nombreProfesional = turno.getProfesional().getNombre() + " " + turno.getProfesional().getApellido();

            ReporteData data = dataMap.getOrDefault(nombreProfesional, new ReporteData());
            data.count++;
            data.total += turno.getMonto();

            dataMap.put(nombreProfesional, data);
        }

        // Convertir a Map<String, Object> para que JSON salga bien
        Map<String, Object> resultado = new HashMap<>();
        for (Map.Entry<String, ReporteData> entry : dataMap.entrySet()) {
            Map<String, Object> valor = new HashMap<>();
            valor.put("count", entry.getValue().count);
            valor.put("total", entry.getValue().total);
            resultado.put(entry.getKey(), valor);
        }

        return resultado;
    }

    private static class ReporteData {
        int count = 0;
        double total = 0.0;
    }

   public Map<String, Map<String, Object>> generarReportePorServicio(String startDateStr, String endDateStr, String categoria) {
    LocalDate startDate = LocalDate.parse(startDateStr);
    LocalDate endDate = LocalDate.parse(endDateStr);

    List<Turno> turnos = turnoRepository.findAll();

    Map<String, Map<String, Object>> resultado = new LinkedHashMap<>();

    for (Turno t : turnos) {
        if (t.getFecha().isBefore(startDate) || t.getFecha().isAfter(endDate)) continue;
        if (t.getEstado() != EstadoTurno.CONFIRMADO) continue;

        for (Servicio s : t.getServicios()) {
            if (categoria != null && !categoria.isEmpty() && !s.getTipo().equalsIgnoreCase(categoria)) continue;

            String clave = s.getNombre() + " (" + s.getTipo() + ")";

            if (!resultado.containsKey(clave)) {
                Map<String, Object> datos = new HashMap<>();
                datos.put("count", 1);
                datos.put("total", s.getPrecio());
                datos.put("categoria", s.getTipo());
                resultado.put(clave, datos);
            } else {
                Map<String, Object> datos = resultado.get(clave);
                datos.put("count", (int) datos.get("count") + 1);
                datos.put("total", (double) datos.get("total") + s.getPrecio());
            }
        }
    }

    return resultado;
}

}
