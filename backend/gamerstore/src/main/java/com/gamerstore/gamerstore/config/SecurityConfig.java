package com.gamerstore.gamerstore.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;
import java.util.List;

@Configuration
public class SecurityConfig {
    private final JwtFilter jwtFilter;
    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

 @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                
                // Rutas públicas de consulta (catálogos)
                .requestMatchers(HttpMethod.POST, "/users").permitAll()
                .requestMatchers("/register").permitAll()  //
                .requestMatchers("/auth/**").permitAll() //rutas de autenticación sin protección
                 
                .requestMatchers(HttpMethod.GET, "/countries/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/brands/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/categories/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/platforms/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/roles/**").permitAll()
                .requestMatchers("/reasons/**").permitAll()

                 // USER/ADMIN puede ver y crear y acceder
                .requestMatchers(HttpMethod.GET, "/entries/**").hasAnyRole("ADMIN", "USER")
                .requestMatchers(HttpMethod.POST, "/entries/**").hasAnyRole("ADMIN", "USER")
                .requestMatchers(HttpMethod.GET, "/exits/**").hasAnyRole("ADMIN", "USER")
                .requestMatchers(HttpMethod.POST, "/exits/**").hasAnyRole("ADMIN", "USER")
                .requestMatchers(HttpMethod.GET,"/products/**").hasAnyRole("ADMIN", "USER")
                .requestMatchers("/suppliers/**").hasAnyRole("ADMIN", "USER")
                .requestMatchers("/users/**").hasAnyRole("ADMIN", "USER")
                
                
                // Rutas solo ADMIN
                .requestMatchers("/users/**").hasRole("ADMIN")
                .requestMatchers("/entries/**").hasRole("ADMIN")
                .requestMatchers("/exits/**").hasRole("ADMIN")
                .requestMatchers("/brands/**").hasRole("ADMIN")
                .requestMatchers("/categories/**").hasRole("ADMIN")
                .requestMatchers("/platforms/**").hasRole("ADMIN")
                .requestMatchers("/suppliers/**").hasRole("ADMIN")
                .requestMatchers("/reasons/**").hasRole("ADMIN")
                
                .anyRequest().authenticated() //todas las demás rutas requieren autenticación
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);// Agrega el filtro JWT antes del filtro de autenticación de Spring Security
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    
    config.setAllowedOrigins(List.of("http://localhost:5173"));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);

    return source;
}
}
