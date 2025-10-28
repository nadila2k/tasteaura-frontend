package com.tasteaura.server.data;


import com.tasteaura.server.enums.Roles;

import com.tasteaura.server.model.Category;
import com.tasteaura.server.model.Users;

import com.tasteaura.server.repository.CategoryRepository;
import com.tasteaura.server.repository.UserRepository;

import com.tasteaura.server.response.ImageResponse;
import com.tasteaura.server.service.imageService.ImageService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;


import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;


@Transactional
@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationListener<ApplicationReadyEvent> {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CategoryRepository categoryRepository;
    private final ImageService imageService;


    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        createAdmin();

    }

    private void createAdmin() {
        if (!userRepository.existsByEmail("admin@example.com")) {
            Users admin = new Users();
            admin.setUsername("adminUser");
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("securePassword123"));
            admin.setPhone("+94123456789");
            admin.setAddress("Admin Street, Colombo, Sri Lanka");
            admin.setRole(Roles.ADMIN);
            userRepository.save(admin);
            System.out.println("✅ Admin user created.");
        } else {
            System.out.println("ℹ️ Admin already exists. Skipping.");
        }
    }




}
