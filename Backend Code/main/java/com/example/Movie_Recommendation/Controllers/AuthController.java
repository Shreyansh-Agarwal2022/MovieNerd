package com.example.Movie_Recommendation.Controllers;

import com.example.Movie_Recommendation.Entity.User;
import com.example.Movie_Recommendation.Exceptions.ApiException;
import com.example.Movie_Recommendation.Payload.JWT_Auth_Request;
import com.example.Movie_Recommendation.Payload.JWT_Auth_Response;
import com.example.Movie_Recommendation.Payload.UserDto;
import com.example.Movie_Recommendation.Security.JWT_Token_Helper;
import com.example.Movie_Recommendation.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import com.example.Movie_Recommendation.Security.CustomUserDetailService;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/auth/")
public class AuthController {

    @Autowired
    private JWT_Token_Helper jwt_token_helper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/login")
    public ResponseEntity<JWT_Auth_Response> create_token(@RequestBody JWT_Auth_Request request) throws Exception {
        this.authenticate(request.getUsername(),request.getPassword());
        User user = (User) this.customUserDetailService.loadUserByUsername(request.getUsername());
        UserDetails userDetails= this.userDetailsService.loadUserByUsername(request.getUsername());
        String token = this.jwt_token_helper.generateToken(userDetails);
        JWT_Auth_Response jwt_auth_response = new JWT_Auth_Response();
        jwt_auth_response.setToken(token);
        jwt_auth_response.setId(user.getId());
        return new ResponseEntity<JWT_Auth_Response>(jwt_auth_response,OK);
    }

    private void authenticate(String username, String password) throws Exception {

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(username,password);
        try {
            this.authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        }catch (BadCredentialsException e){
            System.out.println("Invalid Details");
            throw new ApiException("Invalid Username or Password !!");
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody UserDto userDto){
        UserDto registered_user = this.userService.registerUser(userDto);
        return new ResponseEntity<>(registered_user, HttpStatus.OK);
    }

}
