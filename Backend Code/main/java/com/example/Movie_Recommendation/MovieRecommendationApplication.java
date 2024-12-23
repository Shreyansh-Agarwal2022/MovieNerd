package com.example.Movie_Recommendation;

import com.example.Movie_Recommendation.Entity.Roles;
import com.example.Movie_Recommendation.Repositories.RoleRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
public class MovieRecommendationApplication implements CommandLineRunner {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RoleRepo roleRepo;

	public static void main(String[] args) {
		SpringApplication.run(MovieRecommendationApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println(passwordEncoder.encode("xyz"));

		try{
			Roles roles = new Roles();
			roles.setId(1);
			roles.setName("ADMIN_USER");

			Roles roles1 = new Roles();
			roles1.setId(2);
			roles1.setName("NORMAL_USER");

			List<Roles> list = List.of(roles1,roles);
			roleRepo.saveAll(list);
		}catch (Exception e){
			e.printStackTrace();
		}
	}

	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}
}
