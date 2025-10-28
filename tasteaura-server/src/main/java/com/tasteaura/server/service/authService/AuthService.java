package com.tasteaura.server.service.authService;

import com.tasteaura.server.requests.AuthRequest;
import com.tasteaura.server.requests.SignupRequest;
import com.tasteaura.server.response.JwtResponse;

public interface AuthService {

    JwtResponse signup(SignupRequest signupRequest);

    JwtResponse login(AuthRequest authRequest);
}
