import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'antd';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function YourComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.pathname.split("/")[2];
  const [test, setTest] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [totalQsns, SetTotalQsns] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/api/questions/${courseId}`)
      .then(res => res.json())
      .then(res => {
        setTest(res);
        SetTotalQsns(res.length)
        setSelectedAnswers(new Array(res.length).fill(false));
      })
      .catch(error => console.error("Error fetching data:", error));
  }, [courseId]);

  const handleRadioChange = (questionIndex, selectedOption) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    const qsn = test[questionIndex];
    if (qsn.answer === selectedOption) {
      setCorrectCount(correctCount + 1);
      updatedSelectedAnswers[questionIndex] = true;
    } else if (updatedSelectedAnswers[questionIndex] === true) {
      setCorrectCount(correctCount - 1);
      updatedSelectedAnswers[questionIndex] = false;
    }
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const handleMarks = () => {
    const data = {
      courseId: courseId,
      userId: localStorage.getItem("id"),
      marks: (correctCount / totalQsns) * 100,
    }
    axios.post(`http://localhost:8080/api/assessments/add/${userId}/${courseId}`, data)
      .then(response => {
        console.log('Request successful:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const showModal = () => {
    setOpenModal(true);
  };

  const handleOk = () => {
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  let message = '';
  if (correctCount === 5) {
    message = 'Awesome 😎';
  } else if (correctCount >= 3) {
    message = 'Good 😊';
  } else {
    message = 'Poor 😒';
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-secondary" onClick={() => navigate(`/course/${courseId}`)}>
          <FontAwesomeIcon icon={faBackward} /> Back
        </button>
        <h3 className="text-center  text-dark rounded px-4 py-2">Assessment Questions</h3>
        <div style={{ width: '75px' }}></div>
      </div>

      <div className="assessment-form">
        {test.map((question, index) => (
          <div key={question.no} className="card mb-3 p-3">
            <h5>{question.question}</h5>
            {[question.option1, question.option2, question.option3, question.option4].map((opt, i) => (
              <div className="form-check ms-3" key={i}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name={`question_${question.no}`}
                  value={opt}
                  onChange={() => handleRadioChange(index, opt)}
                />
                <label className="form-check-label">{opt}</label>
              </div>
            ))}
          </div>
        ))}

        <div className="mt-4">
          <button className="btn btn-warning me-3" onClick={() => navigate(0)}>Reset</button>
          <button className="btn btn-primary" onClick={() => { handleMarks(); setOpenModal(true); }}>
            Submit
          </button>
        </div>
      </div>

      <Modal
        title="Assessment Result"
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="text-center">
          <h1>{message}</h1>
          <h3>You scored {(correctCount / totalQsns) * 100} %</h3>
        </div>
      </Modal>
    </div>
  );
}

export default YourComponent;
