import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditCourse() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];

  const [formData, setFormData] = useState({
    course_name: '',
    instructor: '',
    price: '',
    description: '',
    y_link: '',
    p_link: '',
  });

  const [formErrors, setFormErrors] = useState({
    course_name: '',
    instructor: '',
    price: '',
    description: '',
    y_link: '',
    p_link: '',
  });
  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let error = '';
    if (name === 'course_name' && value === '') {
      error = 'Course name is required';
    } else if (name === 'instructor' && value === '') {
      error = 'Instructor is required';
    } else if (name === 'price' && value === '') {
      error = 'Price is required';
    } else if (name === 'description' && value === '') {
      error = 'Description is required';
    } else if (name === 'y_link' && value === '') {
      error = 'Video Link is required';
    } else if (name === 'p_link' && value === '') {
      error = 'Image Link is required';
    }
    setFormErrors({ ...formErrors, [name]: error });
  };

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
        const fetchedCourse = response.data;
        setFormData(fetchedCourse);
      } catch (err) {
        setError('Error fetching course');
      }
    }
    fetchCourse();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formErrors) {
      if (formErrors[key]) {
        setError('Please fill in all required fields.');
        return;
      }
    }
    console.log(formData)
    const response = await axios.post(
      `http://localhost:8080/api/courses/${courseId}`,
      formData
    );

    if (response.status === 200) {
      console.log(response);
      navigate("/DCourses");
      toast.success('Updated successfully', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    } else {
      console.error('Course update failed');
    }
  };

  return (
    <div className="container my-5">
  
    <h3 className="mb-4 text-primary">Edit Course</h3>
    <form onSubmit={handleSubmit}>
      {/* Course Name */}
      <div className="mb-3">
        <label htmlFor="course_name" className="form-label">Course Name</label>
        <input
          type="text"
          className="form-control"
          id="course_name"
          name="course_name"
          value={formData.course_name}
          onChange={handleChange}
          required
        />
        {formErrors.course_name && (
          <div className="text-danger fw-bold">{formErrors.course_name}</div>
        )}
      </div>

      {/* Instructor */}
      <div className="mb-3">
        <label htmlFor="instructor" className="form-label">Instructor</label>
        <input
          type="text"
          className="form-control"
          id="instructor"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
          required
        />
        {formErrors.instructor && (
          <div className="text-danger fw-bold">{formErrors.instructor}</div>
        )}
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
        {formErrors.description && (
          <div className="text-danger fw-bold">{formErrors.description}</div>
        )}
      </div>

      {/* Video Link */}
      <div className="mb-3">
        <label htmlFor="y_link" className="form-label">Video Link</label>
        <input
          type="text"
          className="form-control"
          id="y_link"
          name="y_link"
          value={formData.y_link}
          onChange={handleChange}
          required
        />
        {formErrors.y_link && (
          <div className="text-danger fw-bold">{formErrors.y_link}</div>
        )}
      </div>

      {/* Image Link */}
      <div className="mb-3">
        <label htmlFor="p_link" className="form-label">Image Link</label>
        <input
          type="text"
          className="form-control"
          id="p_link"
          name="p_link"
          value={formData.p_link}
          onChange={handleChange}
          required
        />
        {formErrors.p_link && (
          <div className="text-danger fw-bold">{formErrors.p_link}</div>
        )}
      </div>

      {/* General Error */}
      {error && (
        <div className="text-center text-danger fw-bold mb-3">{error}</div>
      )}

      {/* Submit Button */}
      <div className="text-center mt-3">
  <div className="d-inline-flex gap-2">
    <button type="submit" className="btn btn-success">
      Update
    </button>
    <button type="button" className="btn btn-danger" onClick={handleCancel}>
      Cancel
    </button>
  </div>
</div>

    </form>
  
</div>

  );
}

export default EditCourse;