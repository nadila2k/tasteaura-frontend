package com.tasteaura.server.model;

import com.tasteaura.server.enums.Roles;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;
    @Column(unique = true)
    private String email;
    private String password;
    private String phone;
    private String address;
    @Enumerated(EnumType.STRING)
    private Roles role;

}
