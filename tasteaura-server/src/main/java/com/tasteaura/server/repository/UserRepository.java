package com.tasteaura.server.repository;

import com.tasteaura.server.enums.Roles;
import com.tasteaura.server.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByEmail(String email);

    boolean existsByEmail(String email);

    Long countByRole(Roles roles);
}
