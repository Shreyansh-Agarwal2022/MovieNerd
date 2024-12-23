package com.example.Movie_Recommendation.Security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWT_Authentication_Filter extends OncePerRequestFilter {


    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JWT_Token_Helper jwt_token_helper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Get token from request header
        String request_token_header = request.getHeader("Authorization");
        String username = null;
        String token = null;

        // Check if token exists and starts with 'Bearer'
        if (request_token_header != null && request_token_header.startsWith("Bearer ")) {
            token = request_token_header.substring(7);  // Remove 'Bearer ' from token
            try {
                // Extract username from token
                username = jwt_token_helper.getUsernameFromToken(token);
            } catch (IllegalArgumentException e) {
                System.out.println("Unable to get JWT token");
            } catch (ExpiredJwtException e) {
                System.out.println("JWT token has expired");
            } catch (MalformedJwtException e) {
                System.out.println("Invalid JWT token");
            }
        } else {
            System.out.println("JWT token does not begin with 'Bearer' or is null");
        }

        // If the token is valid, authenticate the user
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load user details using the username (not the token!)
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            // Validate the token
            if (jwt_token_helper.validateToken(token, userDetails)) {
                // Token is valid, authenticate the user
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } else {
                System.out.println("Invalid JWT token");
            }
        } else {
            System.out.println("Username is null or SecurityContext already has an authentication");
        }

        // Proceed with the filter chain
        filterChain.doFilter(request, response);
    }
}
