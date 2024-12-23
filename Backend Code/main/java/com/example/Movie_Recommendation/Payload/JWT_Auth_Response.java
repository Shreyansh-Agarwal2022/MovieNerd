package com.example.Movie_Recommendation.Payload;

import lombok.Data;

@Data
public class JWT_Auth_Response {
    private String token;
    private Integer id;
}
