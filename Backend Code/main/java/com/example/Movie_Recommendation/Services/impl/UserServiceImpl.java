package com.example.Movie_Recommendation.Services.impl;

import com.example.Movie_Recommendation.Entity.Roles;
import com.example.Movie_Recommendation.Entity.User;
import com.example.Movie_Recommendation.Exceptions.ResourceNotFoundException;
import com.example.Movie_Recommendation.Payload.UserDto;
import com.example.Movie_Recommendation.Repositories.RoleRepo;
import com.example.Movie_Recommendation.Repositories.UserRepository;
import com.example.Movie_Recommendation.Services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepo roleRepo;

    @Override
    public UserDto registerUser(UserDto user) {
        User user1 = this.modelMapper.map(user,User.class);
        // password encoded
        user1.setPassword(this.passwordEncoder.encode(user1.getPassword()));

        //roles
        this.userRepository.save(user1);
        return this.modelMapper.map(user1,UserDto.class);
    }

    @Override
    public UserDto createUser(UserDto user) {
        User SavedUser =  this.userRepository.save(DtotoUser(user));
        return this.UsertoDto(SavedUser);
    }

    @Override
    public UserDto updateUser(UserDto userDto, Integer userid) {
        User user = this.userRepository.findById(userid).orElseThrow(()-> new ResourceNotFoundException("User","Id",userid));
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        User UpdatedUser = this.userRepository.save(user);
        return this.UsertoDto(UpdatedUser);
    }

    @Override
    public UserDto getUserById(Integer userid) {
        User user = this.userRepository.findById(userid).orElseThrow(()-> new ResourceNotFoundException("User","Id",userid));
        return this.UsertoDto(user);
    }
    @Override
    public List<UserDto> getAllUsers() {
        List<User> list = this.userRepository.findAll();
        List<UserDto> list2 = new ArrayList<>();
        for(User u : list){
            list2.add(UsertoDto(u));
        }
        return list2;
    }

    @Override
    public void deleteUser(Integer userid) {
       User user = this.userRepository.findById(userid).orElseThrow(() -> new ResourceNotFoundException("User","Id",userid));
       this.userRepository.deleteById(user.getId());
    }

    @Override
    public void deleteUserBy(Integer userid) {
        User user = this.userRepository.findById(userid).orElseThrow(() -> new ResourceNotFoundException("User","Id",userid));
        this.userRepository.deleteById(user.getId());
    }

    private User DtotoUser(UserDto userDto){
        User user = this.modelMapper.map(userDto,User.class); // We use modelmapper for the conversion of the object from one class to other
        return user;
    }

    private UserDto UsertoDto(User user){
        UserDto userDto = this.modelMapper.map(user,UserDto.class);
        return userDto;
    }
}
