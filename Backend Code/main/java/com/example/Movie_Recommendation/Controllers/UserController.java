package com.example.Movie_Recommendation.Controllers;

import com.example.Movie_Recommendation.Payload.ApiResponse;
import com.example.Movie_Recommendation.Payload.UserDto;
import com.example.Movie_Recommendation.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    // POST -> create user
    @PostMapping("/")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
        UserDto userDto1 = this.userService.createUser(userDto);
        return new ResponseEntity<>(userDto1,HttpStatus.CREATED);
    }

    // PUT -> update user
    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/{userid}") // if the name of the variable was userid then there was no need for ("userid") but here the name is uid , hence required
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto,@PathVariable("userid") Integer uid){
       UserDto updated_user = this.userService.updateUser(userDto,uid);
        return ResponseEntity.ok(updated_user);
    }

    // Delete -> delete user
    // Should be only called by ADMIN
   // @PreAuthorize("hasRole('ADMIN')")// Role based API access
    @DeleteMapping("/{userid}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable("userid") Integer uid){
         this.userService.deleteUser(uid);
         return new ResponseEntity<ApiResponse>(new ApiResponse("user deleted successfully","True"),HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<UserDto>> getAllUsers(){
        return ResponseEntity.ok(this.userService.getAllUsers());
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{userid}")
    public ResponseEntity<UserDto> getsingleuser(@PathVariable Integer userid){
        return ResponseEntity.ok(this.userService.getUserById(userid));
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("sign_out/{userid}")
    public ResponseEntity<ApiResponse> delete_user(@PathVariable Integer userid){
        this.userService.deleteUserBy(userid);
        return new ResponseEntity<ApiResponse>(new ApiResponse("user deleted successfully","True"),HttpStatus.CREATED);
    }

}
