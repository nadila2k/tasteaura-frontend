package com.tasteaura.server.exception;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String invalidEmailOrPassword) {
        super(invalidEmailOrPassword);
    }
}
