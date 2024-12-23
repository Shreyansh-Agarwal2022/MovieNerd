package com.example.Movie_Recommendation;

import com.example.Movie_Recommendation.Repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MovieRecommendationApplicationTests {

	@Test
	void contextLoads() {
	}

	@Autowired
	private UserRepository userRepository;

	@Test
	public void test_Repo(){
		String name = userRepository.getClass().getName();
		String pack = userRepository.getClass().getPackageName();
		System.out.println(name);
		System.out.println(pack);
	}

}
