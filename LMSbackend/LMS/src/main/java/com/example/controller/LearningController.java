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

import com.example.dto.EnrollRequest;
import com.example.entity.Course;
import com.example.entity.Learning;
import com.example.service.LearningService;

@RestController
@RequestMapping("/api/learning")
@CrossOrigin(origins = "http://localhost:3000")
public class LearningController {
	 @Autowired
	    private LearningService learningService;

	    @GetMapping("/{userId}")
	    public List<Course> getLearningCourses(@PathVariable Long userId) {
	        return learningService.getLearningCourses(userId);
	    }
	    
	    @GetMapping
	    public List<Learning> getEnrollments() {
	        return learningService.getEnrollments();
	    }

	    @PostMapping
	    public String enrollCourse(@RequestBody EnrollRequest enrollRequest) {
	    	System.out.println(enrollRequest.getCourseId() +" = "+enrollRequest.getUserId());
	        return learningService.enrollCourse(enrollRequest);
	    }

	    @DeleteMapping("/{id}")
	    public void unenrollCourse(@PathVariable Long id) {
	        learningService.unenrollCourse(id);
	    }


}
