package com.gamerstore.gamerstore.service;
import com.gamerstore.gamerstore.entity.User;
import com.gamerstore.gamerstore.repository.UserRepository;
import com.gamerstore.gamerstore.dto.AuthRequest;
import com.gamerstore.gamerstore.dto.AuthResponse;
import org.springframework.stereotype.Service;
import com.gamerstore.gamerstore.config.JwtUtil;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse authenticate(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token);
    }
}
