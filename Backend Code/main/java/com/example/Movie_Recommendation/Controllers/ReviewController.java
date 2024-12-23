package com.example.Movie_Recommendation.Controllers;

import com.example.Movie_Recommendation.Payload.ApiResponse;
import com.example.Movie_Recommendation.Payload.ReviewsDto;
import com.example.Movie_Recommendation.Services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService ;

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/movie/{mid}/user/{uid}/create")
    public ResponseEntity<ReviewsDto> create_review(@RequestBody ReviewsDto reviewsDto, @PathVariable Integer mid,@PathVariable Integer uid){
        ReviewsDto reviewsDto1 = this.reviewService.create_review(reviewsDto,mid,uid);
        return new ResponseEntity<ReviewsDto>(reviewsDto1, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/delete/{rid}")
    public ResponseEntity<ApiResponse> delete_review(@PathVariable Integer rid){
        this.reviewService.delete_review(rid);
        return new ResponseEntity<>(new ApiResponse(" Review Deleted ","True"),HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/movie/{mid}")
    public ResponseEntity<List<ReviewsDto>> get_user_review(@PathVariable Integer mid){
        List<ReviewsDto> list = this.reviewService.get_review(mid);
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/movie/{rating}/mid/{mid}/uid/{uid}")
    public ResponseEntity<ApiResponse> give_rating(@PathVariable Integer rating,@PathVariable Integer mid,@PathVariable Integer uid){
        this.reviewService.add_rating(rating,mid,uid);
        return new ResponseEntity<>(new ApiResponse("Ratings added successfully","True"),HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/getrid/movie/{mid}/user/{uid}")
    public ResponseEntity<Integer> get_rid(@PathVariable Integer mid, @PathVariable Integer uid){
        Integer rid = this.reviewService.get_rid(mid,uid);
        return new ResponseEntity<>(rid,HttpStatus.OK);
    }

    @CrossOrigin(origins= "http://localhost:5173")
    @GetMapping("/get_review/uid/{uid}/movie/{mid}")
    public ResponseEntity<ReviewsDto> get_review(@PathVariable Integer uid , @PathVariable Integer mid){
        ReviewsDto reviewsDto = reviewService.get_rev(uid,mid);
        return new ResponseEntity<>(reviewsDto,HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/is_favourite/user/{uid}/movie/{mid}")
    public ResponseEntity<ApiResponse> is_fav(@PathVariable Integer uid, @PathVariable Integer mid){
        this.reviewService.is_favourite(uid,mid);
        return new ResponseEntity<>(new ApiResponse(" Movies added to Favourites ","True"),HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/get_user/{uid}")
    public ResponseEntity<List<String>> get_user(@PathVariable Integer uid){
        List<String> mov = this.reviewService.get_movie(uid);
        return new ResponseEntity<>(mov,HttpStatus.OK);
    }
}
