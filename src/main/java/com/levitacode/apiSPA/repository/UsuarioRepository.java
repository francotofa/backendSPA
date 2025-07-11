package com.levitacode.apiSPA.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.levitacode.apiSPA.model.Rol;
import com.levitacode.apiSPA.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Busca un usuario por su ID
    List<Usuario> findByRol(Rol rol);


    // Verifica si ya existe un usuario con ese número de documento
    boolean existsByDni(String dni);

    // Verifica si ya existe un usuario con ese número de teléfono
    boolean existsByTelefono(String telefono);
    // Métodos personalizados útiles
    boolean existsByEmail(String email);

    Optional<Usuario> findByEmail(String email);


    // Busca un usuario por su email (útil para login)
    //Optional<Usuario> findByEmail(String email);
}