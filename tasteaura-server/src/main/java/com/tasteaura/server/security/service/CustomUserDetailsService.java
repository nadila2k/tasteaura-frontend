package com.tasteaura.server.security.service;

import com.tasteaura.server.exception.ResourceNotFound;

import com.tasteaura.server.model.Users;
import com.tasteaura.server.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = userRepository.findByEmail(email);
        if (user == null) try {
            throw new ResourceNotFound("User not found with email: " + email);
        } catch (ResourceNotFound e) {
            throw new RuntimeException(e);
        }
        return new CustomUserDetails(user);
    }
}
