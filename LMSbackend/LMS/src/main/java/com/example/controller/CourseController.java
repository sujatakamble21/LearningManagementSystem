package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Course;
import com.example.service.CourseService;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {
	 @Autowired
	    private CourseService courseService;

	    @GetMapping
	    public List<Course> getAllCourses() {
	        return courseService.getAllCourses();
	    }

	    @GetMapping("/{id}")
	    public Course getCourseById(@PathVariable Long id) {
	        return courseService.getCourseById(id);
	    }

	    @PostMapping
	    public Course createCourse(@RequestBody Course course) {
	        return courseService.createCourse(course);
	    }

	    @PostMapping("/{id}")
	    public Course updateCourse(@PathVariable Long id, @RequestBody Course updatedCourse) {
	        return courseService.updateCourse(id, updatedCourse);
	    }

	    @DeleteMapping("/{id}")
	    public void deleteCourse(@PathVariable Long id) {
	        courseService.deleteCourse(id);
	    }


}
