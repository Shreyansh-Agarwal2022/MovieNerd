package com.example.Movie_Recommendation.Services.impl;

import com.example.Movie_Recommendation.Entity.Movie;
import com.example.Movie_Recommendation.Exceptions.ResourceNotFoundException;
import com.example.Movie_Recommendation.Payload.MovieDto;
import com.example.Movie_Recommendation.Repositories.MovieRepository;
import com.example.Movie_Recommendation.Services.MovieService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public MovieDto search_by_name(Integer mid) {
        Movie movie = movieRepository.findById(mid).orElseThrow(() -> new ResourceNotFoundException(" Movie ", " mid ", mid));
        return this.modelMapper.map(movie, MovieDto.class);
    }


    @Override
    public List<Movie> search_by_genre(String genre) {
        Pageable pageable = PageRequest.of(0,15);
        List<Movie> list = movieRepository.findByGenre(genre,pageable);
        if (list.isEmpty()) {
            throw new ResourceNotFoundException(" Movie ", genre, 0);
        } else {
            return list;
        }
    }

    @Override
    public List<Movie> search_by_partial_name(String name) {
        List<Movie> list = movieRepository.findTop5ByNameStartingWith(name);
        if (list.isEmpty()) {
            throw new ResourceNotFoundException(" Movie ", name, 0);
        } else {
            return list;
        }
    }

    @Override
    public List<Integer> get_mid(String name) {
        List<Integer> list = new ArrayList<>();
        List<Movie> movies = this.movieRepository.findAllByNameIgnoreCase(name);
        if(movies == null){

        }
        for (Movie m : movies) {
            list.add(m.getMid());
        }
        return list;
    }

    public String OMDB_Api(String movie, int year) throws IOException, InterruptedException {
        String encodedTitle = URLEncoder.encode(movie, StandardCharsets.UTF_8);
        var url = String.format("http://www.omdbapi.com/?t=%s&y=" + year + "&apikey=7b9f3d69", encodedTitle);
        // Http request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("accept", "application/json")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
        return response.body();
    }

}
