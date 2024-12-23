package com.example.Movie_Recommendation.Services;

import com.example.Movie_Recommendation.Entity.Reviews;
import com.example.Movie_Recommendation.Payload.ReviewsDto;

import java.util.List;
import java.util.Set;

public interface ReviewService {
    ReviewsDto create_review(ReviewsDto reviewsDto,Integer mid ,Integer uid);
    void delete_review(Integer rid);

    List<ReviewsDto> get_review(Integer mid);

    void add_rating(Integer rating,Integer mid, Integer uid);

    Integer get_rid(Integer mid,Integer uid);

    ReviewsDto get_rev(Integer uid , Integer mid);

    void is_favourite( Integer uid , Integer mid);

    List<String> get_movie(Integer uid);
}
