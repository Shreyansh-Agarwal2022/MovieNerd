package com.example.Movie_Recommendation.Payload;


import com.example.Movie_Recommendation.Entity.Movie;
import com.example.Movie_Recommendation.Entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewsDto {
    private int rid;

    private String content;

    private Integer id;

    private Integer mid;

    private Integer rating;

    private Boolean is_fav;
}
