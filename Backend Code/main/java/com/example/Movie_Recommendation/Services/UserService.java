package com.example.Movie_Recommendation.Services;

import com.example.Movie_Recommendation.Payload.UserDto;

import java.util.List;
import java.util.Optional;

public interface UserService {
    UserDto registerUser(UserDto user);
    UserDto createUser(UserDto user);
    UserDto updateUser(UserDto user,Integer userid);
    UserDto getUserById(Integer userid);
    List<UserDto> getAllUsers();
    void deleteUser(Integer userid);

    void deleteUserBy(Integer userid);
}
