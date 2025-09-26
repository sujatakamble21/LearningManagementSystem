import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

function AddCourse() {
  const navigate = useNavigate();
  const[error , setError] = useState('');
  const [formData, setFormData] = useState({
    courseName: '',
    tutor:'',
    // price:'',
    description:'',
    video:'',
    photo:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log('Course Added successfully!');
        navigate("/courses");
      } else {
        const data = await response.json();
        setError(data.error)
      }
    } catch (error) {
      setError('course add error:', error);
    }
  };

  return (
    <div className="container my-5">
  
    <h3 className="mb-4 text-primary">Course Registration</h3>
    <form onSubmit={handleSubmit}>
      {/* Course Name */}
      <div className="mb-3">
        <label htmlFor="courseName" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="courseName"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Instructor */}
      <div className="mb-3">
        <label htmlFor="tutor" className="form-label">Instructor</label>
        <input
          type="text"
          className="form-control"
          id="tutor"
          name="tutor"
          value={formData.tutor}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* Video Link */}
      <div className="mb-3">
        <label htmlFor="video" className="form-label">Video Link</label>
        <input
          type="text"
          className="form-control"
          id="video"
          name="video"
          value={formData.video}
          onChange={handleChange}
          required
        />
      </div>

      {/* Image Link */}
      <div className="mb-3">
        <label htmlFor="photo" className="form-label">Image Link</label>
        <input
          type="text"
          className="form-control"
          id="photo"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
          required
        />
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger py-1">{error}</div>}

      {/* Submit Button */}
      <div className="text-center mt-3">
  <div className="btn-group" role="group" aria-label="Action Buttons">
    <button type="submit" className="btn btn-success">
      Add Course
    </button>
    <button type="button" className="btn btn-danger ms-2" onClick={handleCancel}>
      Cancel
    </button>
  </div>
</div>

    </form>
 
</div>

  );
}

export default AddCourse;
