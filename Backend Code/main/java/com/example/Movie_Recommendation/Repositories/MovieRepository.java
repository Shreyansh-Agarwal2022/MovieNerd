package com.example.Movie_Recommendation.Repositories;

import com.example.Movie_Recommendation.Entity.Movie;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie,Integer> {
    List<Movie> findByGenre(String genre, Pageable pageable);
    @Query("SELECT m FROM Movie m WHERE m.name LIKE :name%")
    List<Movie> findTop5ByNameStartingWith(@RequestParam("name") String name);
    List<Movie> findAllByNameIgnoreCase(String movie_name);
}