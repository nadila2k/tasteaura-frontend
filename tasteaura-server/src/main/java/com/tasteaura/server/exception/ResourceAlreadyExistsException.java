package com.tasteaura.server.exception;

public class ResourceAlreadyExistsException extends RuntimeException {
    public ResourceAlreadyExistsException(String s) {
        super(s);
    }
}
