import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ImgUpload from "./ImgUpload";
import Performance from "./DashBoard/Performance";


function Profile() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
   const id = localStorage.getItem("id");
  const [userDetails, setUserDetails] = useState(null);
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");



  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }

    async function fetchUserDetails() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user details.");
        }
        const data = await response.json();
        console.log(data);
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchUserDetails();
  }, [authToken, navigate,id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageData = e.target.result;
        localStorage.setItem("profileImage", imageData);
        setProfileImage(imageData);
      };

      reader.readAsDataURL(file);
    }
  };


  return (
    <div>
    <Navbar page={"profile"} />
      {/* Profile Card */}
      <div className="container mt-5 card shadow-sm p-4" style={{ maxWidth: "600px"}}>
        {/* Profile Picture */}
        <div className="text-center mb-3">
          <ImgUpload onChange={handleImageChange} src={profileImage} />
        </div>

        {/* User Information */}
        <div>
          {/* Profile Name */}
          <h3 className="text-primary text-center mb-4" style={{ fontFamily: "'Roboto', sans-serif", fontSize: "1.5rem" }}>
            {userDetails?.username}
          </h3>
          
          {/* Email */}
          <div className="row mb-3">
            <div className="col-4">
              <h5>Email:</h5>
            </div>
            <div className="col-8">
              <p>{userDetails?.email}</p>
            </div>
          </div>

          {/* Phone Number */}
          <div className="row mb-3">
            <div className="col-4">
              <h5>Phone Number:</h5>
            </div>
            <div className="col-8">
              <p>{userDetails?.phno}</p>
            </div>
          </div>

          {/* Gender */}
          <div className="row mb-3">
            <div className="col-4">
              <h5>Gender:</h5>
            </div>
            <div className="col-8">
              <p>{userDetails?.gender}</p>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="row mb-3">
            <div className="col-4">
              <h5>Date of Birth:</h5>
            </div>
            <div className="col-8">
              <p>{userDetails?.dob}</p>
            </div>
          </div>

          {/* Education */}
          <div className="row mb-3">
            <div className="col-4">
              <h5>Education:</h5>
            </div>
            <div className="col-8">
              <p>{userDetails?.eduaction}</p>
            </div>
          </div>

          {/* Learning Courses */}
          <div className="row mb-3">
            <div className="col-4">
              <h5>Learning Courses:</h5>
            </div>
            <div className="col-8">
              <p>{userDetails?.learningCourses.length}</p>
            </div>
          </div>
       

        </div>
      </div>
      <Performance />
    </div>
  );
}

export default Profile;
