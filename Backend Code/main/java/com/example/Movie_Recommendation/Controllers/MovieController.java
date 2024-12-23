package com.example.Movie_Recommendation.Controllers;

import com.example.Movie_Recommendation.Entity.Movie;
import com.example.Movie_Recommendation.Payload.MovieDto;
import com.example.Movie_Recommendation.Services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/search_by_name/{mid}")
    public ResponseEntity<String> search_by_name(@PathVariable("mid") Integer mid) throws IOException, InterruptedException {
        MovieDto movie= movieService.search_by_name(mid);
        String res = this.movieService.OMDB_Api(movie.getName(),movie.getYear());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/search_by_genre/{genre}")
    public ResponseEntity<List<String>> search_by_genre(@PathVariable("genre") String genre) throws IOException, InterruptedException {
        List<Movie> list = movieService.search_by_genre(genre);
        List<String> res = new ArrayList<>();
        for(Movie m : list){
            res.add(this.movieService.OMDB_Api(m.getName(),m.getYear()));
        }
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    // Helper Function
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/search_by_partial_name/{partial}")
    public ResponseEntity<List<String>> search_by_partial_name(@PathVariable("partial") String partial){
        StringBuilder str = new StringBuilder();
        for(char c : partial.toCharArray()){
            if(c=='+'){
                c=' ';
            }
            str.append(c);
        }
        partial = str.toString();
        List<Movie> list = movieService.search_by_partial_name(partial);
        List<String> list2 = new ArrayList<>();
        int i=1;
        for(Movie mov:list){
            list2.add(mov.getName());
            if(i==5){
                break;
            }
            i++;
        }
        return new ResponseEntity<>(list2,HttpStatus.OK);
    }
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/get_mid/{name}")
    public ResponseEntity<List<Integer>> get_mid(@PathVariable String name){
        List<Integer> list = movieService.get_mid(name);
        return new ResponseEntity<>(list,HttpStatus.OK);
    }



}
