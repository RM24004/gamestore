package com.gamerstore.gamerstore.service;
import com.gamerstore.gamerstore.entity.User;
import com.gamerstore.gamerstore.repository.UserRepository;
import com.gamerstore.gamerstore.dto.AuthRequest;
import com.gamerstore.gamerstore.dto.AuthResponse;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse authenticate(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }
        String faketoken = "token_provisional_para_" + user.getEmail();
        return new AuthResponse(faketoken);
    }
}
