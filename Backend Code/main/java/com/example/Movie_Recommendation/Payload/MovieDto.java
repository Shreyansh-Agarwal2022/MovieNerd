package com.example.Movie_Recommendation.Payload;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class MovieDto {

    private int mid;

    private String name;

    private int year;

    private int duration;

    private String genre;

    private double rating;

    private int votes;

    private String director;

    private String actor1;

    private String actor2;

    private String actor3;

}
