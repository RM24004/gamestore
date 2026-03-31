package com.gamerstore.gamerstore.config;
import org.springframework.http.ResponseEntity; //sirve para manejar las respuestas HTTP en la aplicación
import org.springframework.http.HttpStatus; //sirve para manejar los códigos de estado HTTP en las respuestas
import org.springframework.web.bind.annotation.ControllerAdvice; //sirve para manejar las excepciones de manera global en la aplicación
import org.springframework.web.bind.annotation.ExceptionHandler; //sirve para manejar las excepciones de manera
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.validation.FieldError;
import java.util.HashMap; //sirve para crear un mapa de clave-valor para almacenar los detalles de la excepción
import java.util.Map; //sirve para manejar las excepciones de manera global en la aplicación

@ControllerAdvice
public class GlobalExceptionHandler {
    
    //sirve para manejar las excepciones de tipo IllegalArgumentException que puedan ocurrir en la aplicación y devolver una respuesta HTTP con un mensaje de error y un código de estado BAD_REQUEST (400)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgument(IllegalArgumentException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("error", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    //sirve para manejar las excepciones de tipo RuntimeException que puedan ocurrir en la aplicación y devolver una respuesta HTTP con un mensaje de error y un código de estado BAD_REQUEST (400)
    @ExceptionHandler(RuntimeException.class) 
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
    Map<String, String> response = new HashMap<>(); 
    response.put("error", ex.getMessage()); 
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST); 
  }

    //sirve para manejar las excepciones de tipo MethodArgumentNotValidException que puedan ocurrir en la aplicación y devolver una respuesta HTTP con un mapa de errores de validación y un código de estado BAD_REQUEST (400)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex)
    {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    //sirve para manejar cualquier otra excepción que no haya sido manejada por los métodos anteriores y devolver una respuesta HTTP con un mensaje de error genérico y un código de estado INTERNAL_SERVER_ERROR (500)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("error", "Error interno del servidor");
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    
}
