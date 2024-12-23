package com.example.Movie_Recommendation.Entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Roles {
    @Id
    private int id;

    private String name;

}
