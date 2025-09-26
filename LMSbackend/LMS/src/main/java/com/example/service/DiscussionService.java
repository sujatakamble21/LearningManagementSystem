package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Course;
import com.example.entity.Discussion;
import com.example.repository.DiscussionRepository;

@Service
public class DiscussionService {
	 @Autowired
	    private DiscussionRepository discussionRepository;

	    public List<Discussion> getDiscussionsCourse(Course course) {
	        return discussionRepository.findByCourse(course);
	    }
	    public Discussion createDiscussion(Discussion discussion) {
	        return discussionRepository.save(discussion);
	    }


}
