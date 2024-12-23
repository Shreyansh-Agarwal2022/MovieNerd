package com.example.Movie_Recommendation.Repositories;

import com.example.Movie_Recommendation.Entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Reviews, Integer> {
    List<Reviews> findByMovieMid(Integer mid);
    Optional<Reviews> findByUserAndMovie(User user, Movie movie);
    List<Reviews> findByUserId(Integer uid);
}
