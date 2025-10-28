package com.tasteaura.server.security;

import com.tasteaura.server.model.Users;
import com.tasteaura.server.security.service.CustomUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {

    /**
     * Get the currently authenticated user entity from Spring Security context.
     */
    public static Users getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            return userDetails.getUser();
        }

        return null;
    }

    /**
     * Get current authenticated user's ID.
     */
    public static Long getCurrentUserId() {
        Users user = getCurrentUser();
        return user != null ? user.getId() : null;
    }

    /**
     * Get current authenticated user's email.
     */
    public static String getCurrentUserEmail() {
        Users user = getCurrentUser();
        return user != null ? user.getEmail() : null;
    }
}