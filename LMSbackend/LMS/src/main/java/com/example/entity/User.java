package com.example.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class User {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    private String username;
	    @Column(unique = true)
	    private String email;
	    private String password;
	    @Column(unique = true)
	    private String phno;
	    private LocalDate dob;
	    private String gender;
	    private String location;
	    private String eduaction;
	    
	    public LocalDate getDob() {
			return dob;
		}

		public void setDob(LocalDate dob) {
			this.dob = dob;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getPhno() {
			return phno;
		}

		public void setPhno(String phno) {
			this.phno = phno;
		}

		

		public String getGender() {
			return gender;
		}

		public void setGender(String gender) {
			this.gender = gender;
		}

		public String getLocation() {
			return location;
		}

		public void setLocation(String location) {
			this.location = location;
		}

		public String getEduaction() {
			return eduaction;
		}

		public void setEduaction(String eduaction) {
			this.eduaction = eduaction;
		}


		public List<Learning> getLearningCourses() {
			return learningCourses;
		}

		public void setLearningCourses(List<Learning> learningCourses) {
			this.learningCourses = learningCourses;
		}


	    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	    private List<Learning> learningCourses;

	



}
