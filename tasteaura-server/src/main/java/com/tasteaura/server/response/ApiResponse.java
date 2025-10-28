package com.tasteaura.server.response;


import com.tasteaura.server.enums.ResponseStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse {
    private ResponseStatus responseStatus;
    private String message;
    private  Object data;

}
