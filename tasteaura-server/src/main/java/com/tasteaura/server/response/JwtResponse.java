package com.tasteaura.server.response;


import com.tasteaura.server.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {

    private UserDTO user;
    private String token;


}
