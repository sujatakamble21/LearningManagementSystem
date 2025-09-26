package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Course;
import com.example.entity.Progress;
import com.example.entity.User;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long>{
	Progress findByUserAndCourse(User user, Course course);

}
