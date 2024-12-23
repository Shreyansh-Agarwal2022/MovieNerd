package com.example.Movie_Recommendation.Services.impl;

import com.example.Movie_Recommendation.Entity.Movie;
import com.example.Movie_Recommendation.Entity.Reviews;
import com.example.Movie_Recommendation.Entity.User;
import com.example.Movie_Recommendation.Exceptions.ResourceNotFoundException;
import com.example.Movie_Recommendation.Payload.ReviewsDto;
import com.example.Movie_Recommendation.Repositories.MovieRepository;
import com.example.Movie_Recommendation.Repositories.ReviewRepository;
import com.example.Movie_Recommendation.Repositories.UserRepository;
import com.example.Movie_Recommendation.Services.ReviewService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ReviewsDto create_review(ReviewsDto reviewsDto, Integer mid, Integer uid) {
        Movie movie = this.movieRepository.findById(mid).orElseThrow(()->new ResourceNotFoundException(" Movie "," mid " , mid));
        User user = this.userRepository.findById(uid).orElseThrow(()->new ResourceNotFoundException(" User "," uid ",uid));
        Optional<Reviews> review = this.reviewRepository.findByUserAndMovie(user,movie);
        if(review.isPresent()){
            Reviews reviews = review.get();
            reviews.setContent(reviewsDto.getContent());
            reviewRepository.save(reviews);
            return this.modelMapper.map(reviews,ReviewsDto.class);
        }else{
        Reviews reviews = this.modelMapper.map(reviewsDto,Reviews.class);
        reviews.setUser(user);
        reviews.setMovie(movie);
        Reviews reviews1 = reviewRepository.save(reviews);
        return this.modelMapper.map(reviews1,ReviewsDto.class);}
    }

    @Override
    public void delete_review(Integer rid) {
        Reviews reviews = this.reviewRepository.findById(rid).orElseThrow(()->new ResourceNotFoundException(" Review "," rid " , rid));
        this.reviewRepository.delete(reviews);
    }

    @Override
    public List<ReviewsDto> get_review(Integer mid) {
        List<Reviews> list = this.reviewRepository.findByMovieMid(mid);

        // Configure the mapping for nested properties (uid and mid)
        this.modelMapper.typeMap(Reviews.class,ReviewsDto.class).addMappings(mapper->{
            mapper.map(src->src.getUser().getId(),ReviewsDto::setId);
            mapper.map(src->src.getMovie().getMid(),ReviewsDto::setMid);
        });
        List<ReviewsDto> list1 = new ArrayList<>();
        for(Reviews r : list){
            list1.add(this.modelMapper.map(r,ReviewsDto.class));
        }
        return list1;
    }

    @Override
    public void add_rating(Integer rating ,Integer mid , Integer uid) {
        Movie movie = this.movieRepository.findById(mid).orElseThrow(()->new ResourceNotFoundException(" Movie "," mid " , mid));
        User user = this.userRepository.findById(uid).orElseThrow(()->new ResourceNotFoundException(" User "," uid ",uid));
        Optional<Reviews> reviews = this.reviewRepository.findByUserAndMovie(user,movie);
        if(reviews.isPresent()){
            Reviews reviews1 = reviews.get();
            reviews1.setRating(rating);
            this.reviewRepository.save(reviews1);
        }else{
            Reviews reviews1 = new Reviews();
            reviews1.setUser(user);
            reviews1.setMovie(movie);
            reviews1.setRating(rating);
            Reviews reviews2 = this.modelMapper.map(reviews1,Reviews.class);
            this.reviewRepository.save(reviews2);
        }
    }

    @Override
    public Integer get_rid(Integer mid, Integer uid) {
        Movie movie = this.movieRepository.findById(mid).orElseThrow(()->new ResourceNotFoundException(" Movie "," Id ",mid));
        User user = this.userRepository.findById(uid).orElseThrow(()->new ResourceNotFoundException(" User "," id " , uid));
        Optional<Reviews> reviews = this.reviewRepository.findByUserAndMovie(user,movie);
        if(reviews.isPresent()){
            Reviews reviews1 = reviews.get();
            return reviews1.getRid();
        }else{
            throw new ResourceNotFoundException(" Reviews "," mid , uid " ,0);
        }
    }

    @Override
    public ReviewsDto get_rev(Integer uid, Integer mid) {
        Movie movie = this.movieRepository.findById(mid).orElseThrow(()->new ResourceNotFoundException(" Movie "," mid " , mid));
        User user = this.userRepository.findById(uid).orElseThrow(()->new ResourceNotFoundException(" User "," uid ",uid));
        Optional<Reviews> reviews = this.reviewRepository.findByUserAndMovie(user,movie);
        if(reviews.isPresent()){
            Reviews review = reviews.get();
            System.out.println(review.is_fav());
            this.modelMapper.typeMap(Reviews.class,ReviewsDto.class).addMappings(mapper->{
                mapper.map(src->src.getUser().getId(),ReviewsDto::setId);
                mapper.map(src->src.getMovie().getMid(),ReviewsDto::setMid);
                mapper.map(src->src.is_fav(),ReviewsDto::setIs_fav);
            });
            ReviewsDto reviewsDto = this.modelMapper.map(review, ReviewsDto.class);
            return reviewsDto;
        }else{
            throw new ResourceNotFoundException(" Review " , " uid ,mid " ,0);
        }
    }

    @Override
    public void is_favourite( Integer uid, Integer mid) {
        Movie movie = this.movieRepository.findById(mid).orElseThrow(()->new ResourceNotFoundException(" Movie "," mid ",mid));
        User user = this.userRepository.findById(uid).orElseThrow(()->new ResourceNotFoundException(" User "," uid ",uid));
        Optional<Reviews> review = this.reviewRepository.findByUserAndMovie(user,movie);
        if(review.isPresent()){
            Reviews rev = review.get();
            rev.set_fav(!rev.is_fav());
            this.reviewRepository.save(rev);
        }else{
            throw new ResourceNotFoundException(" Review " , " uid ,mid " ,0);
        }
    }

    public List<String> get_movie(Integer uid){
        User user = this.userRepository.findById(uid).orElseThrow(()->new ResourceNotFoundException(" User "," uid ",uid));
        List<Reviews> rev = this.reviewRepository.findByUserId(uid);
        List<String> list = new ArrayList<>();
        for(Reviews r : rev){
            if(r.is_fav())
                list.add(r.getMovie().getName());
        }
        return list;
    }
}
