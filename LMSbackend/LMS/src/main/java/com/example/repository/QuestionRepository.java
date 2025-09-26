package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Course;
import com.example.entity.Questions;

@Repository
public interface QuestionRepository extends JpaRepository<Questions, Long> {
	List<Questions> findByCourse(Course course); 

}
