package com.example.Movie_Recommendation.Repositories;

import com.example.Movie_Recommendation.Entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Roles,Integer> {

}
