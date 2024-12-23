package com.example.Movie_Recommendation.Entity;


import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@Table
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int rid;

    private String content;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "movie_mid",referencedColumnName = "mid")
    private Movie movie;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private int rating;

    private boolean is_fav;

}
