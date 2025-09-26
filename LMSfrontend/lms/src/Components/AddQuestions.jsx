import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

function AddQuestion() {

  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const courseId = location.pathname.split("/")[2];
  const [formData, setFormData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    courseId: courseId, 
  });

  const [formErrors, setFormErrors] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  }); const handleCancel = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let error = '';
    if (name === 'question' && value === '') {
      error = 'question is required';
    } else if (name === 'option1' && value === '') {
      error = 'option1 is required';
    } else if (name === 'option2' && value === '') {
      error = 'option2 is required';
    } else if (name === 'option3' && value === '') {
      error = 'option3 is required';
    } else if (name === 'option4' && value === '') {
      error = 'option4 is required';
    } else if (name === 'p_link' && value === '') {
      error = 'answer is required';
    }
    setFormErrors({ ...formErrors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formKeys = Object.keys(formData);
    let isFormValid = true;
    const newFieldErrors = { ...formErrors };

    for (const key of formKeys) {
      if (!formData[key]) {
        newFieldErrors[key] = 'This field should not be empty!';
        isFormValid = false;
      }
    }
    
    if (!isFormValid) {
      setFormErrors(newFieldErrors);
      return
    }
    

    try {
      const response = await fetch('http://localhost:8080/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Question Added successfully!');
        toast.success('Question Added successfully', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
          });
        setFormData({
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            answer: '',
            courseId: courseId,
          });
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError('Question add error:', error);
    }
  };

  return (
    <div className="container my-5">
  
    <h3 className="mb-4 text-primary">Add Question</h3>
    <form onSubmit={handleSubmit} noValidate>
      {/* Question */}
      <div className="mb-3">
        <label htmlFor="question" className="form-label">Question</label>
        <input
          type="text"
          className="form-control"
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          required
        />
        {formErrors.question && (
          <div className="text-danger fw-bold">{formErrors.question}</div>
        )}
      </div>

      {/* Option 1 */}
      <div className="mb-3">
        <label htmlFor="option1" className="form-label">Option 1</label>
        <input
          type="text"
          className="form-control"
          id="option1"
          name="option1"
          value={formData.option1}
          onChange={handleChange}
          required
        />
        {formErrors.option1 && (
          <div className="text-danger fw-bold">{formErrors.option1}</div>
        )}
      </div>

      {/* Option 2 */}
      <div className="mb-3">
        <label htmlFor="option2" className="form-label">Option 2</label>
        <input
          type="text"
          className="form-control"
          id="option2"
          name="option2"
          value={formData.option2}
          onChange={handleChange}
          required
        />
        {formErrors.option2 && (
          <div className="text-danger fw-bold">{formErrors.option2}</div>
        )}
      </div>

      {/* Option 3 */}
      <div className="mb-3">
        <label htmlFor="option3" className="form-label">Option 3</label>
        <input
          type="text"
          className="form-control"
          id="option3"
          name="option3"
          value={formData.option3}
          onChange={handleChange}
          required
        />
        {formErrors.option3 && (
          <div className="text-danger fw-bold">{formErrors.option3}</div>
        )}
      </div>

      {/* Option 4 */}
      <div className="mb-3">
        <label htmlFor="option4" className="form-label">Option 4</label>
        <input
          type="text"
          className="form-control"
          id="option4"
          name="option4"
          value={formData.option4}
          onChange={handleChange}
          required
        />
        {formErrors.option4 && (
          <div className="text-danger fw-bold">{formErrors.option4}</div>
        )}
      </div>

      {/* Answer */}
      <div className="mb-3">
        <label htmlFor="answer" className="form-label">Correct Answer</label>
        <input
          type="text"
          className="form-control"
          id="answer"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          required
        />
        {formErrors.answer && (
          <div className="text-danger fw-bold">{formErrors.answer}</div>
        )}
      </div>

      {/* General error */}
      {error && <div className="text-danger fw-bold text-center mb-3">{error}</div>}

      {/* Submit Button */}
      <div className="text-center mt-4">
  <div className="d-inline-flex gap-3">
    <button type="submit" className="btn btn-success">
      Add Question
    </button>
    <button type="button" className="btn btn-danger" onClick={handleCancel}>
      Cancel
    </button>
  </div>
</div>

    </form>
    <ToastContainer />
  
</div>

  );
}

export default AddQuestion;