package com.example.Movie_Recommendation.Entity;

import com.example.Movie_Recommendation.Payload.ReviewsDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "movies_data")
@NoArgsConstructor
public class Movie {

    @Id
    private int mid;

    @Column(name = "Name")
    private String name;

    @Column(name = "Year")
    private int year;

    @Column(name = "Duration")
    private int duration;

    @Column(name = "Genre")
    private String genre;

    @Column(name = "Rating")
    private double rating;

    @Column(name = "Votes")
    private int votes;

    @Column(name = "Director")
    private String director;

    @Column(name = "Actor 1")
    private String actor1;

    @Column(name = "Actor 2")
    private String actor2;

    @Column(name = "Actor 3")
    private String actor3;

    @OneToMany(mappedBy = "movie",cascade = CascadeType.ALL)
    private Set<Reviews> reviews = new HashSet<>();

}
