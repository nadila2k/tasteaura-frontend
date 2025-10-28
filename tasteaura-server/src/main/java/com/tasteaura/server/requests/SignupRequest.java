package com.tasteaura.server.requests;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class SignupRequest {
    private String username;
    private String email;
    private String password;
    private String phone;
    private String address;
}
