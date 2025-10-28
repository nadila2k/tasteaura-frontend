package com.tasteaura.server.controller;

import com.tasteaura.server.enums.ResponseStatus;
import com.tasteaura.server.requests.AuthRequest;
import com.tasteaura.server.requests.SignupRequest;
import com.tasteaura.server.response.ApiResponse;
import com.tasteaura.server.response.JwtResponse;
import com.tasteaura.server.service.authService.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<ApiResponse> login(@RequestBody AuthRequest authRequest) {
        JwtResponse jwtResponse = authService.login(authRequest);
        return ResponseEntity.ok(new ApiResponse(ResponseStatus.SUCCESS, "Login successful", jwtResponse));
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> signup( @RequestBody SignupRequest signupRequest) {
        JwtResponse jwtResponse = authService.signup(signupRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse(ResponseStatus.SUCCESS, "Signup successful", jwtResponse));
    }
}
