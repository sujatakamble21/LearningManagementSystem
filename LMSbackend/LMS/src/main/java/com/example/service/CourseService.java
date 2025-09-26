package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Course;
import com.example.repository.CourseRepository;
import com.example.repository.LearningRepository;

import jakarta.transaction.Transactional;

@Service
public class CourseService {
	@Autowired
	private CourseRepository courseRepository;
	

	public List<Course> getAllCourses() {
	    return courseRepository.findAll();
	}

	public Course getCourseById(Long id) {
	    return courseRepository.findById(id).orElse(null);
	}

	public Course createCourse(Course course) {
	    return courseRepository.save(course);
	}

	public Course updateCourse(Long id, Course updatedCourse) {
	    Course existingCourse = courseRepository.findById(id).orElse(null);
	    if (existingCourse != null) {
	        existingCourse.setCourseName(updatedCourse.getCourseName());
	        existingCourse.setDescription(updatedCourse.getDescription());
	        existingCourse.setPhoto(updatedCourse.getPhoto()); 
	        existingCourse.setTutor(updatedCourse.getTutor());
	        existingCourse.setVideo(updatedCourse.getVideo());
	        return courseRepository.save(existingCourse);
	    }
	    return null;
	}

	 public void deleteCourse(Long id) {
	        courseRepository.deleteById(id);  // Cascade delete will handle the associated Learning records
	    }
	 
	 


}
