package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Assessment;
import com.example.entity.Course;
import com.example.entity.User;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, Long>{
	
	List<Assessment> findByUserAndCourse(User user, Course course);

	List<Assessment> findByUser(User user);


}
