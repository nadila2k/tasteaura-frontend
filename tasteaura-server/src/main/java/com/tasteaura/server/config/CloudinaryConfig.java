package com.tasteaura.server.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dbiddrued");   // Your Cloudinary cloud name
        config.put("api_key", "367988313781747"); // Your API key
        config.put("api_secret", "c30rn4ORcvPGW_U5BsnTKChzeMc"); // Your API secret
        config.put("secure", "true"); // Optional: enforce HTTPS

        return new Cloudinary(config);
    }
}
