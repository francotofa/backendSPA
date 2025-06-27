package com.levitacode.apiSPA.controller;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.levitacode.apiSPA.service.ReporteService;

@RestController
@RequestMapping("/api/reportes")
public class ReportesController {

    @Autowired
    private ReporteService reporteService;

    @GetMapping("/profesional")
    public ResponseEntity<Map<String, Object>> reportePorProfesional(
            @RequestParam(required = false) Long id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        Map<String, Object> reporte = reporteService.generarReportePorProfesional(id, startDate, endDate);
        return ResponseEntity.ok(reporte);
    }
    @GetMapping("/servicios")
public ResponseEntity<?> generarReportePorServicio(
        @RequestParam String startDate,
        @RequestParam String endDate,
        @RequestParam(required = false) String categoria) {

    Map<String, Map<String, Object>> datos = reporteService.generarReportePorServicio(startDate, endDate, categoria);
    return ResponseEntity.ok(datos);
}
}
