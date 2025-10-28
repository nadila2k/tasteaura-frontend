package com.tasteaura.server.service.authService;

import com.tasteaura.server.dto.UserDTO;
import com.tasteaura.server.enums.Roles;
import com.tasteaura.server.exception.InvalidCredentialsException;
import com.tasteaura.server.exception.ResourceAlreadyExistsException;
import com.tasteaura.server.exception.ResourceNotFoundException;
import com.tasteaura.server.model.Users;
import com.tasteaura.server.repository.UserRepository;
import com.tasteaura.server.requests.AuthRequest;
import com.tasteaura.server.requests.SignupRequest;
import com.tasteaura.server.response.JwtResponse;
import com.tasteaura.server.security.Jwt.JwtTokenProvider;
import com.tasteaura.server.security.service.CustomUserDetails;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final ModelMapper modelMapper;


    @Override
    @Transactional
    public JwtResponse signup(SignupRequest signupRequest) {

        if(userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new ResourceAlreadyExistsException("Email already in use: " + signupRequest.getEmail());
        }

        Users user = new Users();
        user.setUsername(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setPhone(signupRequest.getPhone());
        user.setAddress(signupRequest.getAddress());
        user.setRole(Roles.CUSTOMER);
        userRepository.save(user);

        return login(new AuthRequest(signupRequest.getEmail(),signupRequest.getPassword()));
    }

    @Override
    public JwtResponse login(AuthRequest authRequest) {

        Users user = userRepository.findByEmail(authRequest.getEmail());

        if (user == null) {
            throw new ResourceNotFoundException(
                    "User not found with email: " + authRequest.getEmail()
            );
        }

        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken
                            (authRequest.getEmail(), authRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtTokenProvider.generateToken(authentication);
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

            UserDTO userDTO = modelMapper.map(userDetails.getUser(), UserDTO.class);
            return new JwtResponse(userDTO, jwt);
        } catch (BadCredentialsException e) {
            throw new InvalidCredentialsException("Invalid email or password");
        } catch (AuthenticationException e) {
            throw new RuntimeException("Authentication error");
        }

    }
}
