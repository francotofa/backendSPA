package com.levitacode.apiSPA.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.levitacode.apiSPA.model.Usuario;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UserDetailsImpl implements UserDetails {

    private final Usuario usuario;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (usuario.getRol() == null) {
            return Collections.emptyList(); // Evita NullPointer si no hay rol asignado
        }
        String authority = "ROLE_" + usuario.getRol().name();
        System.out.println(">> Authority asignada: " + authority); // LOG para debug
        return Collections.singletonList(new SimpleGrantedAuthority(authority));
    }

    @Override
    public String getPassword() {
        return usuario.getPassword();
    }

    @Override
    public String getUsername() {
        return usuario.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Podés ajustar esto si tenés lógica de expiración
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Podés usar usuario.isActivo() si querés bloquear usuarios inactivos
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Lo mismo aquí, depende si usás expiración de contraseñas
    }

    @Override
    public boolean isEnabled() {
        return usuario.isActivo();
    }
}
