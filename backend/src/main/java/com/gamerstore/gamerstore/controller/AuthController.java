package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.AuthRequest;
import com.gamerstore.gamerstore.dto.AuthResponse;
import com.gamerstore.gamerstore.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        return authService.authenticate(request);
    }
}
