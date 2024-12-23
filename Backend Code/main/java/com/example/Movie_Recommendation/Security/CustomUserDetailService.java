package com.example.Movie_Recommendation.Security;

import com.example.Movie_Recommendation.Entity.User;
import com.example.Movie_Recommendation.Exceptions.ResourceNotFoundException;
import com.example.Movie_Recommendation.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // load User from database using username
        User user = this.userRepository.findByEmail(username).orElseThrow(()->new ResourceNotFoundException("User" ,"Email : " + username,0));
        System.out.println(user.getRoles());
        return user;
    }
}
