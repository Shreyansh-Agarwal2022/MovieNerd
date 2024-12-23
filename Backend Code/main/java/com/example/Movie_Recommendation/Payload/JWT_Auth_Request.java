package com.example.Movie_Recommendation.Payload;

import lombok.Data;

@Data
public class JWT_Auth_Request {
    private String username;
    private String password;
}
