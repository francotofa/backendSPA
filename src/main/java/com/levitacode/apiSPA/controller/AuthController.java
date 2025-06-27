package com.levitacode.apiSPA.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.levitacode.apiSPA.Dto.LoginDTO;
import com.levitacode.apiSPA.Dto.PerfilDTO;
import com.levitacode.apiSPA.Dto.RegistroDTO;
import com.levitacode.apiSPA.model.Usuario;
import com.levitacode.apiSPA.security.Jwtutil;
import com.levitacode.apiSPA.service.AuthService;

import lombok.Data;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @Autowired
    private Jwtutil jwtUtil;

    @Data // Clase para la respuesta del login
        private static class JwtLoginResponse {
        private final String token;
        private final Long id; // agregado
        private final String nombre;
        private final String apellido;
        private final String email;
        private final String telefono;
        private final String dni;
        private final String rol; // <-- agregá esto si querés enviar el rol
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String role = authentication.getAuthorities().stream()
                    .findFirst()
                    .map(grantedAuthority -> grantedAuthority.getAuthority().replace("ROLE_", ""))
                    .orElse("UNKNOWN");

            Usuario usuario = authService.buscarPorEmail(request.getEmail())
                            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            String jwt = jwtUtil.generateJwtToken(
                request.getEmail(),
                role,
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getDni()
            );

        return ResponseEntity.ok(new JwtLoginResponse(
            jwt,
            usuario.getId(),
            usuario.getNombre(),
            usuario.getApellido(),
            usuario.getEmail(),
            usuario.getTelefono(),
            usuario.getDni(),
            role // 👈 AGREGALO ACÁ
        ));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registro(@RequestBody RegistroDTO usuarioDTO) {
        if (authService.buscarPorEmail(usuarioDTO.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("El email ya está registrado");
        }

        Usuario nuevoUsuario = authService.registrarUsuario(usuarioDTO);
        return ResponseEntity.ok(nuevoUsuario);
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");

            if (jwtUtil.validateJwtToken(token)) {
                return ResponseEntity.ok("Token válido");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token mal formado");
        }
    }

    // Endpoint para obtener el perfil del usuario autenticado
    @GetMapping("/me")
    public ResponseEntity<?> obtenerPerfil(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            if (!jwtUtil.validateJwtToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido");
            }

            String email = jwtUtil.getUserNameFromJwtToken(token);
            Usuario usuario = authService.buscarPorEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            String role = jwtUtil.getRoleFromJwtToken(token);

            PerfilDTO perfil = new PerfilDTO(
                usuario.getEmail(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getDni(),
                usuario.getTelefono(),
                role
            );

            return ResponseEntity.ok(perfil);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error en token o usuario");
        }
    }
}
// Este controlador maneja la autenticación y registro de usuarios.
// Permite iniciar sesión, registrarse y verificar el token JWT.
// Utiliza AuthService para la lógica de negocio y Jwtutil para manejar los tokens JWT.