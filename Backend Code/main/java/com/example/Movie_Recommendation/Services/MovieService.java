package com.example.Movie_Recommendation.Services;

import com.example.Movie_Recommendation.Entity.Movie;
import com.example.Movie_Recommendation.Payload.MovieDto;

import java.io.IOException;
import java.util.List;

public interface MovieService {
     MovieDto search_by_name(Integer mid);
     List<Movie> search_by_genre(String genre);
     List<Movie> search_by_partial_name(String name);

     List<Integer> get_mid(String name);

     String OMDB_Api(String movie, int year) throws IOException, InterruptedException ;
}
