package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Course;
import com.example.entity.Learning;
import com.example.entity.User;

@Repository
public interface LearningRepository extends JpaRepository<Learning, Long> {
	Learning findByUserAndCourse(User user, Course course);
	 void deleteByCourseId(Long courseId);

}
