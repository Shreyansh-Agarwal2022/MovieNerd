package com.example.Movie_Recommendation.Payload;

import com.example.Movie_Recommendation.Entity.Roles;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
public class UserDto {
    private int id;
    private String name;
    private String email;
    private String password;
    private Set<DtoRoles> roles = new HashSet<>();

}
